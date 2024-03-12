import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typographyH2";
import { useFiles } from "@/services/queries";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function FilesDashbard() {
  const { data, isLoading } = useFiles();

  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="grow">
          <TypographyH2 text="Files" />
        </div>
        <div>
          <Button>New File</Button>
        </div>
      </div>
      {isLoading && "Loading"}
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}
