import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AccountsProvider } from "./contexts/accounts.context.tsx";
import AdminDashboardLayout from "./layouts/AdminDashboard.tsx";
import RootLayout from "./layouts/Root.tsx";
import UserDashboardLayout from "./layouts/UserDashboard.tsx";
import FilesDashbard from "./pages/AdminDashboard/Files/index.tsx";
import AdminDashboard from "./pages/AdminDashboard/index.tsx";
import UsersDashbard from "./pages/AdminDashboard/Users/index.tsx";
import ErrorPage from "./pages/error.tsx";
import OnBoard from "./pages/Onboard/index.tsx";
import UserFileDetail from "./pages/UserDashboard/FileDetail/index.tsx";
import UserFilesDashbard from "./pages/UserDashboard/Files/index.tsx";
import UserDashbard from "./pages/UserDashboard/index.tsx";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        path: "",
        element: <UserDashbard />,
      },
      {
        path: "files",
        children: [
          {
            path: "",
            element: <UserFilesDashbard />,
          },
          {
            path: ":id",
            element: <UserFileDetail />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboardLayout />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <UsersDashbard />,
      },
      {
        path: "files",
        element: <FilesDashbard />,
      },
      {
        path: "accounts",
        element: <AccountsProvider />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <OnBoard />,
        index: true,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 5, retryDelay: 1000, staleTime: 1000 * 60 },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  //   <QueryClientProvider client={queryClient}>
  //     <RouterProvider router={router} />
  //   </QueryClientProvider>
  // </React.StrictMode>

  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
