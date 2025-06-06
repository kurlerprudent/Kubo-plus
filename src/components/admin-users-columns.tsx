// src/components/admin/admin-users-columns.tsx (NEW FILE)
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, ShieldAlert, ShieldCheck, ShieldX, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AdminUser, AdminUserStatus, getAdminUserFullName } from "@/types/admin-user"; // Adjust path
import { cn } from "@/lib/utils";

// --- Status Badge Component/Helper ---
const StatusBadge = ({ status }: { status: AdminUserStatus }) => {
    const variant: "success" | "secondary" | "warning" =
        status === "ACTIVE" ? "success" : status === "PENDING" ? "warning" : "secondary";
    const Icon = status === "ACTIVE" ? ShieldCheck : status === "PENDING" ? ShieldAlert : ShieldX;

    // Define styles within the component or use pre-defined Badge variants
    const statusClasses = cn(
        "text-xs font-medium me-2 px-2.5 py-0.5 rounded border capitalize",
        status === "ACTIVE" && "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700",
        status === "INACTIVE" && "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700/40 dark:text-gray-400 dark:border-gray-600",
        status === "PENDING" && "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700"
    );

    return (
        <span className={statusClasses}>
            <Icon className="inline-block w-3 h-3 mr-1" />
            {status}
        </span>
    );
};


// --- Row Actions Component ---
interface AdminUsersTableRowActionsProps {
  row: { original: AdminUser };
  onEdit: (admin: AdminUser) => void;
  onDelete: (adminId: string) => void;
  onChangeStatus?: (adminId: string, status: AdminUserStatus) => void; // Optional status change
}

function AdminUsersTableRowActions({ row, onEdit, onDelete, onChangeStatus }: AdminUsersTableRowActionsProps) {
  const admin = row.original;
  const fullName = getAdminUserFullName(admin);

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0"> <span className="sr-only">Open menu</span> <MoreHorizontal className="h-4 w-4" /> </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onEdit(admin)}> <Pencil className="mr-2 h-4 w-4" /> Edit User </DropdownMenuItem>

          {/* Optional: Add Status Change Actions Here */}
          {onChangeStatus && ( <>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={() => onChangeStatus(admin.id, 'ACTIVE')} disabled={admin.status === 'ACTIVE'}> <ShieldCheck className="mr-2 h-4 w-4" /> Activate </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => onChangeStatus(admin.id, 'INACTIVE')} disabled={admin.status === 'INACTIVE'}> <ShieldX className="mr-2 h-4 w-4" /> Deactivate </DropdownMenuItem>
                 {/* Add Pending if needed */}
          </>)}

          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onSelect={(e) => e.preventDefault()} > <Trash2 className="mr-2 h-4 w-4" /> Delete User </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader> <AlertDialogTitle>Confirm Deletion</AlertDialogTitle> <AlertDialogDescription> This action cannot be undone. Are you sure you want to permanently delete {fullName}? </AlertDialogDescription> </AlertDialogHeader>
              <AlertDialogFooter> <AlertDialogCancel>Cancel</AlertDialogCancel> <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => onDelete(admin.id)}> Delete User </AlertDialogAction> </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


// --- Column Definitions ---
export const getAdminUsersColumns = (
    onEdit: (admin: AdminUser) => void,
    onDelete: (adminId: string) => void,
    onChangeStatus?: (adminId: string, status: AdminUserStatus) => void // Optional status change
): ColumnDef<AdminUser>[] => [
    {
      id: "select",
      header: ({ table }) => (<Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all"/>),
      cell: ({ row }) => (<Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row"/>),
      enableSorting: false, enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => ( <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} > Name <ArrowUpDown className="ml-2 h-4 w-4" /> </Button> ),
      cell: ({ row }) => {
           const admin = row.original;
           const fullName = getAdminUserFullName(admin);
           const fallback = (admin.firstName?.[0] ?? '' ) + (admin.lastName?.[0] ?? '');
           return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"> <AvatarImage src={admin.avatarUrl} alt={fullName} /> <AvatarFallback>{fallback}</AvatarFallback> </Avatar>
                    <div className="grid gap-0.5">
                        <span className="font-medium">{fullName}</span>
                        <span className="text-xs text-muted-foreground">{admin.email}</span> {/* Email under name */}
                    </div>
                </div> )},
      filterFn: (row, id, value) => {
           const fullName = getAdminUserFullName(row.original).toLowerCase();
           const email = row.original.email.toLowerCase();
           const filterValue = String(value).toLowerCase();
           return fullName.includes(filterValue) || email.includes(filterValue); // Filter name or email
      },
    },
    // { accessorKey: "email", header: "Email" }, // Email is shown under name now
    { accessorKey: "role", header: "Role" },
    {
        accessorKey: "status",
        header: ({ column }) => ( <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} > Status <ArrowUpDown className="ml-2 h-4 w-4" /> </Button> ),
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
        accessorKey: "lastLogin",
        header: ({ column }) => ( <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} > Last Login <ArrowUpDown className="ml-2 h-4 w-4" /> </Button> ),
        cell: ({ row }) => {
            const lastLogin = row.getValue("lastLogin") as Date | null;
            return <div>{lastLogin ? lastLogin.toLocaleDateString() : 'Never'}</div>;
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => ( <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} > Date Added <ArrowUpDown className="ml-2 h-4 w-4" /> </Button> ),
        cell: ({ row }) => <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>,
    },
    {
      id: "actions", enableHiding: false,
      cell: ({ row }) => <AdminUsersTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} onChangeStatus={onChangeStatus} />,
    },
];