// src/app/superadmin/manage-admins/page.tsx (Update/replace existing)
"use client";

import * as React from "react";
import Link from "next/link"; // Import Link for navigation
import { Button } from "@/components/ui/button";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, UserCog } from "lucide-react"; 
import { AdminUsersTable } from "@/components/admin-users-table"; 
import { AdminUser, AdminUserStatus } from "@/types/admin-user"; 
import { toast } from "sonner";
import { SuperAdminAppSidebar } from "@/components/app-sidebar-superadmin";


const mockAdminUsers: AdminUser[] = [
    { id: "sa001", firstName: "Eleanor", lastName: "Vance", email: "e.vance@super.co", role: "SuperAdmin", status: "ACTIVE", lastLogin: new Date(2025, 3, 11, 15, 30), createdAt: new Date(2023, 1, 10), avatarUrl: "/placeholder-avatar.png" }, // Use placeholder
    { id: "adm002", firstName: "Marcus", lastName: "Bell", email: "m.bell@super.co", role: "Admin", status: "ACTIVE", lastLogin: new Date(2025, 3, 12, 8, 0), createdAt: new Date(2023, 5, 20) },
    { id: "adm003", firstName: "Isla", lastName: "Chen", email: "i.chen@super.co", role: "ContentAdmin", status: "INACTIVE", lastLogin: new Date(2025, 2, 5), createdAt: new Date(2023, 8, 1) },
    { id: "adm004", firstName: "Leo", lastName: "Santos", email: "l.santos@super.co", role: "SupportAdmin", status: "PENDING", lastLogin: null, createdAt: new Date(2024, 10, 15), avatarUrl: "/placeholder-avatar.png" },
    { id: "adm005", firstName: "Zara", lastName: "Ali", email: "z.ali@super.co", role: "Admin", status: "ACTIVE", lastLogin: new Date(2025, 3, 9), createdAt: new Date(2024, 2, 28) },
];

export default function ManageAdminsPage() {
  const [admins, setAdmins] = React.useState<AdminUser[]>(mockAdminUsers);
  // Add state for edit dialog if using modal approach
   const [editingAdmin, setEditingAdmin] = React.useState<AdminUser | undefined>();
   const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  // --- Placeholder Handler Functions ---
  const handleEditAdmin = (admin: AdminUser) => {

    console.log("Editing admin:", admin);
     setEditingAdmin(admin);
     setIsEditDialogOpen(true);
     toast.message(`Editing admin: ${admin.firstName} ${admin.lastName}`);
  };

  const handleDeleteAdmin = (adminId: string) => {
    // TODO: Implement delete logic - e.g., call API
    console.log("Deleting admin:", adminId);
    // Simulate optimistic update
    setAdmins(prev => prev.filter((admin) => admin.id !== adminId));
    toast.success(`Admin with ID ${adminId} deleted.`);
  };

   const handleChangeStatus = (adminId: string, status: AdminUserStatus) => {
    // TODO: Implement status change logic - e.g., call API
    console.log(`Changing status for admin ${adminId} to ${status}`);
    // Simulate optimistic update
    setAdmins(prev => prev.map(admin => admin.id === adminId ? {...admin, status: status} : admin));
    toast.success(`Admin with ID ${adminId} status changed to ${status}.`);
  };



  return (
    <SidebarProvider>
      <SuperAdminAppSidebar /> 
      <SidebarInset className="flex flex-col h-screen">
        {/* Header */}
        <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b px-4 md:px-6">
          <SidebarTrigger className="lg:hidden" />
          <Breadcrumb className="hidden md:flex flex-1"> {/* Hide breadcrumb on small screens maybe */}
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/superadmin-dashboard">SuperAdmin</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Manage Admins</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* Add Admin Button */}
          <Link href="/superadmin/manage-admins/add" passHref> {/* Link to Add page */}
             <Button size="sm"> <PlusCircle className="mr-2 h-4 w-4" /> Add Admin </Button>
          </Link>
           {/* OR use Dialog approach */}
           {/* <AdminUserFormDialog mode="add" onSubmit={handleAddAdmin} trigger={<Button size="sm">...</Button>} /> */}
        </header>

        {/* Main Content */}
        <ScrollArea className="flex-1 bg-muted/30"> {/* Slightly off-white background */}
          <main className="p-4 md:p-6 lg:p-8 space-y-6">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <UserCog className="h-6 w-6 text-primary" /> Manage Administrators
            </h1>
            {/* Render the Admin Users Table */}
            <AdminUsersTable
                data={admins}
                onEdit={handleEditAdmin}
                onDelete={handleDeleteAdmin}
                onChangeStatus={handleChangeStatus} // Pass status change handler
            />
          </main>
        </ScrollArea>
      </SidebarInset>
        {/* --- Edit Admin Dialog (if using modal approach) --- */}
       {/* {editingAdmin && (
           <AdminUserFormDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                mode="edit"
                initialData={editingAdmin}
                onSubmit={handleActualEditAdminAPI} // Needs a separate handler for API call
           />
       )} */}
    </SidebarProvider>
  );
}