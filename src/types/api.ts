// API Types matching the tested backend API requirements

export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN" | "SUPER_ADMIN";

// ========== Authentication API Types ==========
export interface PatientRegistrationRequest {
  firstName: string;     // Required, trimmed
  lastName: string;      // Required, trimmed
  email: string;         // Required, valid email format, unique
  password: string;      // Required, minimum 8 characters
  gender?: "Male" | "Female" | "Other";  // Optional
  phone: string;         // Required
}

export interface PatientRegistrationResponse {
  success: true;
  message: "Registration successful. Awaiting approval.";
}

export interface LoginRequest {
  email: string;           // Required, valid email
  password: string;        // Required
  role: "PATIENT" | "DOCTOR" | "ADMIN" | "SUPER_ADMIN";  // Required, must match user's actual role
}

export interface ForgotPasswordRequest {
  email: string;  // Required, must exist in system
}

export interface ForgotPasswordResponse {
  success: true;
  message: "Password reset link sent.";
}

export interface LoginResponse {
  success: true;
  message: "Login successful";
  token: string; // JWT token format: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  user: {
    id: string;        // e.g., "6881eb1ddc3fe396edd3345c"
    name: string;      // Full name e.g., "John Doe"
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
  };
}

export interface LogoutRequest {
  // Empty body - just requires Bearer token in headers
}

export interface LogoutResponse {
  success: true;
  message: "Logout successful";
}

// ========== User Management API Types ==========
export interface UserProfileResponse {
  success: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone?: string;
    isActive: boolean;
    gender?: "Male" | "Female" | "Other";
    createdAt: Date;
    updatedAt: Date;
    // Additional fields based on role (Patient/Doctor/Admin)
  };
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  // Additional fields based on user role
}

export interface UpdateProfileResponse {
  success: true;
  message: "Profile updated successfully";
  user: UserProfileResponse['user'];
}

export interface ChangePasswordRequest {
  currentPassword: string;  // Required
  newPassword: string;      // Required, minimum 8 characters
}

export interface ChangePasswordResponse {
  success: true;
  message: "Password changed successfully";
}

export interface UploadAvatarResponse {
  success: true;
  message: "Avatar uploaded successfully";
  avatarUrl: string;
}

// ========== Doctor Dashboard API Types ==========
export interface DashboardMetricsResponse {
  success: boolean;
  data: {
    totalPatients: number;
    pendingAnalysis: number;
    completedReports: number;
    uploadsToday: number;
    avgProcessingTime: string;
  };
}

export interface PendingAnalysisResponse {
  success: boolean;
  count: number;
}

export interface CompletedReportsResponse {
  success: boolean;
  count: number;
}

export interface UploadstodayResponse {
  success: boolean;
  count: number;
}

export interface AvgProcessingTimeResponse {
  success: boolean;
  avgTime: string;
}

export interface MonthlyAnalysisResponse {
  success: boolean;
  data: {
    month: string;
    totalAnalyses: number;
    completedAnalyses: number;
    avgProcessingTime: string;
  }[];
}

export interface RecentActivityResponse {
  success: boolean;
  activities: {
    id: string;
    type: 'upload' | 'analysis' | 'report';
    description: string;
    timestamp: Date;
    patientName?: string;
  }[];
}

export interface UploadXrayResponse {
  success: boolean;
  message: string;
  uploadId: string;
  imageUrl: string;
}

export interface StartAnalysisRequest {
  uploadId: string;
  patientId: string;
}

export interface StartAnalysisResponse {
  success: boolean;
  message: string;
  analysisId: string;
}

export interface AnalysisStatusResponse {
  success: boolean;
  analyses: {
    id: string;
    status: 'pending' | 'analyzing' | 'completed' | 'reviewed';
    patientName: string;
    uploadedAt: Date;
    progress?: number;
  }[];
}

// Missing Doctor Registration (as noted in documentation)
export interface DoctorRegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  specialization: string;
  licenseNumber: string;
  phone: string;
}

