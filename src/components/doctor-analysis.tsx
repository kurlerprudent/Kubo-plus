import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, Pie, PieChart, Sector, Label } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const casesData = [
  { category: "Pneumonia",    value: 52 },
  { category: "Tuberculosis", value: 18 },
  { category: "Lung Cancer",  value: 12 },
  { category: "Cardiomegaly", value: 9  },
  { category: "Effusion",     value: 7  },
  { category: "Other",        value: 14 },
]

const casesConfig = {
  value: { label: "Cases", color: "var(--chart-1)" },
  category: { label: "Disease" },
} satisfies ChartConfig

export function CasesByDiseaseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>June 2025 Cases by Disease</CardTitle>
        <CardDescription>Distribution of detected conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={casesConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={casesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="category" tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="value" fill="var(--chart-1)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}