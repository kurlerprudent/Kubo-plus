// Backend API URLs (matching tested documentation)
export const API_URLS = {
  // Authentication
  PATIENT_REGISTER: "/api/auth/patients/register",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout", 
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  
  // User Management
  USER_PROFILE: "/api/users/me",
  UPDATE_PROFILE: "/api/users/me",
  CHANGE_PASSWORD: "/api/users/change-password",
  UPLOAD_AVATAR: "/api/users/me/avatar",
  
  // Doctor Dashboard
  DOCTOR_METRICS_OVERVIEW: "/api/doctor/metrics/overview",
  DOCTOR_PENDING_ANALYSIS: "/api/doctor/metrics/pending-analysis",
  DOCTOR_COMPLETED_REPORTS: "/api/doctor/metrics/completed-reports", 
  DOCTOR_UPLOADS_TODAY: "/api/doctor/metrics/uploads-today",
  DOCTOR_AVG_PROCESSING_TIME: "/api/doctor/metrics/avg-processing-time",
  DOCTOR_MONTHLY_ANALYSIS: "/api/doctor/metrics/monthly-analysis",
  DOCTOR_RECENT_ACTIVITY: "/api/doctor/activity/recent",
  DOCTOR_UPLOAD_XRAY: "/api/doctor/upload",
  DOCTOR_START_ANALYSIS: "/api/doctor/analyze",
  DOCTOR_ANALYSIS_STATUS: "/api/doctor/analyze/status",
  
  // Legacy (keeping for existing components)
  UPLOAD: "/api/upload",
  ANALYZE: "/api/analyze",
  GENERATE_REPORT: "/api/generate-report",
};

export const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/dicom"];
export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB