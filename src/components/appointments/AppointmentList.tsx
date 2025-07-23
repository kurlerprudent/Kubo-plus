// components/appointments/AppointmentList.tsx
import { motion } from "framer-motion";
import { CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "./types";
import { AppointmentCard } from "./AppointmentCard";

interface AppointmentListProps {
  appointments: Appointment[];
  onNewAppointment?: () => void;
  onClearFilters?: () => void;
}

export function AppointmentList({ 
  appointments, 
  onNewAppointment,
  onClearFilters
}: AppointmentListProps) {
  if (appointments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-96 gap-4 rounded-lg border"
      >
        <CalendarIcon className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground text-lg">
          No appointments found matching your criteria
        </p>
        <div className="flex gap-2">
          {onClearFilters && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
            >
              Clear filters
            </Button>
          )}
          {onNewAppointment && (
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onNewAppointment}
            >
              Schedule New Appointment
            </Button>
          )}
        </div>
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
        <AppointmentCard 
          key={appointment.id} 
          appointment={appointment} 
        />
      ))}
    </motion.div>
  );
}