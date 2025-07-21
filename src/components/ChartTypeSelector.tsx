"use client";
import { useState } from 'react';

export const ChartTypeSelector = () => {
  const [chartType, setChartType] = useState('line');
  
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {['line', 'bar', 'pie'].map(type => (
        <button
          key={type}
          className={`px-3 py-1 rounded-md text-sm capitalize transition-colors ${
            chartType === type
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setChartType(type)}
          aria-label={`Switch to ${type} chart`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};