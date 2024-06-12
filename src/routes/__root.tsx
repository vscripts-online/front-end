import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import "./globals.css";

// const TanStackRouterDevtools =
//   process.env.NODE_ENV === "production"
//     ? () => null
//     : React.lazy(() =>
//         import("@tanstack/router-devtools").then((res) => ({
//           default: res.TanStackRouterDevtools,
//         }))
//       );

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 60000 * 5,
            staleTime: 60000 * 5,
          },
        },
      })
  );

  return (
    <>
      <div className="w-full max-w-screen">
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <Toaster richColors />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </div>
      <Suspense>{/* <TanStackRouterDevtools /> */}</Suspense>
    </>
  );
}
