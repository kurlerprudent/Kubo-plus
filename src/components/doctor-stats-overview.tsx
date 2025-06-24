import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Activity, ClipboardList, Stethoscope, User } from 'lucide-react';

  // Mock data for demonstration
  const stats = [
    { title: "Total Cases", value: "142", change: "+12%", icon: <ClipboardList className="h-5 w-5" /> },
    { title: "Pending Reviews", value: "28", change: "-3%", icon: <Stethoscope className="h-5 w-5" /> },
    { title: "Completed Today", value: "19", change: "+8%", icon: <Activity className="h-5 w-5" /> },
    { title: "New Patients", value: "7", change: "+15%", icon: <User className="h-5 w-5" /> },
  ];

const DoctorStatsOverview = () => {
  return (
   
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                    <div className="bg-indigo-100/50 p-2 rounded-lg">
                      {stat.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
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