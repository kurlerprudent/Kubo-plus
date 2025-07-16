export type UserRole = "patient" | "doctor" | "admin" | "super-admin";

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
  role: UserRole;
  password: string;
  confirmPassword: string;
}