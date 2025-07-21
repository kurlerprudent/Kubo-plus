// app/dashboard/patient/page.tsx
'use client';

import { useState } from 'react';
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
import { usePatientDashboardData } from '@/hooks/usePatientDashboardData';
import { MetricCard } from "@/components/MetricCard"
import { RecentActivity } from '@/components/RecentActivity';
import  AppointmentsTable  from '@/components/AppointmentsTable';
import DashboardChart from '@/components/DashboardChart';
import { Calendar, FileText, Stethoscope } from 'lucide-react';
import { ChartTypeSelector } from '@/components/ChartTypeSelector';

export default function Page() {
  const { data, isLoading } = usePatientDashboardData();

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
            <MetricCard 
              title="Upcoming Appointments"
              value={isLoading ? '--' : data?.metrics?.appointments}
              icon={<Calendar className="h-6 w-6" />}
              isLoading={isLoading}
            />
            <MetricCard 
              title="Recent Reports"
              value={isLoading ? '--' : data?.metrics?.reports}
              icon={<FileText className="h-6 w-6" />}
              isLoading={isLoading}
            />
            <MetricCard 
              title="Completed Visits"
              value={isLoading ? '--' : data?.metrics?.visits}
              icon={<Stethoscope className="h-6 w-6" />}
              isLoading={isLoading}
            />
          </div>

          {/* Chart and Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chart Section */}
            <div className="bg-white shadow p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Health Metrics
                </h2>
                <ChartTypeSelector />
              </div>
              <div className="h-64">
                <DashboardChart data={data?.chartData} isLoading={isLoading} chartType="line" />
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white shadow p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Activity
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View All
                </button>
              </div>
              <RecentActivity 
                activities={data?.recentActivity || []} 
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white shadow p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Appointment History
              </h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                Export to CSV
              </button>
            </div>
            <AppointmentsTable 
              appointments={data?.appointments || []} 
              isLoading={isLoading}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}