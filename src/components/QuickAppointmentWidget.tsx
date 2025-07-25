// Quick appointment booking widget for dashboard
'use client';

import React, { useState } from 'react';
import { Calendar, Plus, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppointmentStats, useAvailableDoctors } from '@/hooks/useAppointments';
import { Badge } from '@/components/ui/badge';

interface QuickAppointmentWidgetProps {
  onBookAppointment?: () => void;
}

export function QuickAppointmentWidget({ onBookAppointment }: QuickAppointmentWidgetProps) {
  const { stats, isLoading: statsLoading } = useAppointmentStats();
  const { data: doctorsData } = useAvailableDoctors();

  const availableDoctors = doctorsData?.data || [];

  if (statsLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
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
          Appointments
        </CardTitle>
        <CardDescription>
          Manage your healthcare appointments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{stats?.upcoming || 0}</p>
            <p className="text-xs text-blue-600">Upcoming</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{stats?.pending || 0}</p>
            <p className="text-xs text-yellow-600">Pending</p>
          </div>
        </div>

        {/* Next Appointment */}
        {(stats?.upcoming ?? 0) > 0 && (
          <div className="p-3 border rounded-lg bg-green-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Next Appointment</p>
                <p className="text-xs text-green-600">View details in Appointments</p>
              </div>
              <Clock className="w-4 h-4 text-green-600" />
            </div>
          </div>
        )}

        {/* Available Doctors */}
        <div>
          <p className="text-sm font-medium mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Available Doctors
          </p>
          <div className="flex flex-wrap gap-2">
            {availableDoctors.slice(0, 3).map((doctor) => (
              <Badge key={doctor._id} variant="outline" className="text-xs">
                Dr. {doctor.firstName} {doctor.lastName}
              </Badge>
            ))}
            {availableDoctors.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{availableDoctors.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button 
            onClick={onBookAppointment} 
            className="w-full"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Book New Appointment
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full"
            onClick={() => window.location.href = '/dashboard/patient-appointments'}
          >
            <Calendar className="w-4 h-4 mr-2" />
            View All Appointments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
