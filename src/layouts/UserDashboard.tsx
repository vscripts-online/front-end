import NavLink from "@/components/nav-link";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function UserDashboardHeader() {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="flex p-5 border-b border-black">
      <Toaster richColors />

      <div className="grow">
        <NavigationMenu>
          <NavigationMenuList>
            <NavLink text="Upload" to="/dashboard" />
            <NavLink text="Files" to="/dashboard/files" />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center">
        <Link
          to="/"
          className="font-semibold border-black"
          onClick={handleLogout}
          style={{ borderBottom: "1px solid black" }}
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default function UserDashboardLayout() {
  return (
    <>
      <div className="w-screen bg-slate-200 h-fit min-h-screen">
        <div className="rounded border m-5 bg-background">
          <UserDashboardHeader />
          <div className="m-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
