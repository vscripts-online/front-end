import NavLink from "@/components/nav-link";
import Profile from "@/components/profile";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function AdminDashboardHeader() {
  return (
    <div className="flex p-5 border-b border-black">
      <Toaster richColors />

      <div className="mr-20">
        <NavigationMenu>
          <NavigationMenuList>
            <NavLink text="Overview" to="/admin" />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="grow">
        <NavigationMenu>
          <NavigationMenuList>
            <NavLink text="Accounts" to="/admin/accounts" />
            <NavLink text="Users" to="/admin/users" />
            <NavLink text="Files" to="/admin/files" />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center">
        <Profile />
      </div>
    </div>
  );
}

export default function AdminDashboardLayout() {
  return (
    <>
      <div className="w-screen bg-slate-200 h-fit min-h-screen">
        <div className="rounded border m-5 bg-background">
          <AdminDashboardHeader />
          <div className="m-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
