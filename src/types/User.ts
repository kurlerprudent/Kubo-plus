// Updated to match backend API requirements  
export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN" | "SUPER_ADMIN";

// Frontend display mapping for roles
export const ROLE_DISPLAY_MAP: Record<UserRole, string> = {
  "PATIENT": "Patient",
  "DOCTOR": "Doctor", 
  "ADMIN": "Administrator",
  "SUPER_ADMIN": "Super Administrator"
};

// Frontend form values (lowercase for form compatibility)
export type FormUserRole = "patient" | "doctor" | "admin" | "super-admin";

// Mapping function to convert form values to API values
export function mapFormRoleToApiRole(formRole: FormUserRole): UserRole {
  const mapping: Record<FormUserRole, UserRole> = {
    "patient": "PATIENT",
    "doctor": "DOCTOR", 
    "admin": "ADMIN",
    "super-admin": "SUPER_ADMIN"
  };
  return mapping[formRole];
}

export interface User {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string; 
  updatedBy?: string; 
}

export interface SignUpFormValues {
  name: string;
  email: string;
  phone: string;
  role: FormUserRole; // Use form role type
  password: string;
  confirmPassword: string;
}