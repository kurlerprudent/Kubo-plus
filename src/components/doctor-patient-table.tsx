"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, UserPlus, UserMinus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { HeaderContext, CellContext } from "@tanstack/react-table";

// --- Data Type ---
export type DoctorAssignment = {
  id: string;
  name: string;
  specialty: string;
  assignedPatientsCount: number;
};

// --- Mock Data --- (Replace with actual data fetching)
const data: DoctorAssignment[] = [
  { id: "doc1", name: "Dr. Alice Martin", specialty: "Radiologist", assignedPatientsCount: 5 },
  { id: "doc2", name: "Dr. Bob Johnson", specialty: "Radiographer", assignedPatientsCount: 3 },
  { id: "doc3", name: "Dr. Carol White", specialty: "Physist", assignedPatientsCount: 8 },
  { id: "doc4", name: "Dr. David Smith", specialty: "Radiologist", assignedPatientsCount: 2 },
  { id: "doc5", name: "Dr. Eve Adams", specialty: "Radiologist", assignedPatientsCount: 6 },
];

// --- Action Handlers ---
const handleAssignPatient = (doctorId: string, doctorName: string) => {
  console.log(`Assigning patient to Dr. ${doctorName} (ID: ${doctorId})`);
  toast.success(`Assign Action: Triggered assign for Dr. ${doctorName}. Implement modal/logic.`);
};

const handleUnassignPatient = (doctorId: string, doctorName: string) => {
  console.log(`Unassigning patient from Dr. ${doctorName} (ID: ${doctorId})`);
  toast(`Unassign Action: Triggered unassign for Dr. ${doctorName}. Implement modal/logic.`);
};

// --- Column Definitions ---
export const doctorAssignmentColumns: ColumnDef<DoctorAssignment>[] = [
  {
    id: "select",
    header: ({ table }: HeaderContext<DoctorAssignment, unknown>) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }: CellContext<DoctorAssignment, unknown>) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean | "indeterminate") =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }: HeaderContext<DoctorAssignment, unknown>) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Doctor Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: CellContext<DoctorAssignment, unknown>) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "specialty",
    header: "Specialty",
    cell: ({ row }: CellContext<DoctorAssignment, unknown>) => (
      <div>{row.getValue("specialty")}</div>
    ),
  },
  {
    accessorKey: "assignedPatientsCount",
    header: ({ column }: HeaderContext<DoctorAssignment, unknown>) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Assigned Patients
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: CellContext<DoctorAssignment, unknown>) => (
      <div className="text-center font-medium">
        {row.getValue("assignedPatientsCount")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }: CellContext<DoctorAssignment, unknown>) => {
      const doctor: DoctorAssignment = row.original;
      return (
        <div className="flex justify-center space-x-2">
         
        
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleAssignPatient(doctor.id, doctor.name)}
              >
                <UserPlus className="mr-2 h-4 w-4" /> Assign Patient
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUnassignPatient(doctor.id, doctor.name)}
              >
                <UserMinus className="mr-2 h-4 w-4" /> Unassign Patient(s)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(doctor.id)}
              >
                Copy Doctor ID
              </DropdownMenuItem>
              <DropdownMenuItem>View Doctor Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

// --- Main Table Component ---
export function DoctorPatientTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: doctorAssignmentColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <Card className="shadow-lg">
      <CardHeader >
        <CardTitle>Doctor-Patient Assignments</CardTitle>
        <CardDescription>
          Manage patient assignments for each doctor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          {/* Filtering and Column Visibility Controls */}
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by doctor name..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Table */}
          <div className="rounded-md border shadow-sm">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="bg-blue-600 text-white uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={index % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
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
                      colSpan={doctorAssignmentColumns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* Pagination Controls */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-gray-600">
              {table.getFilteredRowModel().rows.length} row(s) displayed.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
