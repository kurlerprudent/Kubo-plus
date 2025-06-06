// pages/dashboard/patient-appointments/index.tsx

"use client"
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { formatDateTime, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  Clock,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  Stethoscope,
  MapPin,
  Info,
  XCircle,
  Plus,
  Search,
  ChevronDown,
} from "lucide-react";

interface Appointment {
  id: number;
  doctor: string;
  date: string;
  time: string;
  type: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  location: string;
  notes?: string;
  duration: string;
}

const statusConfig = {
  Confirmed: {
    class: "bg-green-100 text-green-800",
    icon: <CheckCircle2 className="h-4 w-4 mr-2" />,
  },
  Pending: {
    class: "bg-yellow-100 text-yellow-800",
    icon: <Clock className="h-4 w-4 mr-2" />,
  },
  Completed: {
    class: "bg-blue-100 text-blue-800",
    icon: <CheckCircle2 className="h-4 w-4 mr-2" />,
  },
  Cancelled: {
    class: "bg-red-100 text-red-800",
    icon: <XCircle className="h-4 w-4 mr-2" />,
  },
};

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="group bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md border hover:border-primary/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-left"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <h2 className="text-lg font-semibold leading-tight hover:underline">
                Consultation with{" "}
                <span className="text-primary">{appointment.doctor}</span>
              </h2>
            </Button>
            <Badge
              variant="outline"
              className={statusConfig[appointment.status].class}
            >
              {statusConfig[appointment.status].icon}
              {appointment.status}
            </Badge>
          </div>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime={`${appointment.date}T${appointment.time}`}>
                {formatDateTime(appointment.date, appointment.time)}
              </time>
              <span className="mx-2">•</span>
              <Clock className="h-4 w-4" />
              <span>{appointment.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              <span>{appointment.type}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                Reschedule
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-red-600">
                <XCircle className="h-4 w-4" />
                Cancel Appointment
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <MapPin className="h-4 w-4" />
                View Location
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium">Location:</span>
                <span>{appointment.location}</span>
              </div>
              {appointment.notes && (
                <div className="flex items-start gap-2 text-sm">
                  <Info className="h-4 w-4 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Notes:</span>
                    <p className="text-muted-foreground">{appointment.notes}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm">
                Add to Calendar
              </Button>
              <Button variant="outline" size="sm">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function PatientAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  
  const appointments: Appointment[] = [
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
    // ... other sample appointments
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search appointments..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-1">
                          {statusFilter}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                          All Statuses
                        </DropdownMenuItem>
                        {Object.keys(statusConfig).map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => setStatusFilter(status)}
                          >
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      New Appointment
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                  />
                ))}

                {filteredAppointments.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-96 gap-4 rounded-lg border">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground text-lg">
                      No appointments found matching your criteria
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setSearchQuery("");
                          setStatusFilter("All");
                        }}
                      >
                        Clear filters
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Schedule New Appointment
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}