// app/dashboard/patient-appointments/page.tsx
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
import { AppointmentFilters } from "@/components/appointments/AppointmentFilters";
import { AppointmentList } from "@/components/appointments/AppointmentList";
import { NewAppointmentModal } from "@/components/appointments/NewAppointmentModal";
import { Appointment, StatusFilter } from "@/components/appointments/types";

const mockAppointments: Appointment[] = [
  {
    id: 1,
    doctor: "Dr. Mensah",
    date: "2023-04-15",
    time: "10:00",
    type: "Follow-up Consultation",
    status: "Confirmed",
    location: "Main Hospital, Room 305",
    notes: "Please bring recent test results",
    duration: "30 mins"
  },
  {
    id: 2,
    doctor: "Dr. Johnson",
    date: "2023-04-17",
    time: "14:30",
    type: "Annual Checkup",
    status: "Pending",
    location: "Downtown Clinic, Room 102",
    duration: "45 mins"
  },
  {
    id: 3,
    doctor: "Dr. Williams",
    date: "2023-04-20",
    time: "11:15",
    type: "Vaccination",
    status: "Completed",
    location: "Main Hospital, Room 210",
    duration: "20 mins"
  },
];

export default function PatientAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleNewAppointment = (data: any) => {
    // Add to appointments
    const newAppointment: Appointment = {
      id: appointments.length + 1,
      doctor: data.doctor,
      date: data.date,
      time: data.time,
      type: data.type,
      status: "Pending",
      location: "To be confirmed",
      duration: "30 mins",
      notes: data.notes
    };
    
    setAppointments([...appointments, newAppointment]);
    setModalOpen(false);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
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
                  Appointment Management
                </h1>
                
                <AppointmentFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  onNew={() => setModalOpen(true)}
                />
              </div>

              <AppointmentList 
                appointments={filteredAppointments}
                onNewAppointment={() => setModalOpen(true)}
                onClearFilters={clearFilters}
              />
            </div>
          </main>
          
          <NewAppointmentModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleNewAppointment}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}