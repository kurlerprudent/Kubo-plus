// components/appointments/doctor/DoctorAppointmentCard.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Clock, MoreVertical, User, Calendar, XCircle, Video } from "lucide-react";
import { DoctorAppointment, DoctorAppointmentStatus } from "./types";
import { statusConfig } from "./config";
import { actionIcons } from "./config";
import { ScheduleForm } from "./ScheduleForm";
import { VideoCallLink } from "./VideoCallLink";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DoctorAppointmentCardProps {
  appointment: DoctorAppointment;
  onStatusChange: (id: number, status: DoctorAppointmentStatus, scheduledDate?: string, scheduledTime?: string) => void;
}

export function DoctorAppointmentCard({ appointment, onStatusChange }: DoctorAppointmentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);
  
  const handleAccept = (date: string, time: string) => {
    onStatusChange(appointment.id, "Scheduled", date, time);
    setShowScheduleForm(false);
  };
  
  const handleDecline = () => {
    onStatusChange(appointment.id, "Declined");
    setShowDeclineConfirm(false);
  };

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
                <span className="text-primary">{appointment.patientName}</span>
                <span className="text-muted-foreground"> ({appointment.patientAge}y)</span>
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
              <Calendar className="h-4 w-4" />
              <time dateTime={`${appointment.requestedDate}T${appointment.requestedTime}`}>
                {formatDate(appointment.requestedDate, "long")} at {appointment.requestedTime}
              </time>
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
              <DropdownMenuItem className="gap-2" onClick={() => setIsExpanded(true)}>
                <User className="h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {appointment.meetingUrl && (
                <DropdownMenuItem className="gap-2">
                  <Video className="h-4 w-4" />
                  Join Call
                </DropdownMenuItem>
              )}
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
              <div className="space-y-4">
                {appointment.notes && (
                  <div className="space-y-2">
                    <h3 className="font-medium">Patient Notes</h3>
                    <p className="text-muted-foreground text-sm">{appointment.notes}</p>
                  </div>
                )}
                
                {appointment.status === "Pending" && !showScheduleForm && !showDeclineConfirm && (
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="default" 
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setShowScheduleForm(true)}
                    >
                      {actionIcons.schedule} Accept & Schedule
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => setShowDeclineConfirm(true)}
                    >
                      {actionIcons.decline} Decline Request
                    </Button>
                  </div>
                )}
                
                {showScheduleForm && (
                  <ScheduleForm 
                    appointmentId={appointment.id}
                    onSchedule={handleAccept}
                    onCancel={() => setShowScheduleForm(false)}
                  />
                )}
                
                {showDeclineConfirm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg"
                  >
                    <p className="mb-3">Are you sure you want to decline this appointment request?</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="destructive"
                        onClick={handleDecline}
                      >
                        Confirm Decline
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setShowDeclineConfirm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
                
                {appointment.status === "Scheduled" && appointment.meetingUrl && (
                  <VideoCallLink meetingUrl={appointment.meetingUrl} />
                )}
              </div>
              
              {appointment.status === "Scheduled" && appointment.scheduledDate && (
                <div className="space-y-2">
                  <h3 className="font-medium">Scheduled Time</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(appointment.scheduledDate, "long")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{appointment.scheduledTime}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}