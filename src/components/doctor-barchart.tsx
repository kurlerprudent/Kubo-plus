"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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

import { COLORS } from "@/constants/colors"

export const description = "A bar chart showing diagnosis counts"

const chartData = [
  { diagnosis: "Pneumonia",    count: 35 },
  { diagnosis: "Tuberculosis",  count: 12 },
  { diagnosis: "Normal",        count: 50 },
  { diagnosis: "Other",         count:  8 },
]

const chartConfig = {
  count: {
    label: "Cases",
    // Using your primaryBtnHover color for light blue
    color: `#${COLORS.accent.primary}`,
  },
} satisfies ChartConfig

export function DoctorBarChart() {
  return (
    <Card 
      className="border-none"
      style={{ backgroundColor: `#${COLORS.background.primary}` }}
    >
      <CardHeader>
        <CardTitle>Diagnosis Distribution</CardTitle>
        <CardDescription>Last 7 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="diagnosis"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(val) => val.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={[4,4,0,0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total cases for each diagnosis
        </div>
      </CardFooter>
    </Card>
  )
}