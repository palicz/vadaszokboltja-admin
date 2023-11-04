import { format } from "date-fns";
import { ProductClient } from "./components/client";

import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      subcategory: true,
      brand: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });


  /**
 * Truncates a given description to a specified length.
 */
  const truncateDescription = (description: string, length: number): string => {
    if (description.length > length) {
      return description.slice(0, length) + '...';
    }
    return description;
  };

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured ? 'Igen' : 'Nem',
    isArchived: item.isArchived ? 'Igen' : 'Nem',
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    subcategory: item.subcategory.name,
    brand: item.brand.name,
    description: truncateDescription(item.description, 45),
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
