"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
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
    accessorKey: "subcategory",
    header: "Alkategória",
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
