import { useState, useEffect } from 'react';
import { getUserProfile, logoutUser, isAuthenticated, clearAuthToken } from '@/lib/api';
import { UserProfileResponse, UserRole } from '@/types/api';

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfileResponse['user'] | null;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      if (!isAuthenticated()) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
        return;
      }

      // Verify token with backend
      const response = await getUserProfile();
      
      if (response.success) {
        setAuthState({
          isAuthenticated: true,
          user: response.user,
          isLoading: false,
        });
      } else {
        // Token is invalid, clear it
        clearAuthToken();
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    } catch (error) {
      // Error fetching profile, likely invalid token
      clearAuthToken();
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  };

  const login = (user: UserProfileResponse['user']) => {
    setAuthState({
      isAuthenticated: true,
      user,
      isLoading: false,
    });
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // Even if logout fails on backend, clear local state
      console.error('Logout error:', error);
    }
    
    clearAuthToken();
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  };

  const hasRole = (role: UserRole): boolean => {
    return authState.user?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return authState.user ? roles.includes(authState.user.role as UserRole) : false;
  };

  return {
    ...authState,
    login,
    logout,
    hasRole,
    hasAnyRole,
    checkAuthStatus,
  };
}

// Role-based route protection hook
export function useRequireAuth(allowedRoles?: UserRole[]) {
  const { isAuthenticated, user, isLoading, hasAnyRole } = useAuth();

  const isAuthorized = () => {
    if (!isAuthenticated || !user) return false;
    if (!allowedRoles) return true;
    return hasAnyRole(allowedRoles);
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    isAuthorized: isAuthorized(),
  };
}
