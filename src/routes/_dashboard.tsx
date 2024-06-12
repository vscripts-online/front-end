import { useAuthAPIQuery } from "@/auth";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import {
  Link,
  Outlet,
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  component: Layout,
});

function Layout() {
  const navigate = useNavigate();

  const { GetMe } = useAuthAPIQuery();
  const { data, isFetched, isPending } = GetMe();

  if (isFetched && !data) {
    navigate({ replace: true, to: "/" });
    return;
  }

  if (isPending) return "loading";

  return (
    data && (
      <>
        <Navbar>
          {data.metadata?.admin && <Link to="/admin">Admin</Link>}
          <Link to="/dashboard">Upload</Link>
          <Link to="/dashboard/files">Files</Link>
        </Navbar>
        <Separator />
        <div className="p-5">
          <Outlet />
        </div>
      </>
    )
  );
}
