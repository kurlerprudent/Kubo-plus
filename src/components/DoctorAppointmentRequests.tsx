// Doctor appointment requests component for managing incoming appointment requests
'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  User,
  FileText,
  Check,
  X,
  MoreHorizontal,
  Eye,
  Phone,
  Mail,
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDoctorAppointmentRequests, useAcceptAppointment, useDeclineAppointment } from '@/hooks/useAppointments';
import { AppointmentDocument } from '@/types/api';

interface DoctorAppointmentRequestsProps {
  onViewDetails?: (appointment: AppointmentDocument) => void;
}

export function DoctorAppointmentRequests({ onViewDetails }: DoctorAppointmentRequestsProps) {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'accept' | 'decline' | null>(null);

  const { data, isLoading, error, refetch } = useDoctorAppointmentRequests();
  const acceptMutation = useAcceptAppointment();
  const declineMutation = useDeclineAppointment();

  const handleAcceptAppointment = async (appointmentId: string) => {
    setProcessingId(appointmentId);
    setActionType('accept');
    try {
      await acceptMutation.mutateAsync(appointmentId);
      refetch();
    } catch (error) {
      console.error('Failed to accept appointment:', error);
    } finally {
      setProcessingId(null);
      setActionType(null);
    }
  };

  const handleDeclineAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to decline this appointment request?')) return;
    
    setProcessingId(appointmentId);
    setActionType('decline');
    try {
      await declineMutation.mutateAsync(appointmentId);
      refetch();
    } catch (error) {
      console.error('Failed to decline appointment:', error);
    } finally {
      setProcessingId(null);
      setActionType(null);
    }
  };

  const isProcessing = (appointmentId: string) => {
    return processingId === appointmentId;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading appointment requests...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load appointment requests. Please try again.
            </AlertDescription>
          </Alert>
          <Button onClick={() => refetch()} variant="outline" className="mt-4">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const requests = data?.data || [];

  if (requests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Appointment Requests
          </CardTitle>
          <CardDescription>
            No pending appointment requests at the moment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No pending requests found</p>
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
          Appointment Requests
          <Badge variant="secondary" className="ml-auto">
            {requests.length} pending
          </Badge>
        </CardTitle>
        <CardDescription>
          Review and respond to incoming appointment requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Requested Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => {
              const patient = typeof request.patientId === 'object' 
                ? request.patientId 
                : null;
              
              return (
                <TableRow key={request._id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium">
                          {patient 
                            ? `${patient.firstName} ${patient.lastName}`
                            : 'Patient Info Unavailable'
                          }
                        </p>
                        {patient?.email && (
                          <p className="text-xs text-gray-500">
                            {patient.email}
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
                          {format(new Date(request.appointmentDate), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(request.appointmentDate), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{request.duration} min</span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm truncate" title={request.reason}>
                        {request.reason}
                      </p>
                      {request.notes && (
                        <p className="text-xs text-gray-500 truncate" title={request.notes}>
                          Notes: {request.notes}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-xs text-gray-500">
                      {format(new Date(request.createdAt), 'MMM dd, h:mm a')}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptAppointment(request._id)}
                        disabled={isProcessing(request._id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {isProcessing(request._id) && actionType === 'accept' ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                            Accepting...
                          </>
                        ) : (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Accept
                          </>
                        )}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeclineAppointment(request._id)}
                        disabled={isProcessing(request._id)}
                      >
                        {isProcessing(request._id) && actionType === 'decline' ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                            Declining...
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3 mr-1" />
                            Decline
                          </>
                        )}
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewDetails?.(request)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          
                          {patient?.email && (
                            <DropdownMenuItem 
                              onClick={() => window.open(`mailto:${patient.email}`, '_blank')}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Email Patient
                            </DropdownMenuItem>
                          )}
                          
                          {patient?.phone && (
                            <DropdownMenuItem 
                              onClick={() => window.open(`tel:${patient.phone}`, '_blank')}
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              Call Patient
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        {/* Summary */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>{requests.length}</strong> appointment request{requests.length !== 1 ? 's' : ''} 
            waiting for your response
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
