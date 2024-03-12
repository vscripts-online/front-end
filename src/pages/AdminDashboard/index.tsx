import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH2 } from "@/components/ui/typographyH2";
import { formatByte } from "@/lib/utils";
import { useTotalStorage, useTotalUsers } from "@/services/queries";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chart_data = [
  {
    name: "Ocak",
    accounts: 1,
    users: 0,
    available: 0,
    used: 0,
  },
  {
    name: "Şubat",
    accounts: 3,
    users: 1,
    available: 45,
    used: 4,
  },
  {
    name: "Mart",
    accounts: 6,
    users: 10,
    available: 90,
    used: 30,
  },
  {
    name: "Nisan",
    accounts: 10,
    users: 20,
    available: 150,
    used: 50.75,
  },
  {
    name: "Mayıs",
    accounts: 10,
    users: 12,
    available: 150,
    used: 92.88,
  },
  {
    name: "Haziran",
    accounts: 15,
    users: 30,
    available: 225,
    used: 190,
  },
];

interface OverviewCardProps {
  text: string;
  value: string;
}

function OverviewCard(props: OverviewCardProps) {
  const { text, value } = props;
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-center ">{text}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-2xl font-bold">{value || "?"}</div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const { data: total_storage, isLoading: total_storage_loading } =
    useTotalStorage();

  const { data: total_users, isLoading: total_users_loading } = useTotalUsers();

  return (
    <div className="space-y-4">
      <TypographyH2 text="Overview" />

      {(total_storage_loading || total_users_loading) && "Loading"}
      {total_storage && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            text="Total Storage"
            value={formatByte(total_storage.total_storage)}
          />
          <OverviewCard
            text="Available Storage"
            value={formatByte(total_storage.available_storage)}
          />
          <OverviewCard
            text="Total Accounts"
            value={total_storage.total_accounts + ""}
          />
          <OverviewCard text="Total Users" value={total_users + ""} />
        </div>
      )}

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chart_data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="red" />
          <Bar dataKey="accounts" fill="blue" />
          <Bar dataKey="available" fill="green" />
          <Bar dataKey="used" fill="orange" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
