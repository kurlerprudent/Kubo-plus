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

import { RadiologistAppSidebar } from "@/components/app-sidebar-doctor";
import Rside from "@/components/header-right-side";

import { Button } from "@/components/ui/button";
import { 

  Bell, 
  Search 
} from "lucide-react";
import DoctorStatsOverview from "@/components/doctor-stats-overview";
import MainDashboardArea from "@/components/main-dashboard-area";
import DoctorRecentCases from "@/components/doctor-recent-cases";
import { Input } from "@/components/ui/input";

export default function RadiologistDashboard() {



  return (
    <SidebarProvider>
      <RadiologistAppSidebar />
      <SidebarInset className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b border-white/30 px-4 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/radiologist/dashboard" className="text-indigo-700 hover:text-indigo-900">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-gray-800">Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search cases..."
                className="sm:hidden md:flex pl-10 pr-4 py-2 rounded-full bg-white/70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm w-48 transition-all duration-300 hover:w-52"
              />
            </div>
            
            <Rside />
          </div>
        </header>
        
        <ScrollArea className="flex-1">
          <div className="w-full p-4 md:p-6 space-y-6">
            {/* Stats Overview */}
              <DoctorStatsOverview />

            {/* Main Dashboard Area */}
            <MainDashboardArea />

            {/* Recent Cases */}
              <DoctorRecentCases />
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}