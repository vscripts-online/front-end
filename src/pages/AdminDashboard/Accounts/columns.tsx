/* eslint-disable react-hooks/rules-of-hooks */
import { DeleteAccountDialog } from "@/components/delete-account.dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAccountsContext } from "@/contexts/accounts.context";
import { formatByteRow } from "@/lib/utils";
import { useSyncSize, useUpdateAccountLabel } from "@/services/mutations";
import { IAccount } from "@/types/account";
import { ColumnDef } from "@tanstack/react-table";
import { Check, FilePenLine, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  data: IAccount;
}

export function Editable(props: Props) {
  const [edit, setEdit] = useState(false);
  const [label, setLabel] = useState(props.data.label || "");

  const updateLabelMutation = useUpdateAccountLabel();

  const update = async () => {
    updateLabelMutation.mutate({ label, _id: props.data._id });
    setEdit(false);
  };

  return edit ? (
    <div className="flex gap-3">
      <Input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <Check
        onClick={update}
        className="my-auto border rounded-full p-1 cursor-pointer hover:bg-green-100"
        height={32}
        width={32}
      />
      <X
        onClick={() => {
          setEdit(false);
        }}
        className="my-auto border rounded-full p-1 cursor-pointer hover:bg-green-100"
        height={32}
        width={32}
      />
    </div>
  ) : (
    <>
      {!props.data.access_token && (
        <div className="text-red-500">* LOGIN REQUIRED</div>
      )}
      <div className="flex items-center">
        <div>{props.data.label}</div>
        <FilePenLine
          size={15}
          className="cursor-pointer ml-1"
          onClick={() => setEdit(true)}
        />
      </div>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
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

      return <Editable data={data} />;
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
    accessorKey: "sync_time",
    header: "Synced At",
    cell: ({ row }) => {
      return new Date(row.original.sync_time as string).toLocaleString();
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

      const syncSizeMutation = useSyncSize({
        onSuccess() {
          toast.success("Synced");
        },
      });

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
            <DropdownMenuItem
              className="cursor-pointer font-semibold text-purple-600"
              onClick={() => syncSizeMutation.mutate(row.original._id)}
            >
              Sync Size
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
