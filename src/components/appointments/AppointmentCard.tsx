// components/appointments/AppointmentCard.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, Clock, Stethoscope, MapPin, Info, MoreVertical, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Appointment, statusConfig } from "./types";
import { formatDateTime } from "@/lib/utils";

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.01 }}
      className="group bg-card rounded-lg p-6 shadow-sm transition-all hover:shadow-md border hover:border-primary/20"
    >
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

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}