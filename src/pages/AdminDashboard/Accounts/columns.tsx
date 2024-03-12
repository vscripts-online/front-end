import { DeleteAccountDialog } from "@/components/delete-account.dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccountsContext } from "@/contexts/accounts.context";
import { formatByteRow } from "@/lib/utils";
import { IAccount } from "@/types/account";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

export const columns: ColumnDef<IAccount>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "label",
    header: "Label",
    cell: ({ row }) => {
      const data = row.original;
      return data.access_token ? (
        data.label
      ) : (
        <div className="flex flex-col">
          <div className="text-red-500">* LOGIN REQUIRED</div>
          <div>{data.label}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "storage_size",
    header: "Storage Size",
    cell: ({ row, column }) => {
      return formatByteRow(row, column);
    },
  },
  {
    accessorKey: "available_size",
    header: "Available Size",
    cell: ({ row, column }) => {
      return formatByteRow(row, column);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setAccount } = useAccountsContext();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setOpen] = useState<boolean>(false);

      const handleUpdateButton = (account: IAccount) => {
        setAccount(account);
      };

      return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <DeleteAccountDialog
                account={row.original}
                onDelete={() => setOpen(false)}
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer font-semibold text-sky-600"
              onClick={() => handleUpdateButton(row.original)}
            >
              Update
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
