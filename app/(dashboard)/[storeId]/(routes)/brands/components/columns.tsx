"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type BrandColumn = {
  id: string
  name: string
  categoryName: string
  createdAt: string,
}

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: "name",
    header: "Név",
  },
  {
    accessorKey: "category",
    header: "Kategória",
    cell: ({ row }) => row.original.categoryName,
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
