// Appointment booking form component
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, User, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAvailableDoctors, useAppointmentActions } from '@/hooks/useAppointments';
import { CreateAppointmentRequest } from '@/types/api';

// Form validation schema
const appointmentSchema = z.object({
  doctorId: z.string().min(1, 'Please select a doctor'),
  appointmentDate: z.string().min(1, 'Please select an appointment date and time'),
  duration: z.number().min(15).max(120),
  reason: z.string().min(5, 'Please provide a reason (minimum 5 characters)'),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentBookingFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AppointmentBookingForm({ onSuccess, onCancel }: AppointmentBookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { data: doctorsData, isLoading: doctorsLoading } = useAvailableDoctors();
  const { createAppointment } = useAppointmentActions();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      duration: 30,
      doctorId: '',
      appointmentDate: '',
      reason: '',
      notes: '',
    },
  });

  const selectedDoctorId = watch('doctorId');

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const appointmentData: CreateAppointmentRequest = {
        doctorId: data.doctorId,
        appointmentDate: data.appointmentDate,
        duration: data.duration,
        reason: data.reason,
        notes: data.notes,
      };

      await createAppointment(appointmentData);
      setSubmitSuccess(true);
      reset();
      
      // Call success callback after a short delay to show success message
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to book appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 60); // At least 1 hour from now
    return now.toISOString().slice(0, 16);
  };

  const availableDoctors = doctorsData?.data || [];

  if (submitSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Appointment Request Submitted!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Your appointment request has been sent to the doctor. 
              You will be notified once it's confirmed.
            </p>
            <Button onClick={onSuccess} className="w-full">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Book an Appointment
        </CardTitle>
        <CardDescription>
          Schedule an appointment with one of our available doctors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Doctor Selection */}
          <div className="space-y-2">
            <Label htmlFor="doctorId" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Select Doctor
            </Label>
            <Select
              onValueChange={(value) => setValue('doctorId', value)}
              disabled={doctorsLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={doctorsLoading ? "Loading doctors..." : "Choose a doctor"} />
              </SelectTrigger>
              <SelectContent>
                {availableDoctors.map((doctor) => (
                  <SelectItem key={doctor._id} value={doctor._id}>
                    <div className="flex flex-col">
                      <span>{doctor.firstName} {doctor.lastName}</span>
                      {doctor.specialization && (
                        <span className="text-xs text-gray-500">{doctor.specialization}</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.doctorId && (
              <p className="text-sm text-red-500">{errors.doctorId.message}</p>
            )}
          </div>

          {/* Date and Time */}
          <div className="space-y-2">
            <Label htmlFor="appointmentDate" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Appointment Date & Time
            </Label>
            <Input
              id="appointmentDate"
              type="datetime-local"
              min={getMinDateTime()}
              {...register('appointmentDate')}
              className="w-full"
            />
            {errors.appointmentDate && (
              <p className="text-sm text-red-500">{errors.appointmentDate.message}</p>
            )}
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select
              onValueChange={(value) => setValue('duration', parseInt(value))}
              defaultValue="30"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1 hour 30 minutes</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reason for Appointment
            </Label>
            <Input
              id="reason"
              placeholder="e.g., Regular checkup, Follow-up consultation, etc."
              {...register('reason')}
            />
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information or symptoms you'd like to share..."
              rows={3}
              {...register('notes')}
            />
          </div>

          {/* Error Alert */}
          {submitError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || doctorsLoading}
              className="flex-1"
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
