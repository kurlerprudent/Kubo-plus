// lib/auth/types.ts
export type MedicalUserRole = 'SUPER_ADMIN' | 'ADMIN' | 'DOCTOR' | 'PATIENT';

export type MedicalUser = {
  id: string;
  email: string;
  role: MedicalUserRole;
  firstName?: string;
  lastName?: string;
  department?: string;
  assignedDoctorId?: string; // For patients
  licenseNumber?: string; // For doctors
  lastLogin?: Date;
};

export type JwtPayload = {
  userId: string;
  role: MedicalUserRole;
  iat: number;
  exp: number;
};

export type AuthResponse = {
  token: string;
  user: MedicalUser;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type APIErrorResponse = {
  error: string;
  code?: number;
  details?: Record<string, any>;
};