// API utility functions for the tested backend
import { 
  PatientRegistrationRequest, 
  PatientRegistrationResponse,
  LoginRequest, 
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LogoutResponse,
  UserProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  DashboardMetricsResponse,
  CreateAppointmentRequest,
  CreateDoctorAppointmentRequest,
  CreateAppointmentResponse,
  UpdateAppointmentRequest,
  UpdateAppointmentResponse,
  GetAppointmentsResponse,
  GetSingleAppointmentResponse,
  CancelAppointmentResponse,
  AppointmentActionResponse,
  GetAvailableDoctorsResponse,
  GetAvailablePatientsResponse,
  API_ENDPOINTS,
  ErrorResponse
} from '@/types/api';

// ========== Utility Functions ==========

export function handleApiError(error: any): string {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}

// Authentication utility functions
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('token');
  return !!token;
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

// ========== Authentication API Functions ==========

export async function registerPatient(data: PatientRegistrationRequest): Promise<PatientRegistrationResponse> {
  const response = await fetch(API_ENDPOINTS.PATIENT_REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to register patient');
  }

  return result;
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to login');
  }

  return result;
}

export async function forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to send password reset email');
  }

  return result;
}

export async function logoutUser(): Promise<LogoutResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.LOGOUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to logout');
  }

  // Clear token from localStorage
  localStorage.removeItem('token');

  return result;
}

// ========== User Profile API Functions ==========

export async function getUserProfile(): Promise<UserProfileResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.USER_PROFILE, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch user profile');
  }

  return result;
}

export async function updateProfile(data: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.UPDATE_PROFILE, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to update profile');
  }

  return result;
}

export async function changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.CHANGE_PASSWORD, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to change password');
  }

  return result;
}

// ========== Dashboard & Analytics API Functions ==========

export async function getDoctorMetricsOverview(): Promise<DashboardMetricsResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.DOCTOR_METRICS_OVERVIEW, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch metrics overview');
  }

  return result;
}

export async function getAllPatients(): Promise<{ success: boolean; data: { users: any[] } }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.GET_ALL_PATIENTS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch patients');
  }

  return result;
}

export async function getRecentAnalysis(): Promise<{ success: boolean; data: any[] }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.RECENT_ANALYSIS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch recent analysis');
  }

  return result;
}

export async function getPendingAnalysisCount(): Promise<{ success: boolean; data: { pendingCount: number } }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.PENDING_ANALYSIS_COUNT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch pending analysis count');
  }

  return result;
}

export async function getDiagnosisDistribution(): Promise<{ success: boolean; data: any }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.DOCTOR_DIAGNOSIS_DISTRIBUTION, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch diagnosis distribution');
  }

  return result;
}

export async function getPatientAnalytics(): Promise<{ success: boolean; data: any }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.PATIENT_ANALYTICS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch patient analytics');
  }

  return result;
}

export async function getPerformanceMetrics(): Promise<{ success: boolean; data: any }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.PERFORMANCE_METRICS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch performance metrics');
  }

  return result;
}

export async function getUserAnalytics(): Promise<{ success: boolean; data: any }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.USER_ANALYTICS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch user analytics');
  }

  return result;
}

export async function getSystemHealth(): Promise<{ success: boolean; data: any }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.SYSTEM_HEALTH, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch system health');
  }

  return result;
}

// ========== Appointment API Functions ==========

// Patient Appointment Functions
export async function createAppointment(data: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.APPOINTMENTS_PATIENT_CREATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to create appointment');
  }

  return result;
}

export async function getPatientAppointments(filters?: { 
  status?: string; 
  upcoming?: boolean 
}): Promise<GetAppointmentsResponse> {
  const token = localStorage.getItem('token');
  
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.upcoming) params.append('upcoming', 'true');
  
  const url = filters && Object.keys(filters).length > 0 
    ? `${API_ENDPOINTS.APPOINTMENTS_PATIENT_LIST}?${params.toString()}`
    : API_ENDPOINTS.APPOINTMENTS_PATIENT_LIST;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch appointments');
  }

  return result;
}

export async function getSingleAppointment(appointmentId: string): Promise<GetSingleAppointmentResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_ENDPOINTS.APPOINTMENTS_PATIENT_GET}/${appointmentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch appointment');
  }

  return result;
}

export async function updateAppointment(
  appointmentId: string, 
  data: UpdateAppointmentRequest
): Promise<UpdateAppointmentResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_ENDPOINTS.APPOINTMENTS_PATIENT_UPDATE}/${appointmentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to update appointment');
  }

  return result;
}

export async function cancelAppointment(appointmentId: string): Promise<CancelAppointmentResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_ENDPOINTS.APPOINTMENTS_PATIENT_CANCEL}/${appointmentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to cancel appointment');
  }

  return result;
}

// Doctor Appointment Functions
export async function createDoctorAppointment(data: CreateDoctorAppointmentRequest): Promise<CreateAppointmentResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.APPOINTMENTS_DOCTOR_CREATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to create appointment');
  }

  return result;
}

export async function getDoctorAppointmentRequests(): Promise<GetAppointmentsResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.APPOINTMENTS_DOCTOR_REQUESTS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch appointment requests');
  }

  return result;
}

export async function acceptAppointmentRequest(appointmentId: string): Promise<AppointmentActionResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_ENDPOINTS.APPOINTMENTS_DOCTOR_ACCEPT}/${appointmentId}/accept`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to accept appointment');
  }

  return result;
}

export async function declineAppointmentRequest(appointmentId: string): Promise<AppointmentActionResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_ENDPOINTS.APPOINTMENTS_DOCTOR_DECLINE}/${appointmentId}/decline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to decline appointment');
  }

  return result;
}

// General Appointment Functions
export async function getAvailableDoctors(): Promise<GetAvailableDoctorsResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.APPOINTMENTS_AVAILABLE_DOCTORS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch available doctors');
  }

  return result;
}

export async function getAvailablePatients(): Promise<GetAvailablePatientsResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(API_ENDPOINTS.APPOINTMENTS_AVAILABLE_PATIENTS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch available patients');
  }

  return result;
}