// ========== Database Models ==========
export interface UserDocument {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // hashed
  role: UserRole;
  phone: string;
  gender?: "Male" | "Female" | "Other";
  isActive: boolean;
  isApproved?: boolean; // For patients
  specialization?: string; // For doctors
  licenseNumber?: string; // For doctors
  createdAt: Date;
  updatedAt: Date;
}

export interface XRayAnalysis {
  _id: string;
  patientId: string;
  doctorId: string;
  imageUrl: string;
  analysis: {
    condition: string;
    confidence: number;
    findings: string[];
  };
  status: "pending" | "analyzing" | "completed" | "reviewed";
  uploadedAt: Date;
  completedAt?: Date;
}

// ========== Common API Response Types ==========
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Error Response Types (as documented)
export interface ValidationErrorResponse {
  success: false;
  message: "All fields are required" | "Invalid email format" | "Password must be at least 8 characters long";
}

export interface AuthErrorResponse {
  success: false;
  message: "Access token required" | "Invalid token";
}

export interface AuthorizationErrorResponse {
  success: false;
  message: "Insufficient permissions";
}

export interface NotFoundErrorResponse {
  success: false;
  message: "Route not found";
  path: string;
}

export interface ServerErrorResponse {
  success: false;
  message: "Internal server error";
}

export type ErrorResponse = 
  | ValidationErrorResponse 
  | AuthErrorResponse 
  | AuthorizationErrorResponse 
  | NotFoundErrorResponse 
  | ServerErrorResponse;

// ========== Appointment API Types ==========
export type AppointmentStatus = 
  | "Pending"       // Initial status when created
  | "Scheduled"     // Confirmed by system
  | "Confirmed"     // Confirmed by doctor
  | "Completed"     // Appointment finished
  | "Cancelled"     // Cancelled by patient/doctor
  | "Declined";     // Declined by doctor

export interface AppointmentDocument {
  _id: string;
  patientId: string | PatientInfo;              // Reference to Patient
  doctorId: string | DoctorInfo;               // Reference to Doctor
  appointmentDate: Date | string;              // Scheduled date/time
  duration: number;                            // Duration in minutes (default: 30)
  reason: string;                              // Appointment reason
  notes?: string;                              // Additional notes
  status: AppointmentStatus;                   // Current status
  meetingUrl?: string;                        // Video meeting URL
  reminderSent: boolean;                      // Reminder status
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface PatientInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface DoctorInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization?: string;
  isAvailable?: boolean;
}

export interface PatientInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: "Male" | "Female" | "Other";
  isActive?: boolean;
}

export interface CreateAppointmentRequest {
  doctorId: string;
  appointmentDate: string;                     // ISO date string
  duration?: number;                           // Default: 30 minutes
  reason: string;
  notes?: string;
}

export interface CreateDoctorAppointmentRequest {
  patientId: string;                           // Doctor selects patient
  appointmentDate: string;                     // ISO date string
  duration?: number;                           // Default: 30 minutes
  reason: string;
  notes?: string;
}

export interface CreateAppointmentResponse {
  success: true;
  message: "Appointment request submitted successfully";
  data: AppointmentDocument;
}

export interface UpdateAppointmentRequest {
  appointmentDate?: string;
  reason?: string;
  notes?: string;
}

export interface UpdateAppointmentResponse {
  success: true;
  message: "Appointment updated successfully";
  data: AppointmentDocument;
}

export interface GetAppointmentsResponse {
  success: true;
  data: AppointmentDocument[];
}

export interface GetSingleAppointmentResponse {
  success: true;
  data: AppointmentDocument;
}

export interface CancelAppointmentResponse {
  success: true;
  message: "Appointment cancelled successfully";
}

export interface AppointmentActionResponse {
  success: true;
  message: string;
  data: AppointmentDocument;
}

export interface GetAvailableDoctorsResponse {
  success: true;
  data: DoctorInfo[];
}

export interface GetAvailablePatientsResponse {
  success: true;
  data: PatientInfo[];
}

