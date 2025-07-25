// Main appointment dashboard page component
'use client';

import React, { useState } from 'react';
import { Plus, Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppointmentBookingForm } from '@/components/AppointmentBookingForm';
import { DoctorAppointmentForm } from '@/components/DoctorAppointmentForm';
import { AppointmentsTable } from '@/components/AppointmentsTable';
import { DoctorAppointmentRequests } from '@/components/DoctorAppointmentRequests';
import { usePatientAppointments, useAppointmentStats, useDoctorAppointmentRequests } from '@/hooks/useAppointments';
import { AppointmentDocument } from '@/types/api';

interface AppointmentDashboardProps {
  userRole: 'PATIENT' | 'DOCTOR' | 'ADMIN';
}

export function AppointmentDashboard({ userRole }: AppointmentDashboardProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDocument | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Patient data
  const { stats: patientStats, isLoading: statsLoading } = useAppointmentStats();
  const { data: upcomingData } = usePatientAppointments({ upcoming: true });

  // Doctor data
  const { data: doctorRequests } = useDoctorAppointmentRequests();

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    setShowDoctorForm(false);
    setActiveTab('appointments');
  };

  const handleViewAppointment = (appointment: AppointmentDocument) => {
    setSelectedAppointment(appointment);
    // Could open a modal here to show appointment details
    console.log('View appointment:', appointment);
  };

  const handleEditAppointment = (appointment: AppointmentDocument) => {
    setSelectedAppointment(appointment);
    // Could open edit form here
    console.log('Edit appointment:', appointment);
  };

  // Patient dashboard stats
  const getPatientStatsCards = () => {
    if (statsLoading || !patientStats) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{patientStats.total}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-blue-600">{patientStats.upcoming}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{patientStats.pending}</p>
              </div>
              <Users className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{patientStats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Doctor dashboard stats
  const getDoctorStatsCards = () => {
    const pendingRequests = doctorRequests?.data?.length || 0;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-orange-600">{pendingRequests}</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (showBookingForm) {
    return (
      <div className="container mx-auto p-6">
        <AppointmentBookingForm
          onSuccess={handleBookingSuccess}
          onCancel={() => setShowBookingForm(false)}
        />
      </div>
    );
  }

  if (showDoctorForm) {
    return (
      <div className="container mx-auto p-6">
        <DoctorAppointmentForm
          onSuccess={handleBookingSuccess}
          onCancel={() => setShowDoctorForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userRole === 'PATIENT' ? 'My Appointments' : 'Appointment Management'}
          </h1>
          <p className="text-gray-600">
            {userRole === 'PATIENT' 
              ? 'Manage your scheduled appointments and book new ones'
              : 'Review appointment requests and manage your schedule'
            }
          </p>
        </div>
        
        {userRole === 'PATIENT' && (
          <Button onClick={() => setShowBookingForm(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Book Appointment
          </Button>
        )}

        {userRole === 'DOCTOR' && (
          <Button onClick={() => setShowDoctorForm(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Appointment
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      {userRole === 'PATIENT' ? getPatientStatsCards() : getDoctorStatsCards()}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">
            {userRole === 'PATIENT' ? 'My Appointments' : 'All Appointments'}
          </TabsTrigger>
          {userRole === 'DOCTOR' && (
            <TabsTrigger value="requests">
              Requests
              {(doctorRequests?.data?.length ?? 0) > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {doctorRequests?.data?.length ?? 0}
                </Badge>
              )}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {userRole === 'PATIENT' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(upcomingData?.data?.length ?? 0) > 0 ? (
                    <div className="space-y-3">
                      {upcomingData?.data?.slice(0, 3).map((appointment) => {
                        const doctor = typeof appointment.doctorId === 'object' 
                          ? appointment.doctorId 
                          : null;
                        return (
                          <div key={appointment._id} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">
                                  {doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Doctor TBD'}
                                </p>
                                <p className="text-sm text-gray-600">{appointment.reason}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(appointment.appointmentDate).toLocaleDateString()} at{' '}
                                  {new Date(appointment.appointmentDate).toLocaleTimeString()}
                                </p>
                              </div>
                              <Badge variant="secondary">{appointment.status}</Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setShowBookingForm(true)} 
                    className="w-full justify-start"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Book New Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('appointments')}
                    className="w-full justify-start"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    View All Appointments
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {userRole === 'DOCTOR' && (
            <DoctorAppointmentRequests onViewDetails={handleViewAppointment} />
          )}
        </TabsContent>

        <TabsContent value="appointments">
          <AppointmentsTable
            onEditAppointment={handleEditAppointment}
            onViewAppointment={handleViewAppointment}
          />
        </TabsContent>

        {userRole === 'DOCTOR' && (
          <TabsContent value="requests">
            <DoctorAppointmentRequests onViewDetails={handleViewAppointment} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
