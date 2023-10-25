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

        const { name, value } = body;

        if (!userId) {
            return new NextResponse("Nincs engedélye a művelet végrehajtásához", { status: 401 });
        }

        if (!name) {
            return new NextResponse("A név megadása kötelező", { status: 400 })
        }

        if (!value) {
            return new NextResponse("Érték megadása kötelező", { status: 400 })
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

        const size = await prismadb.size.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZES_POST]', error)
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

        const sizes = await prismadb.size.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(sizes);
    } catch (error) {
        console.log('[SIZES_GET]', error)
        return new NextResponse("Belső hiba", { status: 500 });
    }
};