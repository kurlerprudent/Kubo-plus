// components/appointments/doctor/DoctorAppointmentList.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus } from "lucide-react";
import { DoctorAppointmentCard } from "./DoctorAppointmentCard";
import { DoctorAppointment, DoctorAppointmentStatus } from "./types";

interface DoctorAppointmentListProps {
  appointments: DoctorAppointment[];
  onNewAppointment?: () => void;
  onStatusChange: (id: number, status: DoctorAppointmentStatus, scheduledDate?: string, scheduledTime?: string) => void;
}

export function DoctorAppointmentList({ 
  appointments, 
  onNewAppointment,
  onStatusChange
}: DoctorAppointmentListProps) {
  if (appointments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-96 gap-4 rounded-lg border"
      >
        <CalendarIcon className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground text-lg">
          No appointment requests found
        </p>
        {onNewAppointment && (
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onNewAppointment}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Slot
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {appointments.map((appointment) => (
        <DoctorAppointmentCard 
          key={appointment.id} 
          appointment={appointment} 
          onStatusChange={onStatusChange}
        />
      ))}
    </motion.div>
  );
}