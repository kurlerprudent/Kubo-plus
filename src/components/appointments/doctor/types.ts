// components/appointments/doctor/types.ts
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export type DoctorAppointmentStatus = "Pending" | "Scheduled" | "Declined";
export type DoctorAppointmentStatusFilter = DoctorAppointmentStatus | "All";

export interface DoctorAppointment {
  id: number;
  patientName: string;
  patientAge: number;
  requestedDate: string;
  requestedTime: string;
  status: DoctorAppointmentStatus;
  notes?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  meetingUrl?: string;
}