// components/MainDashboardArea.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { GlassCarousel } from '@/components/system-courosel'
import { DoctorLineChart } from './doctor-linechart'
import { DoctorBarChart } from './doctor-barchart'

const MainDashboardArea = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-y-10">
      {/* Carousel */}
      <div className="lg:col-span-1">
        <Card className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Just Three Steps</CardTitle>
          </CardHeader>
          <CardContent className="h-[340px]">
            <GlassCarousel />
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Cases Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-max-[270px]">
            <DoctorLineChart />
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Diagnosis Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-max-[270px]">
            <DoctorBarChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MainDashboardArea