// src/types/admin-user.ts (NEW FILE)


export type AdminUserStatus = "ACTIVE" | "INACTIVE" | "PENDING";


export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string; // 'SuperAdmin', 'ContentAdmin', 'SupportAdmin'
  status: AdminUserStatus;
  lastLogin?: Date | null; 
  createdAt: Date; // Date the account was created
  avatarUrl?: string; // Optional: URL for profile picture
}

// Helper function to get full name
export const getAdminUserFullName = (admin: Partial<AdminUser>): string => {
    return [admin.firstName, admin.lastName].filter(Boolean).join(' ') || 'N/A';
};
