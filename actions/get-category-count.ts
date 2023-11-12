import prismadb from "@/lib/prismadb";

export const getCategoryCount = async (storeId: string) => {
    const categoryCount = await prismadb.category.count({
        where: {
            storeId,
        },
    });

    return categoryCount;
};