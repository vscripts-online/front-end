"use cilent";

import { AuthAPI, useAuthAPIQuery } from "@/auth";
import { Loader2 } from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import { generateAuthCallbackURL } from "@/utils";

type Props = {
  trigger: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
};

const AuthDropdown = (props: Props) => {
  const { SwitchUser, ListUsers } = useAuthAPIQuery();

  const { data: users, isPending: listUsersIsPending } = ListUsers();
  const { mutate: switchUser, isPending: switchUserIsPending } = SwitchUser();

  function onSwitchUser(id: number) {
    toast.info("Switching user...");

    switchUser(id, {
      onError(error, _variables, _context) {
        toast.error(error.message);
      },
      onSuccess(_data, _variables, _context) {
        toast.success("Switched account");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
    });
  }

  function onAddAccount() {
    const url = new URL(AuthAPI.loginURL);
    url.searchParams.set("callback", generateAuthCallbackURL());
    url.searchParams.set("add", "true");
    const to = url.toString();
    location.assign(to);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">{props.trigger}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {props.before}
        <DropdownMenuItem disabled>Logined users</DropdownMenuItem>
        {listUsersIsPending && (
          <div className="flex justify-center align-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-center align-center justify-center" />
          </div>
        )}
        {users &&
          users.map((user) => (
            <DropdownMenuItem
              key={user.id}
              onClick={() => onSwitchUser(user.id)}
              className="font-bold"
              disabled={switchUserIsPending}
            >
              {switchUserIsPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <UserAvatar
                size={25}
                avatar={user.avatar}
                className="rounded-full mr-2"
                imgClassName="border-none"
              />
              {user.name}
            </DropdownMenuItem>
          ))}
        <DropdownMenuItem onClick={onAddAccount} className="justify-center">
          <CiCirclePlus size={20} className="mr-1" />
          Add account
        </DropdownMenuItem>
        {props.after}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthDropdown;
