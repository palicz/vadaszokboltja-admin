import { format } from "date-fns";
import { SizesClient } from "./components/client";

import prismadb from "@/lib/prismadb";
import { BrandColumn } from "./components/columns";

const BrandsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const brands = await prismadb.brand.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedBrands: BrandColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedBrands} />
      </div>
    </div>
  );
};

export default BrandsPage;
