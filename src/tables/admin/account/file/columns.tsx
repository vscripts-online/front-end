import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IFile } from "@/types/file";
import { formatByteRow } from "@/utils";
import { TimeAgo } from "@/utils/timeago";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import {
  CreatedAt,
  FileName,
  MimeType,
  Size,
  UpdatedAt,
  User,
} from "./column-headers";

export const columns: ColumnDef<IFile>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    header: "#",
    cell({ row, table }) {
      const { pageIndex, pageSize } = table.getState().pagination;
      const multiplier = pageIndex * pageSize;
      return multiplier + row.index + 1;
    },
  },
  {
    accessorKey: "file_name",
    filterFn: () => true,
    header: ({ table }) => <FileName table={table} />,
    meta: {
      headerClass: "w-full",
    },
  },
  {
    accessorKey: "user",
    filterFn: () => true,
    header: ({ table }) => <User table={table} />,
  },
  {
    accessorKey: "updated_at",
    filterFn: () => true,
    header: ({ table }) => <UpdatedAt table={table} />,
    cell: ({ row }) => {
      const value = row.original.updated_at as string;
      return (
        <div className="min-w-[100px]">
          <TimeAgo date={value} />
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    filterFn: () => true,
    header: ({ table }) => <CreatedAt table={table} />,
    cell: ({ row }) => {
      const value = row.original.created_at as string;
      return (
        <div className="min-w-[100px]">
          <TimeAgo date={value} />
        </div>
      );
    },
  },
  {
    accessorKey: "mime_type",
    filterFn: () => true,
    header: ({ table }) => <MimeType table={table} />,
  },
  {
    accessorKey: "size",
    filterFn: () => true,
    header: ({ table }) => <Size table={table} />,
    cell: ({ row, column }) => {
      return formatByteRow(row, column);
    },
  },
  {
    id: "Uploaded",
    filterFn: () => true,
    header: "Uploaded",
    cell: ({ row }) => {
      const parts = row.original.parts;
      const size = row.original.size;
      const parts_size =
        (parts?.map((x) => +x.size).reduce((old, val) => old + val, 0) || 0) +
        (parts?.length || 0) -
        1;

      const percentage = (100 / (+size / parts_size) + "").match(
        /^-?\d+(?:\.\d{0,2})?/
      )![0];

      return <div className="font-medium">% {percentage}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button size="sm" className="h-fit px-2 py-1">
          <Link to={"/admin/files/" + row.original._id}>Details</Link>
        </Button>
      );
    },
  },
];
