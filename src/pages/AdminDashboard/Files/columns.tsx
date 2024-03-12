import { formatByteRow } from "@/lib/utils";
import { IFile } from "@/types/file";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IFile>[] = [
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row, column }) => {
      const value = row.getValue(column.id) as string;
      return new Date(value).toLocaleString();
    },
  },
  {
    accessorKey: "original_name",
    header: "Original Name",
  },
  {
    accessorKey: "mime_type",
    header: "Mime Type",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row, column }) => {
      return formatByteRow(row, column);
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "loading_from_cloud_now",
    header: "Loading",
  },
];
