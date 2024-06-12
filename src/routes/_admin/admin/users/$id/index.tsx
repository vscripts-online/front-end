import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserAvatar from "@/components/user-avatar";
import { useAdminUpdateTotal } from "@/services/mutations";
import { useAdminUser, useAdminUsersFiles } from "@/services/queries";
import { DataTable } from "@/tables/admin/file/data-table";
import { columns } from "@/tables/admin/user/file/columns";
import { byte } from "@/utils";
import { createFileRoute, useParams } from "@tanstack/react-router";
import bytes from "bytes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/admin/users/$id/")({
  component: Page,
});

function Page() {
  const id = useParams({ from: Route.id, select: (p) => p.id });
  const [edit, setEdit] = useState(false);
  const [total, setTotal] = useState(0);

  const { data, isPending } = useAdminUser(Number(id));
  const {
    data: filesData,
    isFetching: filesPending,
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
  } = useAdminUsersFiles(Number(id));

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
    setRowSelection({});
  }, [columnFilters]);

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  }, [sorting]);

  const { mutate, isPending: savePending } = useAdminUpdateTotal({
    onSuccess() {
      data!.metadata.total = total;
      toast.success("Successfull");
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message || "An error occured");
    },
  });

  useEffect(() => {
    data && setTotal(data.metadata.total || 0);
  }, [data]);

  if (isPending) return "loading";

  function handleDblClick() {
    setEdit(!edit);
  }

  function handleSave() {
    mutate({
      user: Number(id),
      total,
    });
  }

  return (
    data && (
      <div>
        <div className="flex items-center justify-evenly gap-4 border p-3">
          <div>{data.user.id}</div>
          <UserAvatar avatar={data.user.avatar} />
          <div className="flex flex-col">
            <div className="text-sm">{data.user.name}</div>
            <div className="text-sm text-slate-500">{data.user.email}</div>
          </div>
          <div className="flex items-center gap-3">
            <div>{byte(data.metadata?.used || 0)}</div>/
            {!edit && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div onDoubleClick={handleDblClick}>{byte(total)}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Double click to edit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {edit && (
              <>
                <Input
                  value={byte(total)}
                  onChange={(e) => setTotal(bytes(e.target.value))}
                />
                <Button onClick={handleDblClick}>✓</Button>
              </>
            )}
          </div>
          {!edit && data.metadata.total !== total && (
            <LoadingButton onClick={handleSave} loading={savePending}>
              Save
            </LoadingButton>
          )}
        </div>
        {filesPending && "Loading"}
        {filesData && (
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filesData.files || []}
              columnFilters={columnFilters}
              count={filesData.count}
              isFetching={filesPending}
              pagination={pagination}
              rowSelection={rowSelection}
              sorting={sorting}
              onPaginationChange={setPagination}
              onRowSelectionChange={setRowSelection}
              onSortingChange={setSorting}
              onColumnFiltersChange={setColumnFilters}
              pageCount={filesData.count || 0}
            />
          </div>
        )}
      </div>
    )
  );
}
