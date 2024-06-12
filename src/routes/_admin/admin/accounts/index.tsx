import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { useAdminAccounts } from "@/services/queries";
import { columns } from "@/tables/admin/account/columns";
import { DataTable } from "@/tables/admin/account/data-table";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/accounts/")({
  component: Page,
});

function Page() {
  const { data, isPending, refetch, isFetching } = useAdminAccounts();

  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <Link to="/admin/accounts/create">
          <Button className="bg-green-700">Create</Button>
        </Link>
        <LoadingButton loading={isFetching} onClick={() => refetch()}>
          Refresh
        </LoadingButton>
      </div>
      {isPending && "Loading"}
      {data && <DataTable columns={columns} data={data} />}
    </>
  );
}
