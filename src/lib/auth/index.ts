"use server"
// lib/auth/index.ts
import {
  APIErrorResponse,
  AuthResponse,
  LoginCredentials,
  MedicalUser,
  MedicalUserRole,
} from './types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_KEY = 'med_auth_token';

// Helper functions for token management
export const setAuthToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 day
  });
};

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value;
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
  redirect('/login');
};

// Main authentication server actions
export const login = async (credentials: LoginCredentials): Promise<MedicalUser> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data: AuthResponse | APIErrorResponse = await response.json();

    if (!response.ok) {
      const error = (data as APIErrorResponse).error || 'Authentication failed';
      throw new Error(error);
    }

    const { token, user } = data as AuthResponse;
    await setAuthToken(token);

    // Handle role-based redirection
    switch (user.role) {
      case 'SUPER_ADMIN':
      case 'ADMIN':
        redirect('/admin/dashboard');
        break;
      case 'DOCTOR':
        redirect('/doctor/dashboard');
        break;
      case 'PATIENT':
        redirect('/patient/dashboard');
        break;
      default:
        throw new Error('Unauthorized role');
    }
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Authentication failed'
    );
  }
};

export const getCurrentUser = async (): Promise<MedicalUser | null> => {
  const token = await getAuthToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      await logout();
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Session validation error:', error);
    await logout();
    return null;
  }
};

// Role validation helpers
export const requireRole = async (allowedRoles: MedicalUserRole[]) => {
  return async () => {
    const user = await getCurrentUser();
    if (!user || !allowedRoles.includes(user.role)) {
      redirect('/unauthorized');
    }
    return user;
  };
};

export const medicalAuth = {
  login,
  logout,
  getCurrentUser,
  requireRole,
  getAuthToken,
};
