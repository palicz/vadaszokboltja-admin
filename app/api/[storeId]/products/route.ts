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

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            brandId,
            description,
            isFeatured,
            isArchived
        } = body;

        if (!userId) {
            return new NextResponse("Nincs engedélye a művelet végrehajtásához", { status: 401 });
        }

        if (!name) {
            return new NextResponse("A név megadása kötelező", { status: 400 })
        }

        if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 });
        }

        if (!price) {
            return new NextResponse("Az ár megadása kötelező", { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse("A kategória megadása kötelező", { status: 400 })
        }

        if (!sizeId) {
            return new NextResponse("A méret megadása kötelező", { status: 400 })
        }

        if (!colorId) {
            return new NextResponse("A szín megadása kötelező", { status: 400 })
        }

        if (!brandId) {
            return new NextResponse("A márka megadása kötelező", { status: 400 })
        }

        if (!description) {
            return new NextResponse("A leírás megadása kötelező", { status: 400 })
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

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                colorId,
                sizeId,
                brandId,
                description,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
            },
        });


        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_POST]', error)
        return new NextResponse("Belső hiba", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const brandId = searchParams.get("brandId") || undefined;
        const description = searchParams.get("description") || undefined;
        const isFeatured = searchParams.get("isFeatured") || undefined;

        if (!params.storeId) {
            return new NextResponse("Üzlet ID kötelező", { status: 400 })
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                brandId,
                description,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                size: true
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.log('[PRODUCTS_GET]', error)
        return new NextResponse("Belső hiba", { status: 500 });
    }
};