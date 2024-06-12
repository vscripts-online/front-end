import { useUserFiles } from "@/services/queries";
import { columns } from "@/tables/file/columns";
import { DataTable } from "@/tables/file/data-table";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import DeleteDialog from "@/components/delete-files-dialog";
import { useDeleteFile } from "@/services/mutations";
import LoadingButton from "@/components/loading-button";

export const Route = createFileRoute("/_dashboard/dashboard/files/")({
  component: Page,
});

function Page() {
  const {
    data,
    isFetching,
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    all,
    setAll,
    refetch,
  } = useUserFiles();
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
    setRowSelection({});
  }, [columnFilters]);

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  }, [sorting]);

  const { isPending, mutateAsync } = useDeleteFile();

  async function handleDelete() {
    for (const _id in rowSelection) {
      await mutateAsync(_id);
      setAll((old) => {
        old.delete(_id);
        return old;
      });

      setRowSelection((old) => {
        delete old[_id];
        return old;
      });
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 justify-end">
          <LoadingButton loading={isFetching} onClick={() => refetch()}>
            Refresh
          </LoadingButton>
          <DeleteDialog
            rowSelection={rowSelection}
            all={all}
            handleDelete={handleDelete}
            isPending={isPending}
          />
        </div>
        <DataTable
          isFetching={isFetching}
          columns={columns}
          data={data?.files || []}
          pagination={pagination}
          rowSelection={rowSelection}
          sorting={sorting}
          columnFilters={columnFilters}
          onPaginationChange={setPagination}
          onRowSelectionChange={setRowSelection}
          onSortingChange={setSorting}
          onColumnFiltersChange={setColumnFilters}
          pageCount={data?.count || 0}
          count={data?.count || 0}
        />
      </div>
    </>
  );
}
