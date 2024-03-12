import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <div className="w-screen h-screen bg-slate-400">
        <Outlet />
      </div>
    </>
  );
}
