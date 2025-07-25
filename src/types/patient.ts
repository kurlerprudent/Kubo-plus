// Types and constants for patient management

export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  status?: 'Active' | 'Pending' | 'Inactive';
  lastVisit?: string;
  condition?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientsResponse {
  success: boolean;
  data: {
    users: Patient[];
  };
}

export const PATIENT_COLORS = {
  primaryBtn: "#00FF9C",
  primaryBtnHover: "#B6FFA1",
  textColor: "#26355D",
  textColorSecondary: "#6B7280",
  background1: "#F2F2F2",
  background2: "#F5F5F5",
  background3: "#F2EFE7",
};

export const STATUS_OPTIONS = ['All', 'Active', 'Pending', 'Inactive'];
export const GENDER_OPTIONS = ['All', 'MALE', 'FEMALE', 'OTHER'];
export const ITEMS_PER_PAGE = 5;
