import { Input } from "@/components/ui/input";
import { formatByte, formatByteRow } from "@/lib/utils";
import { useSetTotalDrive } from "@/services/mutations";
import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import bytes from "bytes";
import { Check, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "total_drive",
    header: "Total Drive",
    cell: ({ row }) => {
      const _total_drive = row.original.total_drive;
      const user = row.original.id;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [edit, setEdit] = useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [total_drive, setTotalDrive] = useState(_total_drive);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const inputRef = useRef<HTMLInputElement>(null);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const setTotalDriveMutation = useSetTotalDrive();

      const formatted = formatByte(total_drive + "");

      const update = async () => {
        const byted = bytes(inputRef.current!.value);
        if (typeof byted === "number") {
          setTotalDrive(byted + "");
          setTotalDriveMutation.mutate({ user, size: byted + "" });
        }
        setEdit(false);
      };

      if (setTotalDriveMutation.isPending) {
        return <Loader2 className="animate-spin ml-5" />;
      }

      return (
        <>
          {edit ? (
            <div className="flex gap-3">
              <Input type="text" defaultValue={formatted} ref={inputRef} />
              <Check
                onClick={update}
                className="my-auto border rounded-full p-1 cursor-pointer hover:bg-green-100"
                height={32}
                width={32}
              />
              <X
                onClick={() => setEdit(false)}
                className="my-auto border rounded-full p-1 cursor-pointer hover:bg-green-100"
                height={32}
                width={32}
              />
            </div>
          ) : (
            <h4
              className="font-medium underline cursor-pointer"
              onClick={() => setEdit(true)}
            >
              {formatted}
            </h4>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "available_storage",
    header: "Available Storage",
    cell: ({ row }) => {
      const total_drive = row.getValue("total_drive") as string;
      const used_size = row.getValue("used_size") as string;

      const available_storage = parseInt(total_drive) - parseInt(used_size);
      const formatted = formatByte(available_storage + "");
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "used_size",
    header: "Used Storage",
    cell: ({ row, column }) => {
      return formatByteRow(row, column);
    },
  },
];
