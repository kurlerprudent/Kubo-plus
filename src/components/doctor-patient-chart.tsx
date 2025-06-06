"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent
} from "@/components/ui/chart";
import { useState } from "react";

// Data source: Ideally derived from your table, or fetched separately.
const chartData = [
  { doctor: "Dr. Martin", patients: 5 },
  { doctor: "Dr. Johnson", patients: 3 },
  { doctor: "Dr. White", patients: 8 },
  { doctor: "Dr. Smith", patients: 2 },
  { doctor: "Dr. Adams", patients: 6 },
];

// Chart configuration: Using a soft sea blue color for the bars.
const chartConfig = {
  patients: {
    label: "Assigned Patients",
    color: "#5BC0EB",
  },
};

export function DoctorPatientChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-blue-600 dark:text-blue-300">
          Patient Distribution per Doctor
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          Number of patients assigned to each doctor
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Chart Section */}
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid
                stroke="rgba(0, 123, 255, 0.1)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="doctor"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="text-blue-600 dark:text-blue-300"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                allowDecimals={false}
                className="text-blue-600 dark:text-blue-300"
              />
              <Tooltip
                content={<ChartTooltipContent indicator="dashed" />}
                cursor={{ fill: "rgba(0, 123, 255, 0.1)" }}
              />
              <Bar
                dataKey="patients"
                name={chartConfig.patients.label}
                fill={chartConfig.patients.color}
                radius={[4, 4, 0, 0]}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Button Controls */}
        <div className="mt-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Doctor List</h3>
        </div>

        {/* Data Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Doctor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Patients
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {chartData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.patients}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors duration-200"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
