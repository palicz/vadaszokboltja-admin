import prismadb from "@/lib/prismadb";

export const getSubcategoryCount = async (storeId: string) => {
    const subcategoryCount = await prismadb.subcategory.count({
        where: {
            storeId,
        },
    });

    return subcategoryCount;
};