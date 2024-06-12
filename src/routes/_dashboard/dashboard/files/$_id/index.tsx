import FilePage from "@/components/page/file";
import { useUpdatefile } from "@/services/mutations";
import { useFile } from "@/services/queries";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard/files/$_id/")({
  component: Page,
});

function Page() {
  const _id = useParams({ from: Route.id, select: (p) => p._id });

  return <FilePage _id={_id} useFile={useFile} useUpdate={useUpdatefile} />;
}
