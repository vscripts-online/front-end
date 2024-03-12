import { useMe } from "@/services/queries";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const { isLoading, isError, data } = useMe();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (isError) {
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center">
      <small className="text-xs font-medium leading-none mb-1">
        {data?.email}
      </small>
      <Link
        to="/"
        className="font-semibold border-black"
        onClick={handleLogout}
        style={{ borderBottom: "1px solid black" }}
      >
        {isLoading ? "loading..." : "Logout"}
      </Link>
    </div>
  );
}
