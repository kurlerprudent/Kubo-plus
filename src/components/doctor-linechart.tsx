"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { colors } from "@/constants/colors"

export const description = "A line chart with dots"

const chartData = [
  { day: "Sun", patients: 186 },
  { day: "Mon", patients: 305 },
  { day: "Tue", patients: 237 },
  { day: "Wed", patients:  73 },
  { day: "Thu", patients: 209 },
  { day: "Fri", patients: 214 },
  { day: "Sat", patients: 214 },
]

const chartConfig = {
  patients: {
    label: "Patients",
    color: `#${colors["text-color"]}`,
  },
} satisfies ChartConfig

export function DoctorLineChart() {
  return (
    <Card 
      className="border-none" 
      style={{ backgroundColor: `#${colors["backgrounf-3"]}` }}
    >
      <CardHeader>
        <CardTitle>Patients</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) => v.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="patients"
              type="natural"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by -6.2% this day <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total Patients for the last 7 days
        </div>
      </CardFooter>
    </Card>
  )
}