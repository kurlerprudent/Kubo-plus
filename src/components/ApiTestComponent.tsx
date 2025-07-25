"use client";

import { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { getDoctorMetricsOverview, getUserProfile, changePassword } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function ApiTestComponent() {
  const { user, hasRole } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const testUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      setTestResults(response);
      toast.success('Profile fetched successfully');
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testDoctorMetrics = async () => {
    if (!hasRole('DOCTOR')) {
      toast.error('This test requires DOCTOR role');
      return;
    }

    setIsLoading(true);
    try {
      const response = await getDoctorMetricsOverview();
      setTestResults(response);
      toast.success('Doctor metrics fetched successfully');
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testChangePassword = async () => {
    setIsLoading(true);
    try {
      const response = await changePassword({
        currentPassword: 'oldPassword123',
        newPassword: 'newPassword456'
      });
      setTestResults(response);
      toast.success('Password changed successfully');
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>API Integration Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Current User: {user?.firstName} {user?.lastName} ({user?.role})
            </p>
            
            <div className="flex gap-2">
              <Button 
                onClick={testUserProfile} 
                disabled={isLoading}
                variant="outline"
              >
                Test User Profile
              </Button>
              
              <Button 
                onClick={testDoctorMetrics} 
                disabled={isLoading || !hasRole('DOCTOR')}
                variant="outline"
              >
                Test Doctor Metrics
              </Button>
              
              <Button 
                onClick={testChangePassword} 
                disabled={isLoading}
                variant="outline"
              >
                Test Change Password
              </Button>
            </div>

            {testResults && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">API Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(testResults, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
