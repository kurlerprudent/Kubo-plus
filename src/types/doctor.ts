// src/types/doctor.ts (or update existing)
import { UserRole } from './user-role' // Assuming you have UserRole enum accessible on frontend too

export interface Doctor {
  id: string;
  email: string;
  role: UserRole.DOCTOR; // Specifically for doctors
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string; // If relevant for admin view
  specialization?: string;
  qualifications?: string;
  bio?: string; // Might be long for table, good for edit form
  yearsOfExperience?: number;
  profilePhotoUrl?: string;
  createdAt: Date; // Changed from dateJoined
  updatedAt: Date;
  // Represent assigned patients - count is most useful for the table
  assignedPatientsCount: number; // We'll derive this
  // We might receive the full patient list from API, but only need count for table
  // patients?: { id: string; firstName?: string; lastName?: string }[]; // Example if API sends basic patient info
}

// Helper function to get full name
export const getDoctorFullName = (doctor: Partial<Doctor>): string => {
    return [doctor.firstName, doctor.lastName].filter(Boolean).join(' ') || 'N/A';
};