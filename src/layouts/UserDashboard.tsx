import NavLink from "@/components/nav-link";
import Profile from "@/components/profile";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function UserDashboardHeader() {
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
        <Profile />
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
