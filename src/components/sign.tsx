import { AuthAPI, useAuthAPIQuery } from "@/auth";
import { generateAuthCallbackURL } from "@/utils";
import AuthDropdown from "./auth-dropdown";
import { Button } from "./ui/button";
import { UserProfile } from "./user-profile";

export const SignButton = ({ onClick }: { onClick?: () => unknown }) => {
  return (
    <Button
      variant="shine"
      onClick={onClick}
      className="bg-sky-400 from-sky-700 via-sky-700/50 to-sky-700"
    >
      Sign In
    </Button>
  );
};

export default function Sign() {
  const { GetMe, ListUsers } = useAuthAPIQuery();

  const { data, error } = GetMe();
  const { data: users } = ListUsers();

  if (!data && users && users.length > 0)
    return <AuthDropdown trigger={<SignButton />} />;

  if (!error && !!data) return <UserProfile />;

  function redirectToLogin() {
    const url = new URL(AuthAPI.loginURL);
    url.searchParams.set("callback", generateAuthCallbackURL());
    const to = url.toString();
    location.assign(to);
  }

  return <SignButton onClick={redirectToLogin} />;
}
