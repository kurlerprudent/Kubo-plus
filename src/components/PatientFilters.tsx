"use client";

import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { STATUS_OPTIONS, GENDER_OPTIONS } from '@/types/patient';

interface PatientFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sexFilter: string;
  setSexFilter: (sex: string) => void;
  onRefresh: () => void;
  totalPatients: number;
  filteredCount: number;
}

const PatientFilters: React.FC<PatientFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sexFilter,
  setSexFilter,
  onRefresh,
  totalPatients,
  filteredCount,
}) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Title and Stats */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Patient Management</h2>
          <p className="text-gray-600">
            Showing {filteredCount} of {totalPatients} patients
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                Status: {status}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Filter */}
        <div className="flex items-center gap-2">
          <select
            value={sexFilter}
            onChange={(e) => setSexFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {GENDER_OPTIONS.map((gender) => (
              <option key={gender} value={gender}>
                Gender: {gender}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PatientFilters;
