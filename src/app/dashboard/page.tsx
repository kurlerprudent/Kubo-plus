// pages/dashboard/patient/index.tsx
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardChart from "@/components/DashboardChart";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto">
          {/* Metrics Section */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-white shadow p-6 rounded-xl flex flex-col items-center">
              <span className="text-lg font-semibold text-gray-700">Reports</span>
              <span className="text-3xl font-bold text-blue-600 mt-2">8</span>
            </div>
            <div className="bg-white shadow p-6 rounded-xl flex flex-col items-center">
              <span className="text-lg font-semibold text-gray-700">
                Appointments
              </span>
              <span className="text-3xl font-bold text-blue-600 mt-2">3</span>
            </div>
            <div className="bg-white shadow p-6 rounded-xl flex flex-col items-center">
              <span className="text-lg font-semibold text-gray-700">
                Upcoming Visits
              </span>
              <span className="text-3xl font-bold text-blue-600 mt-2">2</span>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white shadow p-6 rounded-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span className="text-gray-600">
                  Report "Chest X-Ray" uploaded
                </span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">
                  Appointment scheduled with Dr. Mensah
                </span>
                <span className="text-sm text-gray-500">Yesterday</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Profile updated</span>
                <span className="text-sm text-gray-500">3 days ago</span>
              </li>
            </ul>
          </div>

          {/* Dashboard Overview / Chart Section */}
          <div className="bg-white shadow p-6 rounded-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Dashboard Overview
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <DashboardChart />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
