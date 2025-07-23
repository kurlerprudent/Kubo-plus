// app/dashboard/doctor-appointments/page.tsx
"use client";
import { useState } from "react";
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
import { DoctorAppointmentFilters } from "@/components/appointments/doctor/DoctorAppointmentFilters";
import { DoctorAppointmentList } from "@/components/appointments/doctor/DoctorAppointmentList";
import { DoctorAppointment, DoctorAppointmentStatus, DoctorAppointmentStatusFilter } from "@/components/appointments/doctor/types";
import { v4 as uuidv4 } from 'uuid';
import { RadiologistAppSidebar } from "@/components/app-sidebar-doctor";

const mockAppointments: DoctorAppointment[] = [
  {
    id: 1,
    patientName: "Kwame Asante",
    patientAge: 45,
    requestedDate: "2023-05-10",
    requestedTime: "10:00",
    status: "Pending",
    notes: "Follow-up on previous chest X-ray showing minor opacity in left lung"
  },
  {
    id: 2,
    patientName: "Ama Mensah",
    patientAge: 32,
    requestedDate: "2023-05-12",
    requestedTime: "14:30",
    status: "Pending",
    notes: "Routine screening, no symptoms reported"
  },
  {
    id: 3,
    patientName: "Kofi Owusu",
    patientAge: 58,
    requestedDate: "2023-05-15",
    requestedTime: "11:15",
    status: "Scheduled",
    scheduledDate: "2023-05-15",
    scheduledTime: "11:15",
    meetingUrl: `https://meet.jit.si/chestxray-${uuidv4()}`,
    notes: "Persistent cough for 3 weeks, recent weight loss"
  },
];

export default function DoctorAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DoctorAppointmentStatusFilter>("All");
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(mockAppointments);
  
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (appointment.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === "All" || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (
    id: number, 
    status: DoctorAppointmentStatus, 
    scheduledDate?: string, 
    scheduledTime?: string
  ) => {
    setAppointments(prev => prev.map(app => {
      if (app.id === id) {
        const updatedApp = { ...app, status };
        if (status === "Scheduled" && scheduledDate && scheduledTime) {
          updatedApp.scheduledDate = scheduledDate;
          updatedApp.scheduledTime = scheduledTime;
          updatedApp.meetingUrl = `https://meet.jit.si/chestxray-${uuidv4()}`;
        }
        return updatedApp;
      }
      return app;
    }));
  };

  const handleNewSlot = () => {
    // In a real app, this would open a form to create a new slot
    alert("Create new slot functionality would go here");
  };

  return (
    <SidebarProvider>
      
      <RadiologistAppSidebar/>
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="bg-background sticky top-0 z-10 flex h-16 items-center gap-4 border-b px-4">
            <SidebarTrigger className="-ml-1" aria-label="Toggle navigation" />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Appointments</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tight">
                  Radiology Appointment Requests
                </h1>
                
                <DoctorAppointmentFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  onNew={handleNewSlot}
                />
              </div>

              <DoctorAppointmentList 
                appointments={filteredAppointments}
                onNewAppointment={handleNewSlot}
                onStatusChange={handleStatusChange}
              />
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}