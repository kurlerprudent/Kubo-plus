import { MedicalUserRole } from "./types";

// lib/auth/constants.ts
export const ROLE_HIERARCHY: Record<MedicalUserRole, number> = {
    SUPER_ADMIN: 4,
    ADMIN: 3,
    DOCTOR: 2,
    PATIENT: 1
  };
  
  export const ROLE_REDIRECTS: Record<MedicalUserRole, string> = {
    SUPER_ADMIN: '/admin/dashboard',
    ADMIN: '/admin/dashboard',
    DOCTOR: '/doctor/dashboard',
    PATIENT: '/patient/dashboard'
  };