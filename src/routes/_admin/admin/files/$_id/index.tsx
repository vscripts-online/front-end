import FilePage from "@/components/page/file";
import { useAdminUpdateFile } from "@/services/mutations";
import { useAdminGetFile } from "@/services/queries";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/files/$_id/")({
  component: Page,
});

function Page() {
  const _id = useParams({ from: Route.id, select: (p) => p._id });

  return (
    <FilePage
      _id={_id}
      useFile={useAdminGetFile}
      useUpdate={useAdminUpdateFile}
    />
  );
}
