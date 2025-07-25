"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  isLoading: boolean;
  login: (user: any) => void;
  logout: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for route protection
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: UserRole[]
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, user, isLoading, hasAnyRole } = useAuthContext();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          // Redirect to login
          window.location.href = '/login';
          return;
        }

        if (allowedRoles && !hasAnyRole(allowedRoles)) {
          // Redirect to unauthorized page
          window.location.href = '/unauthorized';
          return;
        }

        setIsAuthorized(true);
      }
    }, [isAuthenticated, isLoading, hasAnyRole]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (!isAuthorized) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div>Checking authorization...</div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
