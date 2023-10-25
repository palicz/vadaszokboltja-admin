"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  brand: string;
  description: string;
  isFeatured: string;
  isArchived: string;
  createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Név",
  },
  {
    accessorKey: "isArchived",
    header: "Archivált",
  },
  {
    accessorKey: "isFeatured",
    header: "Kiemelt",
  },
  {
    accessorKey: "price",
    header: "Ár",
  },
  {
    accessorKey: "category",
    header: "Kategória",
  },
  {
    accessorKey: "size",
    header: "Méret",
  },
  {
    accessorKey: "color",
    header: "Szín",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full boarder" style={{ backgroundColor: row.original.color }} />
      </div>
    )
  },
  {
    accessorKey: "brand",
    header: "Márka",
  },
  {
    accessorKey: "description",
    header: "Leírás",
  },
  {
    accessorKey: "createdAt",
    header: "Dátum",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
