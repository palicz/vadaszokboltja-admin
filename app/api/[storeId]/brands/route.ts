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

        const { name, categoryId } = body;

        if (!userId) {
            return new NextResponse("Nincs engedélye a művelet végrehajtásához", { status: 401 });
        }

        if (!name) {
            return new NextResponse("A név megadása kötelező", { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse("Kategória ID kötelező", { status: 400 })
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

        const brand = await prismadb.brand.create({
            data: {
                name,
                categoryId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(brand);
    } catch (error) {
        console.log('[BRANDS_POST]', error)
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

        const brands = await prismadb.brand.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(brands);
    } catch (error) {
        console.log('[BRANDS_GET]', error)
        return new NextResponse("Belső hiba", { status: 500 });
    }
};