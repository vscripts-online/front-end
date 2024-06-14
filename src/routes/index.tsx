import { useAuthAPIQuery } from "@/auth";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Onboard,
});

function Onboard() {
  const { GetMe } = useAuthAPIQuery();
  const { data } = GetMe();

  return (
    <>
      <Navbar>
        {data && (
          <Link to="/dashboard" disabled={!data}>
            Dashboard
          </Link>
        )}
      </Navbar>
      {data && (
        <div className="mx-auto w-fit mt-52 text-center text-xl">
          Did you see{" "}
          <a
            href="https://shorter.vscripts.online"
            className="underline underline-offset-2 font-semibold"
          >
            Shorter
          </a>{" "}
          service?
          <br />
          <a href="https://shorter.vscripts.online">
            <Button className="mt-5 h-auto bg-red-600 text-white border">
              Take a look
            </Button>
          </a>
        </div>
      )}
      {!data && (
        <div className="mx-auto w-fit mt-52 text-center text-xl">
          Sign now and get{" "}
          <span className="font-semibold underline underline-offset-2">
            500 MB
          </span>{" "}
          free storage
        </div>
      )}
    </>
  );
}
