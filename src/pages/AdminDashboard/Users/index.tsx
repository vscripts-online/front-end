import { TypographyH2 } from "@/components/ui/typographyH2";
import { useUsers } from "@/services/queries";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function UsersDashboard() {
  const { data, isLoading } = useUsers();

  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="grow">
          <TypographyH2 text="Users" />
        </div>
      </div>
      {isLoading && "Loading"}
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}
