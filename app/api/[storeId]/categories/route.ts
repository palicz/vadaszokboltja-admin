import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, billboardId } = body;

        if (!userId) {
            return new NextResponse("Nincs engedélye a művelet végrehajtásához", { status: 401 });
        }

        if (!name) {
            return new NextResponse("A név megadása kötelező", { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse("Plakát ID kötelező", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("Üzlet ID kötelező", { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Nincs engedélye a művelet végrehajtásához", { status: 403 })
        }

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORIES_POST]', error)
        return new NextResponse("Belső hiba", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) {
            return new NextResponse("Üzlet ID kötelező", { status: 400 })
        }

        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.log('[CATEGORIES_GET]', error)
        return new NextResponse("Belső hiba", { status: 500 });
    }
};