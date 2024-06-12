import { useAuthAPIQuery } from "@/auth";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import {
  Link,
  Outlet,
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  component: Layout,
});

function Layout() {
  const { GetMe } = useAuthAPIQuery();
  const { data, isPending } = GetMe();

  const navigate = useNavigate();

  if (data && !data?.metadata?.admin) {
    navigate({ to: "/dashboard" });
  }

  if (isPending) {
    return "loading..";
  }

  return (
    <>
      <Navbar>
        <div className="flex gap-5">
          <Link to="/admin">Overview</Link>
          <Link to="/admin/accounts">Accounts</Link>
          <Link to="/admin/files">Files</Link>
          <Link to="/admin/users">Users</Link>
        </div>
      </Navbar>
      <Separator />
      <div className="p-5">{data?.metadata?.admin && <Outlet />}</div>
    </>
  );
}
