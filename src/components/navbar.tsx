import { useAuthAPIQuery } from "@/auth";
import { byte } from "@/utils";
import Sign from "./sign";

type Props = {
  children: React.ReactNode;
};

const Navbar = (props: Props) => {
  const { GetMe } = useAuthAPIQuery();
  const { data } = GetMe();

  return (
    <div className="flex p-5 items-center h-20">
      <div className="w-full flex justify-between">
        <div className="flex gap-5">{props.children}</div>
        <div className="mr-5">
          Available:{" "}
          {byte((data?.metadata?.total || 0) - (data?.metadata?.used || 0))}
        </div>
      </div>

      <div className="ml-auto">
        <Sign />
      </div>
    </div>
  );
};

export default Navbar;
