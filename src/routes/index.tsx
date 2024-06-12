import { useAuthAPIQuery } from "@/auth";
import Navbar from "@/components/navbar";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Onboard,
});

function Onboard() {
  const { GetMe } = useAuthAPIQuery();
  const { data } = GetMe();

  return (
    <Navbar>
      {data && (
        <Link to="/dashboard" disabled={!data}>
          Dashboard
        </Link>
      )}
    </Navbar>
  );
}
