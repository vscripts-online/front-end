"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CustomArrowUpDown from "@/components/icon/CustomArrowUpDown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IFile } from "@/types/file";
import { Loader2 } from "lucide-react";
import { DataTablePagination } from "./pagination";

interface DataTableProps<TData, TValue> {
  isFetching: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  pagination: PaginationState;
  rowSelection: RowSelectionState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  onPaginationChange: OnChangeFn<PaginationState>;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onSortingChange: OnChangeFn<SortingState>;
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  count: number;
}

export type TableMeta = {
  count: number;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pagination,
  rowSelection,
  sorting,
  columnFilters,
  onPaginationChange,
  onRowSelectionChange,
  onSortingChange,
  onColumnFiltersChange,
  isFetching: isPending,
  count,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(pageCount / pagination.pageSize),
    onRowSelectionChange,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => (row as IFile)._id,
    manualPagination: true,
    manualSorting: true,
    state: {
      pagination,
      rowSelection,
      sorting,
      columnFilters,
    },
    meta: {
      count,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "text-nowrap",
                        (header.column.columnDef.meta as any)?.headerClass
                      )}
                    >
                      <div className="flex items-center gap-0.5">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanSort() && (
                          <Button
                            variant="ghost"
                            className="p-1"
                            onClick={() =>
                              header.column.toggleSorting(
                                header.column.getIsSorted() === "asc"
                              )
                            }
                          >
                            <CustomArrowUpDown
                              leftColor={
                                (header.column.getIsSorted() === "asc" &&
                                  "red") ||
                                "currentcolor"
                              }
                              rightColor={
                                (header.column.getIsSorted() === "desc" &&
                                  "red") ||
                                "currentcolor"
                              }
                              size={15}
                            />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending && (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="py-2"
                >
                  <Loader2 className="animate-spin mx-auto" size={25} />
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-1 text-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {!isPending && "No files."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
