import { Button } from "@/components/ui/button";
import { IAccount } from "@/types/account";
import { formatByteRow } from "@/utils";
import { formatter } from "@/utils/timeago";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import TimeAgo from "react-timeago";

export const columns: ColumnDef<IAccount>[] = [
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
      const value = row.original._id as string;
      return new Date(
        parseInt(value.substring(0, 8), 16) * 1000
      ).toLocaleString();
    },
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "storage_size",
    header: "Size",
  },
  {
    accessorKey: "available_size",
    header: "Available",
    cell(props) {
      return formatByteRow(props.row, props.column);
    },
  },
  {
    accessorKey: "sync_time",
    header: "Sync",
    cell(props) {
      const value = props.row.original.sync_time;
      return value ? <TimeAgo date={value} formatter={formatter} /> : "?";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button size="sm">
          <Link to={"/admin/accounts/" + row.original._id}>Details</Link>
        </Button>
      );
    },
  },
];
