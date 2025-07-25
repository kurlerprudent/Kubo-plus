"use client";
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Activity, ClipboardList, Stethoscope, User, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getDoctorMetricsOverview, getPendingAnalysisCount, getRecentAnalysis } from '@/lib/api';

const DoctorStatsOverview = () => {
  // Fetch real-time data from your backend API
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ['doctorMetrics'],
    queryFn: getDoctorMetricsOverview,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: pendingData, isLoading: pendingLoading } = useQuery({
    queryKey: ['pendingAnalysis'],
    queryFn: getPendingAnalysisCount,
    refetchInterval: 30000,
  });

  const { data: recentData, isLoading: recentLoading } = useQuery({
    queryKey: ['recentAnalysis'],
    queryFn: getRecentAnalysis,
    refetchInterval: 30000,
  });

  // Mock data for uploads today since API doesn't have this endpoint
  const uploadsToday = 8;

  // Build stats from real API data
  const stats = [
    { 
      title: "Total Cases", 
      value: metricsLoading ? "..." : (metrics?.data?.totalPatients?.toString() || "0"), 
      change: "+12%", 
      icon: <ClipboardList className="h-5 w-5" />,
      loading: metricsLoading 
    },
    { 
      title: "Pending Reviews", 
      value: pendingLoading ? "..." : (pendingData?.data?.pendingCount?.toString() || "0"), 
      change: "-3%", 
      icon: <Stethoscope className="h-5 w-5" />,
      loading: pendingLoading 
    },
    { 
      title: "Recent Analysis", 
      value: recentLoading ? "..." : (recentData?.data?.length?.toString() || "0"), 
      change: "+8%", 
      icon: <Activity className="h-5 w-5" />,
      loading: recentLoading 
    },
    { 
      title: "New Patients", 
      value: uploadsToday.toString(), 
      change: "+15%", 
      icon: <User className="h-5 w-5" />,
      loading: false 
    },
  ];

  if (metricsError) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <p className="text-red-600">Failed to load doctor metrics</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
   
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                    <div className="bg-indigo-100/50 p-2 rounded-lg">
                      {stat.loading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      ) : (
                        stat.icon
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-800">
                      {stat.loading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                          <span className="text-gray-500">Loading...</span>
                        </div>
                      ) : (
                        stat.value
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className={`${stat.change.startsWith('+') ? 'text-green-500' : 'text-amber-500'}`}>
                        {stat.change}
                      </span> from last week
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
    
  )
}

export default DoctorStatsOverview