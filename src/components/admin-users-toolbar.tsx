
"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { AdminUser } from "@/types/admin-user"; 



interface AdminUsersToolbarProps {
  table: Table<AdminUser>;
}

export function AdminUsersToolbar({ table }: AdminUsersToolbarProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by name or email..."
          // Use the 'name' column filter function as it checks both name and email
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="h-8 w-[200px] lg:w-[300px]" // Responsive width
        />
 
      </div>

    </div>
  );
}
