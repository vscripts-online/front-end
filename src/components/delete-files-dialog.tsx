import DeleteButton from "@/components/delete-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { IFile } from "@/types/file";
import { useState } from "react";

type DeleteDialogProps = {
  rowSelection: Record<string, boolean>;
  all: Map<string, IFile>;
  handleDelete: () => void;
  isPending: boolean;
};

const DeleteDialog = ({
  rowSelection,
  all,
  handleDelete,
  isPending,
}: DeleteDialogProps) => {
  const [open, setOpen] = useState(false);

  async function deleteFile() {
    handleDelete();
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DeleteButton
          loading={isPending}
          disabled={Object.keys(rowSelection).length === 0 || isPending}
        >
          Delete
        </DeleteButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete files</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              The following{" "}
              <span className="font-bold">
                {Object.keys(rowSelection).length}
              </span>{" "}
              files will be deleted. This action cannot be undone.
              <Separator className="my-3" />
              <div className="max-h-[7rem] overflow-auto">
                {Object.keys(rowSelection).map((_id) => (
                  <div className="flex items-center gap-1 py-1" key={_id}>
                    {all.get(_id)?.file_name}
                  </div>
                ))}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <DeleteButton
            className="bg-rose-700"
            loading={isPending}
            onClick={deleteFile}
          >
            Delete
          </DeleteButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
