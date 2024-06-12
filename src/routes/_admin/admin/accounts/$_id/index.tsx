import LoadingButton from "@/components/loading-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AutoForm from "@/components/ui/auto-form";
import { accountCreateFormSchema } from "@/schemas/account_create";
import {
  useAdminDeleteAccount,
  useAdminSyncAccount,
  useAdminUpdateLabel,
} from "@/services/mutations";
import { useAdminAccount } from "@/services/queries";
import { byte } from "@/utils";
import { TimeAgo } from "@/utils/timeago";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/admin/accounts/$_id/")({
  component: Page,
});

function Page() {
  const _id = useParams({ from: Route.id, select: (params) => params._id });
  const navigate = useNavigate();

  const { data, isPending, error } = useAdminAccount(_id);

  if (error) {
    toast.error(error as any);
    navigate({ to: "/admin/accounts" });
  }

  const { mutate: syncMutate, isPending: syncPending } = useAdminSyncAccount();
  const { mutate: updateMutate, isPending: updatePending } =
    useAdminUpdateLabel({
      onSuccess() {
        toast.success("Updated");
      },
    });

  const { mutate: deleteMutate, isPending: deletePending } =
    useAdminDeleteAccount({
      onSuccess() {
        toast.success("Account deleted");
        navigate({ to: "/admin/accounts" });
      },
      onError(error) {
        console.log("account delete error");
        console.log(error);
      },
    });

  if (isPending) return "Loading";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <LoadingButton
              onClick={() => syncMutate(_id)}
              loading={syncPending}
            >
              Sync Now
            </LoadingButton>
            {isPending && "loading..."}
            {data && !isPending && (
              <p>
                {byte(Number(data.available_size) || 0)} /{" "}
                {byte(Number(data.storage_size) || 0)} Sync At:{" "}
                {data.sync_time && <TimeAgo date={data.sync_time} />}
              </p>
            )}
          </div>
          <AlertDialog>
            <AlertDialogTrigger className="w-fit" asChild>
              <LoadingButton variant="destructive" loading={deletePending}>
                Delete
              </LoadingButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete File?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-700"
                  onClick={() => deleteMutate(_id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <AutoForm
        formSchema={accountCreateFormSchema}
        values={data}
        onSubmit={(values) => updateMutate({ _id, label: values.label })}
        fieldConfig={{
          type: {
            inputProps: {
              disabled: true,
            },
          },
          client_id: {
            inputProps: {
              disabled: true,
            },
          },
          client_secret: {
            inputProps: {
              disabled: true,
            },
          },
        }}
      >
        <LoadingButton type="submit" loading={updatePending}>
          Update
        </LoadingButton>
      </AutoForm>
    </div>
  );
}
