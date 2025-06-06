// components/DashboardChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for the chart.
const data = [
  { name: "Jan", reports: 2, appointments: 1 },
  { name: "Feb", reports: 3, appointments: 2 },
  { name: "Mar", reports: 4, appointments: 1 },
  { name: "Apr", reports: 1, appointments: 3 },
  { name: "May", reports: 5, appointments: 2 },
];

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="reports" fill="lightblue" />
        <Bar dataKey="appointments" fill="steelblue" />
      </BarChart>
    </ResponsiveContainer>
  );
}
