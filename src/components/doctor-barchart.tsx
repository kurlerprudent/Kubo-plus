"use client"

import { TrendingUp, Loader2 } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useQuery } from '@tanstack/react-query';
import { getDiagnosisDistribution } from '@/lib/api';
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

const chartConfig = {
  count: {
    label: "Cases",
    // Using your primaryBtnHover color for light blue
    color: `#${COLORS.accent.primary}`,
  },
} satisfies ChartConfig

export function DoctorBarChart() {
  const { data: diagnosisData, isLoading, error } = useQuery({
    queryKey: ['diagnosisDistribution'],
    queryFn: getDiagnosisDistribution,
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  // Use real data or fallback
  const chartData = diagnosisData?.data || [
    { diagnosis: "Pneumonia", count: 0 },
    { diagnosis: "Tuberculosis", count: 0 },
    { diagnosis: "Normal", count: 0 },
    { diagnosis: "Other", count: 0 },
  ];

  if (isLoading) {
    return (
      <Card className="border-none" style={{ backgroundColor: `#${COLORS.background.primary}` }}>
        <CardHeader>
          <CardTitle>Diagnosis Distribution</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-none" style={{ backgroundColor: `#${COLORS.background.primary}` }}>
        <CardHeader>
          <CardTitle>Diagnosis Distribution</CardTitle>
          <CardDescription>Failed to load data</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <p className="text-red-500">Unable to load diagnosis data</p>
        </CardContent>
      </Card>
    );
  }

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