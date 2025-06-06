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
  import DashboardChart from "@/components/DashboardChart";
  import { RadiologistAppSidebar } from "@/components/app-sidebar-doctor";
  
  export default function RadiologistDashboard() {
    return (
      <SidebarProvider>
        <RadiologistAppSidebar />
        <SidebarInset className="flex flex-col h-screen">
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/radiologist/dashboard">Dashboard</BreadcrumbLink>
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
                  <span className="text-lg font-semibold text-gray-700">Pending Analysis</span>
                  <span className="text-3xl font-bold text-blue-600 mt-2">8</span>
                </div>
                <div className="bg-white shadow p-6 rounded-xl flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-700">Completed Reports</span>
                  <span className="text-3xl font-bold text-blue-600 mt-2">42</span>
                </div>
                <div className="bg-white shadow p-6 rounded-xl flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-700">Uploads Today</span>
                  <span className="text-3xl font-bold text-blue-600 mt-2">5</span>
                </div>
                <div className="bg-white shadow p-6 rounded-xl flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-700">Average Processing Time</span>
                  <span className="text-3xl font-bold text-blue-600 mt-2">23m</span>
                </div>
              </div>
  
              {/* Recent Activity Section */}
              <div className="bg-white shadow p-6 rounded-xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">New chest X-ray uploaded (PID-2345)</span>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Pneumonia detection report generated</span>
                    <span className="text-sm text-gray-500">4 hours ago</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Critical case flagged (PID-6789)</span>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </li>
                  {/* Add more items to test scrolling */}
                  {[...Array(2)].map((_, i) => (
                    <li key={i} className="flex justify-between items-center">
                      <span className="text-gray-600">Sample activity item {i + 1}</span>
                      <span className="text-sm text-gray-500">Just now</span>
                    </li>
                  ))}
                </ul>
              </div>
  
              {/* Analysis Overview Chart */}
              <div className="bg-white shadow p-6 rounded-xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Analysis</h2>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <DashboardChart />
                </div>
              </div>
            </div>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    );
  }