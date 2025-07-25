"use client";

import React, { useState } from 'react';
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePatients } from '@/hooks/usePatients';
import { Patient, ITEMS_PER_PAGE } from '@/types/patient';
import PatientFilters from './PatientFilters';
import PatientTableRow from './PatientTableRow';
import PatientModal from './PatientModal';

const PatientTable: React.FC = () => {
  const {
    patients,
    filteredPatients,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sexFilter,
    setSexFilter,
    currentPage,
    setCurrentPage,
    refetch,
  } = usePatients();

  // Modal state
  const [viewPatient, setViewPatient] = useState<Patient | null>(null);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [deletePatient, setDeletePatient] = useState<Patient | null>(null);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

  // Event handlers
  const handleView = (patient: Patient) => {
    setViewPatient(patient);
  };

  const handleEdit = (patient: Patient) => {
    setEditPatient(patient);
  };

  const handleDelete = (patient: Patient) => {
    setDeletePatient(patient);
  };

  const confirmDelete = () => {
    if (deletePatient) {
      // TODO: Implement actual delete API call
      console.log('Deleting patient:', deletePatient._id);
      setDeletePatient(null);
      refetch();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Loading patients...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8">
        <div className="flex items-center justify-center text-red-600">
          <AlertCircle className="h-8 w-8" />
          <span className="ml-2">Failed to load patients. Please try again.</span>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        {/* Filters */}
        <PatientFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sexFilter={sexFilter}
          setSexFilter={setSexFilter}
          onRefresh={refetch}
          totalPatients={patients.length}
          filteredCount={filteredPatients.length}
        />

        {/* Table */}
        {filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No patients found</div>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date of Birth
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPatients.map((patient) => (
                    <PatientTableRow
                      key={patient._id}
                      patient={patient}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPatients.length)} of {filteredPatients.length} results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <PatientModal
        patient={viewPatient}
        isOpen={!!viewPatient}
        onClose={() => setViewPatient(null)}
        mode="view"
      />

      <PatientModal
        patient={editPatient}
        isOpen={!!editPatient}
        onClose={() => setEditPatient(null)}
        mode="edit"
        onSave={(patient) => {
          // TODO: Implement save logic
          console.log('Saving patient:', patient);
          setEditPatient(null);
          refetch();
        }}
      />

      {/* Delete Confirmation Modal */}
      {deletePatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete {deletePatient.firstName} {deletePatient.lastName}? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletePatient(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientTable;
