import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: "calc(100vh - 130px)" }}
    >
      <Loader2 className="animate-spin" size={40} />
    </div>
  );
};

export default Loading;
