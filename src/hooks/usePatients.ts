"use client";

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPatients } from '@/lib/api';
import { Patient, PatientsResponse } from '@/types/patient';

export const usePatients = () => {
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sexFilter, setSexFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch real patient data from backend
  const { 
    data: patientsResponse, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['patients'],
    queryFn: getAllPatients,
    refetchInterval: 60000, // Refresh every minute
    staleTime: 30000, // Data considered fresh for 30 seconds
  });

  const patients = patientsResponse?.data?.users || [];

  // Filter and search logic
  const handleSearchAndFilter = () => {
    if (!patients.length) {
      setFilteredPatients([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    
    const filtered = patients.filter((patient: Patient) => {
      const matchesSearch = !searchTerm || 
        patient.firstName.toLowerCase().includes(term) ||
        patient.lastName.toLowerCase().includes(term) ||
        patient.email.toLowerCase().includes(term) ||
        patient.phoneNumber.includes(term);

      const status = patient.status || 'Active'; // Default to Active if not set
      const matchesStatus = statusFilter === "All" || status === statusFilter;
      
      const matchesSex = sexFilter === "All" || patient.gender === sexFilter;

      return matchesSearch && matchesStatus && matchesSex;
    });

    setFilteredPatients(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Apply filters whenever dependencies change
  useEffect(() => {
    handleSearchAndFilter();
  }, [patients, searchTerm, statusFilter, sexFilter]);

  return {
    // Data
    patients,
    filteredPatients,
    isLoading,
    error,
    
    // Filters
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sexFilter,
    setSexFilter,
    
    // Pagination
    currentPage,
    setCurrentPage,
    
    // Actions
    refetch,
  };
};
