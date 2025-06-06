
"use client";

import * as React from "react";
import {
  ColumnFiltersState, SortingState, VisibilityState, flexRender,
  getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel, useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { AdminUser, AdminUserStatus } from "@/types/admin-user"; // Adjust path
import { getAdminUsersColumns } from "./admin-users-columns"; // Import columns definition
import { AdminUsersToolbar } from "./admin-users-toolbar" // Import toolbar
import { AdminUsersPagination } from "./admin-users-pagination"; // Import pagination

interface AdminUsersTableProps {
    data: AdminUser[];
    onEdit: (admin: AdminUser) => void;
    onDelete: (adminId: string) => void;
    onChangeStatus?: (adminId: string, status: AdminUserStatus) => void; // Optional
}

export function AdminUsersTable({ data, onEdit, onDelete, onChangeStatus }: AdminUsersTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Memoize columns to prevent re-creation on every render
  const columns = React.useMemo(() => getAdminUsersColumns(onEdit, onDelete, onChangeStatus), [onEdit, onDelete, onChangeStatus]);

  const table = useReactTable({
    data, columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // For potential future select filters
    getFacetedUniqueValues: getFacetedUniqueValues(), // For potential future select filters
     initialState: { pagination: { pageSize: 10 } }, // Default page size
  });

  return (
    <div className="space-y-4">
      <AdminUsersToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center"> No results. </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AdminUsersPagination table={table} />
    </div>
  );
}