export interface DoctorAvailabilityDocument {
  _id: string;
  doctorId: string;
  dayOfWeek: number;              // 0-6 (Sunday-Saturday)
  startTime: string;              // "09:00"
  endTime: string;                // "17:00"
  isAvailable: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ========== API Endpoints Configuration ==========
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Authentication
  PATIENT_REGISTER: `${API_BASE_URL}/api/auth/patients/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  
  // User Management
  USER_PROFILE: `${API_BASE_URL}/api/users/me`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/users/me`,
  CHANGE_PASSWORD: `${API_BASE_URL}/api/users/change-password`,
  UPLOAD_AVATAR: `${API_BASE_URL}/api/users/me/avatar`,
  
  // Doctor Dashboard
  DOCTOR_METRICS_OVERVIEW: `${API_BASE_URL}/api/doctor/metrics/overview`,
  DOCTOR_PENDING_ANALYSIS: `${API_BASE_URL}/api/doctor/metrics/pending-analysis`,
  DOCTOR_COMPLETED_REPORTS: `${API_BASE_URL}/api/doctor/metrics/completed-reports`,
  DOCTOR_UPLOADS_TODAY: `${API_BASE_URL}/api/doctor/metrics/uploads-today`,
  DOCTOR_AVG_PROCESSING_TIME: `${API_BASE_URL}/api/doctor/metrics/avg-processing-time`,
  DOCTOR_MONTHLY_ANALYSIS: `${API_BASE_URL}/api/doctor/metrics/monthly-analysis`,
  DOCTOR_RECENT_ACTIVITY: `${API_BASE_URL}/api/doctor/activity/recent`,
  DOCTOR_UPLOAD_XRAY: `${API_BASE_URL}/api/doctor/upload`,
  DOCTOR_START_ANALYSIS: `${API_BASE_URL}/api/doctor/analyze`,
  DOCTOR_ANALYSIS_STATUS: `${API_BASE_URL}/api/doctor/analyze/status`,
  DOCTOR_DIAGNOSIS_DISTRIBUTION: `${API_BASE_URL}/api/doctor/metrics/diagnosis-distribution`,
  
  // Patient Management
  GET_ALL_PATIENTS: `${API_BASE_URL}/api/patients`,
  RECENT_ANALYSIS: `${API_BASE_URL}/api/analysis/recent`,
  PENDING_ANALYSIS_COUNT: `${API_BASE_URL}/api/analysis/pending/count`,
  
  // Analytics and Metrics
  PATIENT_ANALYTICS: `${API_BASE_URL}/api/analytics/patients`,
  PERFORMANCE_METRICS: `${API_BASE_URL}/api/analytics/performance`,
  USER_ANALYTICS: `${API_BASE_URL}/api/analytics/users`,
  SYSTEM_HEALTH: `${API_BASE_URL}/api/system/health`,
  
  // Appointment System
  APPOINTMENTS_PATIENT_CREATE: `${API_BASE_URL}/api/appointments/patient`,
  APPOINTMENTS_PATIENT_LIST: `${API_BASE_URL}/api/appointments/patient`,
  APPOINTMENTS_PATIENT_GET: `${API_BASE_URL}/api/appointments/patient`, // /:id
  APPOINTMENTS_PATIENT_UPDATE: `${API_BASE_URL}/api/appointments/patient`, // /:id
  APPOINTMENTS_PATIENT_CANCEL: `${API_BASE_URL}/api/appointments/patient`, // /:id
  APPOINTMENTS_DOCTOR_CREATE: `${API_BASE_URL}/api/appointments/doctor/create`,
  APPOINTMENTS_DOCTOR_REQUESTS: `${API_BASE_URL}/api/appointments/doctor/requests`,
  APPOINTMENTS_DOCTOR_ACCEPT: `${API_BASE_URL}/api/appointments/doctor/requests`, // /:id/accept
  APPOINTMENTS_DOCTOR_DECLINE: `${API_BASE_URL}/api/appointments/doctor/requests`, // /:id/decline
  APPOINTMENTS_AVAILABLE_DOCTORS: `${API_BASE_URL}/api/appointments/doctors/available`,
  APPOINTMENTS_AVAILABLE_PATIENTS: `${API_BASE_URL}/api/appointments/patients/available`,
} as const;

// ========== JWT Payload ==========
export interface JWTPayload {
  userId: string;
  role: UserRole;
  email: string;
  iat: number;
  exp: number;
}
