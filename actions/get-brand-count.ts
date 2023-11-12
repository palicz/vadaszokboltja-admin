import prismadb from "@/lib/prismadb";

export const getBrandCount = async (storeId: string) => {
    const brandCount = await prismadb.brand.count({
        where: {
            storeId,
        },
    });

    return brandCount;
};