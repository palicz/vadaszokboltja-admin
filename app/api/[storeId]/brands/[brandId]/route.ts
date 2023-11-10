import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    { params }: { params: { brandId: string } }
) {
    try {
        if (!params.brandId) {
            return new NextResponse("Size ID is required", { status: 400 })
        }

        const brand = await prismadb.brand.findUnique({
            where: {
                id: params.brandId,
            },
            include: {
                category: true,
            }
        });

        return NextResponse.json(brand);
    } catch (error) {
        console.log('[BRAND_GET]', error)
        return new NextResponse("Belső hiba", { status: 500 })
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, brandId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, categoryId } = body;

        if (!userId) {
            return new NextResponse("Nincs engedélye a művelet végrehajtásához", { status: 401 })
        }

        if (!name) {
            return new NextResponse("A név megadása kötelező", { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse("A kategória megadása kötelező", { status: 400 })
        }

        if (!params.brandId) {
            return new NextResponse("Size ID is required", { status: 400 })
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

        const brand = await prismadb.brand.updateMany({
            where: {
                id: params.brandId,
            },
            data: {
                name,
                categoryId
            }
        });

        return NextResponse.json(brand);
    } catch (error) {
        console.log('[SIZE_PATCH]', error)
        return new NextResponse("Belső hiba", { status: 500 })
    }
};

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, brandId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Nincs engedélye a művelet végrehajtásához", { status: 401 })
        }

        if (!params.brandId) {
            return new NextResponse("Brand ID is required", { status: 400 })
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

        const brand = await prismadb.brand.deleteMany({
            where: {
                id: params.brandId,
            }
        });

        return NextResponse.json(brand);
    } catch (error) {
        console.log('[BRAND_DELETE]', error)
        return new NextResponse("Belső hiba", { status: 500 })
    }
};