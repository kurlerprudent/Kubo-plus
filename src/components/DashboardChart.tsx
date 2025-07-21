// components/DashboardChart.tsx
import React from 'react';
import { 
  Line, 
  Bar, 
  Pie 
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDataPoint {
  date: string;
  value: number;
}

interface DashboardChartProps {
  data?: ChartDataPoint[];
  isLoading: boolean;
  chartType: 'line' | 'bar' | 'pie';
}

const DashboardChart: React.FC<DashboardChartProps> = ({ 
  data, 
  isLoading,
  chartType
}) => {
  if (isLoading) {
    return <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />;
  }

  const chartData = data || [
    { date: '2023-01-01', value: 100 },
    { date: '2023-01-02', value: 120 },
    { date: '2023-01-03', value: 90 },
    { date: '2023-01-04', value: 130 },
    { date: '2023-01-05', value: 110 },
  ];

  const baseConfig = {
    labels: chartData.map(d => d.date),
    datasets: [
      {
        label: 'Health Score',
        data: chartData.map(d => d.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const pieData = {
    labels: chartData.map(d => d.date),
    datasets: [
      {
        data: chartData.map(d => d.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Health Metrics Over Time',
      },
    },
    scales: chartType !== 'pie' ? {
      y: {
        beginAtZero: false,
        min: 50,
        max: 150,
      },
    } : undefined,
  };

  return (
    <div className="h-64 w-full">
      {chartType === 'line' && <Line data={baseConfig} options={options} />}
      {chartType === 'bar' && <Bar data={baseConfig} options={options} />}
      {chartType === 'pie' && <Pie data={pieData} options={{
        ...options,
        plugins: {
          ...options.plugins,
          title: {
            ...options.plugins.title,
            text: 'Health Metrics Distribution'
          }
        }
      }} />}
    </div>
  );
};

export default DashboardChart;