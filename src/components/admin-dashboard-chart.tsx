"use client"

import { Bar, BarChart } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { month: "January", doctors: 19, patient: 80 },
  { month: "February", doctors: 25, patient: 200 },
  { month: "March", doctors: 23, patients: 120 },
  { month: "April", doctors: 27, patients: 190 },
  { month: "May", doctors: 20, patients: 130 },
  { month: "June", doctors: 21, patients: 140 },
]

const chartConfig = {
  doctors: {
    label: "Desktop",
    color: "#2563eb",
  },
  patients: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function AdminChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
