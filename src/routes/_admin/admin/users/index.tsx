import LoadingButton from "@/components/loading-button";
import { useAdminUsers } from "@/services/queries";
import { columns } from "@/tables/admin/user/columns";
import { DataTable } from "@/tables/admin/user/data-table";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_admin/admin/users/")({
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
    refetch,
  } = useAdminUsers();
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
    setRowSelection({});
  }, [columnFilters]);

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  }, [sorting]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 justify-end">
        <LoadingButton loading={isFetching} onClick={() => refetch()}>
          Refresh
        </LoadingButton>
      </div>
      <DataTable
        isFetching={isFetching}
        columns={columns}
        data={data?.users || []}
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
  );
}
