"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SubcategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface SubcategoryClientProps {
  data: SubcategoryColumn[]
}

export const SubcategoryClient: React.FC<SubcategoryClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Alkategóriák (${data.length})`} description="Alkategóriák kezelése" />
        <Button
          onClick={() => router.push(`/${params.storeId}/subcategories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Új hozzáadása
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API hívások az Alkategóriákhoz" />
      <Separator />
      <ApiList entityName="subcategories" entityIdName="subcategoryId" />
    </>
  );
};
