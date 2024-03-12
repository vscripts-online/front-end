import LoginDialog from "@/components/login-dialog";
import { TypographyH2 } from "@/components/ui/typographyH2";
import { useMe } from "@/services/queries";
import { useNavigate } from "react-router-dom";

export default function OnBoard() {
  const { data, isLoading } = useMe();

  const navigate = useNavigate();

  if (data?.id) {
    navigate("/dashboard");
  }

  return (
    <>
      <div className="w-full">
        <div className="flex m-10  justify-between h-fit">
          <TypographyH2 text="vscripts.online" />
          {!isLoading && <LoginDialog />}
        </div>
      </div>
      <div className="w-100 h-100 flex justify-center my-5 pt-48">
        <TypographyH2 text="Sign and get 500mb free storage" />
      </div>
    </>
  );
}
