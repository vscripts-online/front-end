import { AccountSheet } from "@/components/Sheets/AccountAccount/AccountSheet";
import { TypographyH2 } from "@/components/ui/typographyH2";
import { useAccounts } from "@/services/queries";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import "./index.css";

export default function AccountsDashbard() {
  const { data, isLoading } = useAccounts();

  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="grow">
          <TypographyH2 text="Accounts" />
        </div>
        <div>
          <AccountSheet />
        </div>
      </div>
      {isLoading && "Loading"}
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}
