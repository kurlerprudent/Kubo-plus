// Appointments table component for displaying user appointments
'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  User,
  Video,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePatientAppointments, useCancelAppointment } from '@/hooks/useAppointments';
import { AppointmentDocument, AppointmentStatus } from '@/types/api';

interface AppointmentsTableProps {
  filters?: {
    status?: string;
    upcoming?: boolean;
  };
  onEditAppointment?: (appointment: AppointmentDocument) => void;
  onViewAppointment?: (appointment: AppointmentDocument) => void;
}

export function AppointmentsTable({ 
  filters, 
  onEditAppointment, 
  onViewAppointment 
}: AppointmentsTableProps) {
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  
  const { data, isLoading, error, refetch } = usePatientAppointments(filters);
  const cancelMutation = useCancelAppointment();

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    
    setCancellingId(appointmentId);
    try {
      await cancelMutation.mutateAsync(appointmentId);
      refetch();
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
    } finally {
      setCancellingId(null);
    }
  };

  const handleJoinMeeting = (meetingUrl: string) => {
    window.open(meetingUrl, '_blank', 'noopener,noreferrer');
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    const statusConfig = {
      Pending: { variant: 'secondary' as const, color: 'text-yellow-600' },
      Scheduled: { variant: 'secondary' as const, color: 'text-blue-600' },
      Confirmed: { variant: 'default' as const, color: 'text-green-600' },
      Completed: { variant: 'outline' as const, color: 'text-gray-600' },
      Cancelled: { variant: 'destructive' as const, color: 'text-red-600' },
      Declined: { variant: 'destructive' as const, color: 'text-red-600' },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    
    return (
      <Badge variant={config.variant} className={config.color}>
        {status}
      </Badge>
    );
  };

  const isUpcoming = (appointmentDate: string | Date) => {
    return new Date(appointmentDate) > new Date();
  };

  const canEdit = (appointment: AppointmentDocument) => {
    return appointment.status === 'Pending' && isUpcoming(appointment.appointmentDate);
  };

  const canCancel = (appointment: AppointmentDocument) => {
    return ['Pending', 'Scheduled', 'Confirmed'].includes(appointment.status) && 
           isUpcoming(appointment.appointmentDate);
  };

  const canJoinMeeting = (appointment: AppointmentDocument) => {
    return appointment.status === 'Confirmed' && 
           appointment.meetingUrl && 
           isUpcoming(appointment.appointmentDate);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading appointments...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Failed to load appointments</p>
            <Button onClick={() => refetch()} variant="outline" className="mt-2">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const appointments = data?.data || [];

  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Your Appointments
          </CardTitle>
          <CardDescription>
            {filters?.upcoming 
              ? "You have no upcoming appointments" 
              : "You haven't booked any appointments yet"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">
              {filters?.upcoming 
                ? "No upcoming appointments found"
                : "No appointments found"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Your Appointments
          <Badge variant="secondary" className="ml-auto">
            {appointments.length}
          </Badge>
        </CardTitle>
        <CardDescription>
          Manage your scheduled appointments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => {
              const doctor = typeof appointment.doctorId === 'object' 
                ? appointment.doctorId 
                : null;
              
              return (
                <TableRow key={appointment._id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium">
                          {doctor 
                            ? `${doctor.firstName} ${doctor.lastName}`
                            : 'Doctor Info Unavailable'
                          }
                        </p>
                        {doctor?.specialization && (
                          <p className="text-xs text-gray-500">
                            {doctor.specialization}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium">
                          {format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(appointment.appointmentDate), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{appointment.duration} min</span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm truncate" title={appointment.reason}>
                        {appointment.reason}
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {getStatusBadge(appointment.status)}
                  </TableCell>
                  
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewAppointment?.(appointment)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        
                        {canJoinMeeting(appointment) && (
                          <>
                            <DropdownMenuItem 
                              onClick={() => handleJoinMeeting(appointment.meetingUrl!)}
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Join Meeting
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        
                        {canEdit(appointment) && (
                          <DropdownMenuItem onClick={() => onEditAppointment?.(appointment)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        
                        {canCancel(appointment) && (
                          <DropdownMenuItem 
                            onClick={() => handleCancelAppointment(appointment._id)}
                            disabled={cancellingId === appointment._id}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {cancellingId === appointment._id ? 'Cancelling...' : 'Cancel'}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}