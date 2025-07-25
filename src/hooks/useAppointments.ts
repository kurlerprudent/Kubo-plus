// Custom hook for appointment management
'use client';

import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAppointment,
  createDoctorAppointment,
  getPatientAppointments,
  getSingleAppointment,
  updateAppointment,
  cancelAppointment,
  getDoctorAppointmentRequests,
  acceptAppointmentRequest,
  declineAppointmentRequest,
  getAvailableDoctors,
  getAvailablePatients,
  handleApiError
} from '@/lib/api';
import {
  CreateAppointmentRequest,
  CreateDoctorAppointmentRequest,
  UpdateAppointmentRequest,
  AppointmentDocument,
  DoctorInfo,
  PatientInfo
} from '@/types/api';

// Patient appointment hooks
export function usePatientAppointments(filters?: { status?: string; upcoming?: boolean }) {
  return useQuery({
    queryKey: ['appointments', 'patient', filters],
    queryFn: () => getPatientAppointments(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSingleAppointment(appointmentId: string) {
  return useQuery({
    queryKey: ['appointments', 'single', appointmentId],
    queryFn: () => getSingleAppointment(appointmentId),
    enabled: !!appointmentId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAppointmentRequest) => createAppointment(data),
    onSuccess: () => {
      // Invalidate and refetch appointments
      queryClient.invalidateQueries({ queryKey: ['appointments', 'patient'] });
    },
    onError: (error: any) => {
      console.error('Failed to create appointment:', handleApiError(error));
    },
  });
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, data }: { appointmentId: string; data: UpdateAppointmentRequest }) =>
      updateAppointment(appointmentId, data),
    onSuccess: (_, variables) => {
      // Invalidate appointments lists
      queryClient.invalidateQueries({ queryKey: ['appointments', 'patient'] });
      // Invalidate the specific appointment
      queryClient.invalidateQueries({ queryKey: ['appointments', 'single', variables.appointmentId] });
    },
    onError: (error: any) => {
      console.error('Failed to update appointment:', handleApiError(error));
    },
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId: string) => cancelAppointment(appointmentId),
    onSuccess: () => {
      // Invalidate appointments lists
      queryClient.invalidateQueries({ queryKey: ['appointments', 'patient'] });
      queryClient.invalidateQueries({ queryKey: ['appointments', 'doctor'] });
    },
    onError: (error: any) => {
      console.error('Failed to cancel appointment:', handleApiError(error));
    },
  });
}

// Doctor appointment hooks
export function useDoctorAppointmentRequests() {
  return useQuery({
    queryKey: ['appointments', 'doctor', 'requests'],
    queryFn: getDoctorAppointmentRequests,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAcceptAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId: string) => acceptAppointmentRequest(appointmentId),
    onSuccess: () => {
      // Invalidate doctor requests and patient appointments
      queryClient.invalidateQueries({ queryKey: ['appointments', 'doctor', 'requests'] });
      queryClient.invalidateQueries({ queryKey: ['appointments', 'patient'] });
    },
    onError: (error: any) => {
      console.error('Failed to accept appointment:', handleApiError(error));
    },
  });
}

export function useDeclineAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId: string) => declineAppointmentRequest(appointmentId),
    onSuccess: () => {
      // Invalidate doctor requests and patient appointments
      queryClient.invalidateQueries({ queryKey: ['appointments', 'doctor', 'requests'] });
      queryClient.invalidateQueries({ queryKey: ['appointments', 'patient'] });
    },
    onError: (error: any) => {
      console.error('Failed to decline appointment:', handleApiError(error));
    },
  });
}

// General hooks
export function useAvailableDoctors() {
  return useQuery({
    queryKey: ['doctors', 'available'],
    queryFn: getAvailableDoctors,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
}

export function useAvailablePatients() {
  return useQuery({
    queryKey: ['patients', 'available'],
    queryFn: getAvailablePatients,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
}

export function useCreateDoctorAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDoctorAppointmentRequest) => createDoctorAppointment(data),
    onSuccess: () => {
      // Invalidate and refetch appointments
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['appointments', 'doctor'] });
    },
    onError: (error: Error) => {
      console.error('Failed to create appointment:', error);
    },
  });
}

// Custom hook for appointment statistics
export function useAppointmentStats() {
  const { data: appointments, isLoading } = usePatientAppointments();

  const stats = useCallback(() => {
    if (!appointments?.data) return null;

    const appointmentList = appointments.data;
    const total = appointmentList.length;
    const pending = appointmentList.filter(apt => apt.status === 'Pending').length;
    const confirmed = appointmentList.filter(apt => apt.status === 'Confirmed').length;
    const completed = appointmentList.filter(apt => apt.status === 'Completed').length;
    const cancelled = appointmentList.filter(apt => apt.status === 'Cancelled').length;

    // Upcoming appointments (confirmed and scheduled)
    const now = new Date();
    const upcoming = appointmentList.filter(apt => 
      new Date(apt.appointmentDate) > now && 
      ['Confirmed', 'Scheduled'].includes(apt.status)
    ).length;

    return {
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      upcoming,
    };
  }, [appointments]);

  return {
    stats: stats(),
    isLoading,
  };
}

// Utility hook for appointment management
export function useAppointmentActions() {
  const createMutation = useCreateAppointment();
  const createDoctorMutation = useCreateDoctorAppointment();
  const updateMutation = useUpdateAppointment();
  const cancelMutation = useCancelAppointment();
  const acceptMutation = useAcceptAppointment();
  const declineMutation = useDeclineAppointment();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateAppointment = useCallback(async (data: CreateAppointmentRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createMutation.mutateAsync(data);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [createMutation]);

  const handleCreateDoctorAppointment = useCallback(async (data: CreateDoctorAppointmentRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createDoctorMutation.mutateAsync(data);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [createDoctorMutation]);

  const handleUpdateAppointment = useCallback(async (appointmentId: string, data: UpdateAppointmentRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await updateMutation.mutateAsync({ appointmentId, data });
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [updateMutation]);

  const handleCancelAppointment = useCallback(async (appointmentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await cancelMutation.mutateAsync(appointmentId);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [cancelMutation]);

  const handleAcceptAppointment = useCallback(async (appointmentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await acceptMutation.mutateAsync(appointmentId);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [acceptMutation]);

  const handleDeclineAppointment = useCallback(async (appointmentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await declineMutation.mutateAsync(appointmentId);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [declineMutation]);

  return {
    createAppointment: handleCreateAppointment,
    createDoctorAppointment: handleCreateDoctorAppointment,
    updateAppointment: handleUpdateAppointment,
    cancelAppointment: handleCancelAppointment,
    acceptAppointment: handleAcceptAppointment,
    declineAppointment: handleDeclineAppointment,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
