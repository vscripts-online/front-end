import { Button } from "@/components/ui/button";
import { useAdminTotalStorage } from "@/services/queries";
import { byte } from "@/utils";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/")({
  component: Page,
});

function Page() {
  const { data, isPending } = useAdminTotalStorage();

  return (
    <div className="flex flex-col gap-4">
      {isPending && "Loading.."}
      {data && (
        <div className="flex flex-col gap-2">
          <p>Total Storage: {byte(+data.total_storage)}</p>
          <p>Available Storage: {byte(+data.available_storage)}</p>
          <p>Total Accounts: {data.total_accounts}</p>
        </div>
      )}
      <Link to="/dashboard">
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
}
