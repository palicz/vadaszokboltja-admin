import prismadb from "@/lib/prismadb";
import { BrandForm } from "./components/brand-form";

const BrandPage = async ({
  params,
}: {
  params: { brandId: string, storeId: string };
}) => {
  const brand = await prismadb.brand.findUnique({
    where: {
      id: params.brandId,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandForm categories={categories} initialData={brand} />
      </div>
    </div>
  )
};

export default BrandPage;
