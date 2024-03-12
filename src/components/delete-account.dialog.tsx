import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IAccount } from "@/types/account";
import { toast } from "sonner";
import { useDeleteAccount } from "@/services/mutations";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  account: IAccount;
  onDelete: () => void;
}

export function DeleteAccountDialog(props: Props) {
  const [open, setOpen] = useState(false);

  const onError = (error: Error) =>
    toast.error("Delete was not successful", {
      description: error as unknown as string,
      closeButton: true,
    });

  const onSuccess = () => {
    toast.success("Successfully deleted");
    setOpen(false);
    props.onDelete();
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const deleteAccountMutation = useDeleteAccount({
    onError,
    onSuccess,
  });

  const handleOnDelete = (e: React.MouseEvent) => {
    console.log("handleOnDelete");
    e.preventDefault();
    deleteAccountMutation.mutate({ _id: props.account._id });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="w-full text-start border-0 p-2 text-red-600 shadow-none rounded-none hover:shadow-none">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            style={{ backgroundColor: "rgba(131,136,164, 1)", color: "black" }}
            disabled={deleteAccountMutation.isPending}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-rose-600"
            onClick={handleOnDelete}
            disabled={deleteAccountMutation.isPending}
          >
            Continue
            {deleteAccountMutation.isPending && (
              <Loader2 className="animate-spin ml-5" />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
