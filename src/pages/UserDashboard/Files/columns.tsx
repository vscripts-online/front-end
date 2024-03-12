import { Button } from "@/components/ui/button";
import { formatByteRow } from "@/lib/utils";
import { IFile } from "@/types/file";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export const columns: ColumnDef<IFile>[] = [
  {
    header: "#",
    cell({ row }) {
      return parseInt(row.id) + 1;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      const value = row.original.created_at as string;
      return new Date(value).toLocaleString();
    },
  },
  {
    accessorKey: "file_name",
    header: "File Name",
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
    cell: ({ row }) => {
      const value = row.original.slug;
      return (
        <Link
          className="underline"
          to={import.meta.env.VITE_API_URL + "/files/" + value}
        >
          {value}
        </Link>
      );
    },
  },
  {
    accessorKey: "loading_from_cloud_now",
    header: "Loading",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button size="sm">
          <Link to={"/dashboard/files/" + row.original._id}>Details</Link>
        </Button>
      );
    },
  },
];
