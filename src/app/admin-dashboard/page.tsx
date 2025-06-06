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
import {AdminChart} from "@/components/admin-dashboard-chart";
import { AdminAppSidebar } from "@/components/app-sidebar-admin";
import { DoctorPatientChart } from "@/components/doctor-patient-chart";
  
  export default function AdminDashboard() {
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
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-4 p-4">
              {/* Metrics Section */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="bg-white shadow p-6 rounded-xl flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-700">Number of Doctors</span>
                  <span className="text-3xl font-bold text-blue-600 mt-2">8</span>
                </div>
                <div className="bg-white shadow p-6 rounded-xl flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-700">Number of Patient</span>
                  <span className="text-3xl font-bold text-blue-600 mt-2">42</span>
                </div>
                <div className="bg-white shadow p-6 rounded-xl flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-700">Uploads Today</span>
                  <span className="text-3xl font-bold text-blue-600 mt-2">5</span>
                </div>
                <div className="bg-white shadow p-6 rounded-xl flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-700">Avg Processing Time</span>
                  <span className="text-3xl font-bold text-blue-600 mt-2">23m</span>
                </div>
              </div>
  
             
             
  
              {/* Analysis Overview Chart */}
              <div className="bg-white shadow p-6 rounded-xl">
              
                 <DoctorPatientChart/>
                
              </div>
            </div>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    );
  }