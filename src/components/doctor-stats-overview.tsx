"use client";
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Activity, ClipboardList, Stethoscope, User, Loader2, Upload, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { 
  getDoctorMetricsOverview, 
  getDoctorPendingAnalysis,
  getDoctorCompletedReports,
  getDoctorUploadsToday,
  getDoctorAvgProcessingTime
} from '@/lib/api';

const DoctorStatsOverview = () => {
  // Fetch comprehensive metrics from API
  const { data: overview, isLoading: overviewLoading, error: overviewError } = useQuery({
    queryKey: ['doctorMetricsOverview'],
    queryFn: getDoctorMetricsOverview,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: pendingAnalysis, isLoading: pendingLoading } = useQuery({
    queryKey: ['doctorPendingAnalysis'],
    queryFn: getDoctorPendingAnalysis,
    refetchInterval: 30000,
  });

  const { data: completedReports, isLoading: completedLoading } = useQuery({
    queryKey: ['doctorCompletedReports'],
    queryFn: getDoctorCompletedReports,
    refetchInterval: 30000,
  });

  const { data: uploadsToday, isLoading: uploadsLoading } = useQuery({
    queryKey: ['doctorUploadsToday'],
    queryFn: getDoctorUploadsToday,
    refetchInterval: 30000,
  });

  const { data: avgProcessingTime, isLoading: avgTimeLoading } = useQuery({
    queryKey: ['doctorAvgProcessingTime'],
    queryFn: getDoctorAvgProcessingTime,
    refetchInterval: 60000, // Refresh every minute
  });

  // Build stats from real API data
  const stats = [
    { 
      title: "Pending Analysis", 
      value: pendingLoading ? "..." : (pendingAnalysis?.data?.count?.toString() || "0"), 
      change: "+5%", 
      icon: <Stethoscope className="h-5 w-5" />,
      loading: pendingLoading,
      color: "text-orange-600"
    },
    { 
      title: "Completed Reports", 
      value: completedLoading ? "..." : (completedReports?.data?.count?.toString() || "0"), 
      change: "+12%", 
      icon: <ClipboardList className="h-5 w-5" />,
      loading: completedLoading,
      color: "text-green-600"
    },
    { 
      title: "Uploads Today", 
      value: uploadsLoading ? "..." : (uploadsToday?.data?.count?.toString() || "0"), 
      change: "+8%", 
      icon: <Upload className="h-5 w-5" />,
      loading: uploadsLoading,
      color: "text-blue-600"
    },
    { 
      title: "Avg. Processing Time", 
      value: avgTimeLoading ? "..." : (avgProcessingTime?.data?.avgTime ? `${avgProcessingTime.data.avgTime}min` : "0min"), 
      change: "-15%", 
      icon: <Clock className="h-5 w-5" />,
      loading: avgTimeLoading,
      color: "text-purple-600"
    }
  ];

  if (overviewError) {
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
                        <div className={stat.color}>
                          {stat.icon}
                        </div>
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