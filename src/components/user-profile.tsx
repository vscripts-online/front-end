"use cilent";

import { toast } from "sonner";
import AuthDropdown from "./auth-dropdown";

import { AUTH_HOST, useAuthAPIQuery } from "@/auth";
import { useQueryClient } from "@tanstack/react-query";
import { DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import UserAvatar from "./user-avatar";

export const UserProfile = () => {
  const { GetMe, LogOut } = useAuthAPIQuery();
  const { mutate: logOut } = LogOut();
  const { data } = GetMe();
  const queryClient = useQueryClient();

  async function onLogout() {
    logOut(undefined, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ["authAPIQuery.GetMe"],
        });
        location.assign("/");
        toast.success("Successful");
      },
      onError(error, _variables, _context) {
        toast.error(error.message);
      },
    });
  }

  const before = (
    <>
      <DropdownMenuItem>{data?.name}</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => location.assign(AUTH_HOST + "/user/profile")}
      >
        Settings
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );

  const after = (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
    </>
  );

  const trigger = <UserAvatar avatar={data?.avatar} size={50} />;

  return <AuthDropdown trigger={trigger} before={before} after={after} />;
};
