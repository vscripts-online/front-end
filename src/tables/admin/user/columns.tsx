import { AUTH_HOST } from "@/auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import UserAvatar from "@/components/user-avatar";
import { IGetUsersUser } from "@/types/user";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import bytes from "bytes";
import TimeAgo from "react-timeago";
import { CreatedAt, Email, Id, Name } from "./column-headers";

export const columns: ColumnDef<IGetUsersUser>[] = [
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
    accessorKey: "avatar",
    header: "Avatar",
    enableSorting: false,
    cell(props) {
      const avatar = props.row.original.user.avatar;
      return <UserAvatar avatar={avatar || AUTH_HOST + "/user.png"} />;
    },
  },
  {
    accessorKey: "user.id",
    header: ({ table }) => <Id table={table} />,
  },
  {
    accessorKey: "user.name",
    header: ({ table }) => <Name table={table} />,
  },
  {
    accessorKey: "user.email",
    header: ({ table }) => <Email table={table} />,
    meta: {
      headerClass: "w-full",
    },
  },
  {
    accessorKey: "createdAt",
    filterFn: () => true,
    header: ({ table }) => <CreatedAt table={table} />,
    cell: ({ row }) => {
      const value = row.original.createdAt as string;
      return (
        <div className="min-w-[100px]">
          <TimeAgo date={value} />
        </div>
      );
    },
  },
  {
    id: "available", // Sorting is only clientside
    header: "Available",
    enableSorting: false,
    accessorFn: ({ metadata }) =>
      +(metadata?.total || 0) - +(metadata.used || 0),
    cell(props) {
      const metadata = props.row.original.metadata;
      return bytes((metadata?.total || 0) - (metadata?.used || 0), {
        unitSeparator: " ",
      });
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button size="sm">
          <Link
            to="/admin/users/$id"
            params={{ id: row.original.user.id + "" }}
          >
            Details
          </Link>
        </Button>
      );
    },
  },
];
