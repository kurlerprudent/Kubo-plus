// pages/radiologist/dashboard.tsx
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import { Separator } from "@/components/ui/separator";
  import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
  import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminAppSidebar } from "@/components/app-sidebar-admin";
import { DoctorPatientTable } from "@/components/doctor-patient-table";
  
  export default function ViewAssigned() {
    return (
      <SidebarProvider>
        <AdminAppSidebar />
        <SidebarInset className="flex flex-col h-screen">
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin-dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>View Assigned Patients - Doctors</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          
         
           <DoctorPatientTable />
         
        </SidebarInset>
      </SidebarProvider>
    );
  }