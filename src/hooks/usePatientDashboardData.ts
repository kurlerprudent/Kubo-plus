
import { useQuery } from '@tanstack/react-query';

// Mock data for the dashboard
const mockDashboardData = {
  metrics: {
    appointments: 3,
    reports: 5,
    visits: 12,
  },
  chartData: [
    { date: '2023-01-01', value: 100 },
    { date: '2023-01-02', value: 120 },
    { date: '2023-01-03', value: 90 },
    { date: '2023-01-04', value: 130 },
    { date: '2023-01-05', value: 110 },
  ],
  recentActivity: [
    { 
      id: 1, 
      message: 'Report "chest Xray " uploaded', 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() 
    },
    { 
      id: 2, 
      message: 'Appointment scheduled with Dr. Smith', 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() 
    },
    { 
      id: 3, 
      message: 'Completed your annual checkup', 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() 
    },
  ],
  appointments: [
    {
      id: 1,
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      doctor: 'Dr. Smith',
      type: 'General Checkup',
      status: 'Scheduled',
    },
    {
      id: 2,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      doctor: 'Dr. Johnson',
      type: 'Follow-up',
      status: 'Completed',
    },
    {
      id: 3,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      doctor: 'Dr. Williams',
      type: 'Dental',
      status: 'Completed',
    },
  ],
};

const fetchPatientData = async () => {
  try {
    const res = await fetch('/api/patient/dashboard');
    
    if (!res.ok) {
      // Return mock data if API fails
      return mockDashboardData;
    }
    
    return await res.json();
  } catch (error) {
    // Return mock data if network error occurs
    return mockDashboardData;
  }
};

export const usePatientDashboardData = () => {
  return useQuery({
    queryKey: ['patientDashboard'],
    queryFn: fetchPatientData,
    refetchInterval: 300000,
    staleTime: 1000 * 60 * 4
  });
};