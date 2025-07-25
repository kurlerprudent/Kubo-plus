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
  API_ENDPOINTS,
  ErrorResponse
} from '@/types/api';

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

  // Store auth token in localStorage
  if (result.token) {
    localStorage.setItem('auth_token', result.token);
  }

  return result;
}

export async function logoutUser(): Promise<LogoutResponse> {
  const token = getAuthToken();
  
  const response = await fetch(API_ENDPOINTS.LOGOUT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  // Clear auth token regardless of response
  clearAuthToken();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to logout');
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
    throw new Error(result.message || 'Failed to send password reset');
  }

  return result;
}

// ========== User Profile API Functions ==========

export async function getUserProfile(): Promise<UserProfileResponse> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(API_ENDPOINTS.USER_PROFILE, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch user profile');
  }

  return result;
}

export async function updateUserProfile(data: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(API_ENDPOINTS.UPDATE_PROFILE, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
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
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(API_ENDPOINTS.CHANGE_PASSWORD, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to change password');
  }

  return result;
}

export async function uploadAvatar(file: File): Promise<{ success: boolean; message: string; avatarUrl: string }> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(API_ENDPOINTS.UPLOAD_AVATAR, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to upload avatar');
  }

  return result;
}

export async function getAllPatients(): Promise<{ success: boolean; data: { users: any[] } }> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_ENDPOINTS.USER_PROFILE.replace('/me', 's')}?role=PATIENT`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patients: ${response.statusText}`);
  }

  return response.json();
}

// ========== Doctor Dashboard API Functions ==========

export async function getDoctorMetricsOverview(): Promise<DashboardMetricsResponse> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(API_ENDPOINTS.DOCTOR_METRICS_OVERVIEW, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function getPendingAnalysisCount(): Promise<{ success: boolean; count: number }> {
  const token = getAuthToken();
  
  const response = await fetch(API_ENDPOINTS.DOCTOR_PENDING_ANALYSIS, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function getCompletedReportsCount(): Promise<{ success: boolean; count: number }> {
  const token = getAuthToken();
  
  const response = await fetch(API_ENDPOINTS.DOCTOR_COMPLETED_REPORTS, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function getTodaysUploadsCount(): Promise<{ success: boolean; count: number }> {
  const token = getAuthToken();
  
  const response = await fetch(API_ENDPOINTS.DOCTOR_UPLOADS_TODAY, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function getDiagnosisDistribution(): Promise<{ success: boolean; data: Array<{ diagnosis: string; count: number }> }> {
  const token = getAuthToken();
  
  const response = await fetch(API_ENDPOINTS.DOCTOR_DIAGNOSIS_DISTRIBUTION, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function getAverageProcessingTime(): Promise<{ success: boolean; avgTime: string }> {
  const token = getAuthToken();
  
  const response = await fetch(API_ENDPOINTS.DOCTOR_AVG_PROCESSING_TIME, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
}

// ========== Utility Functions ==========

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function clearAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

// Error handler for API responses
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
