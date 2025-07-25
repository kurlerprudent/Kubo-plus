"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, Stethoscope, User, Upload, TestTube } from 'lucide-react';
import { loginUser } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const testAccounts = [
  {
    name: "Dr. Sarah Johnson",
    email: "dr.sarah.johnson@testfrontend.com",
    password: "DrSarahTest123!",
    role: "DOCTOR",
    specialization: "Radiology",
    description: "Test AI X-ray analysis with radiology specialist account"
  },
  {
    name: "Dr. Robert Chen", 
    email: "dr.robert.chen@testfrontend.com",
    password: "DrRobertTest123!",
    role: "DOCTOR",
    specialization: "Orthopedics",
    description: "Test AI analysis with orthopedic specialist account"
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@testfrontend.com", 
    password: "EmmaTest123!",
    role: "PATIENT",
    specialization: "Patient",
    description: "Test patient dashboard and appointment booking"
  },
  {
    name: "Michael Davis",
    email: "michael.davis@testfrontend.com",
    password: "MikeTest123!", 
    role: "PATIENT",
    specialization: "Patient",
    description: "Test patient dashboard and appointment booking"
  }
];

export default function AITestLogin() {
  const [isLogging, setIsLogging] = useState(false);
  const [loggedAccount, setLoggedAccount] = useState<string | null>(null);
  const router = useRouter();

  const quickLogin = async (account: typeof testAccounts[0]) => {
    setIsLogging(true);
    setLoggedAccount(account.email);

    try {
      const response = await loginUser({
        email: account.email,
        password: account.password,
        role: account.role as "DOCTOR" | "PATIENT"
      });

      if (response.success) {
        toast.success(`Successfully logged in as ${account.name}`);
        
        // Redirect based on role
        if (account.role === "DOCTOR") {
          router.push('/doctor-dashboard/radiologist-upload-xray');
        } else {
          router.push('/dashboard');
        }
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLogging(false);
      setLoggedAccount(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Kubo+ AI Testing</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Quick login with test accounts to demonstrate AI-powered X-ray analysis, 
            appointment system, and doctor dashboard features.
          </p>
        </div>

        {/* AI Features Highlight */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Brain className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>AI Integration Ready:</strong> Upload X-ray images → AI analysis → Real-time results → 
            Automated report generation with confidence scores and clinical recommendations.
          </AlertDescription>
        </Alert>

        {/* Test Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testAccounts.map((account, index) => (
            <Card key={index} className={`transition-all duration-200 hover:shadow-lg ${
              account.role === 'DOCTOR' ? 'border-blue-200 bg-blue-50/30' : 'border-green-200 bg-green-50/30'
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {account.role === 'DOCTOR' ? (
                      <Stethoscope className="h-5 w-5 text-blue-600" />
                    ) : (
                      <User className="h-5 w-5 text-green-600" />
                    )}
                    {account.name}
                  </CardTitle>
                  <Badge variant={account.role === 'DOCTOR' ? 'default' : 'secondary'}>
                    {account.specialization}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{account.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Email:</span> {account.email}</p>
                    <p><span className="font-medium">Password:</span> {account.password}</p>
                    <p><span className="font-medium">Role:</span> {account.role}</p>
                  </div>
                  
                  {account.role === 'DOCTOR' && (
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge variant="outline" className="text-blue-600 border-blue-300">
                        <Upload className="h-3 w-3 mr-1" />
                        X-ray Upload
                      </Badge>
                      <Badge variant="outline" className="text-purple-600 border-purple-300">
                        <Brain className="h-3 w-3 mr-1" />
                        AI Analysis
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-300">
                        <TestTube className="h-3 w-3 mr-1" />
                        Live Dashboard
                      </Badge>
                    </div>
                  )}

                  <Button 
                    onClick={() => quickLogin(account)}
                    disabled={isLogging}
                    className={`w-full ${
                      account.role === 'DOCTOR' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {isLogging && loggedAccount === account.email ? (
                      <>Logging in...</>
                    ) : (
                      <>
                        {account.role === 'DOCTOR' ? (
                          <>
                            <Brain className="h-4 w-4 mr-2" />
                            Test AI Analysis
                          </>
                        ) : (
                          <>
                            <User className="h-4 w-4 mr-2" />
                            Test Patient Dashboard
                          </>
                        )}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">X-ray Upload</h3>
              <p className="text-sm text-gray-600">
                Drag & drop multiple X-ray images with patient information
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-600">
                Real-time AI analysis with confidence scores and heatmaps
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <TestTube className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Live Dashboard</h3>
              <p className="text-sm text-gray-600">
                Real-time metrics, appointments, and patient management
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
