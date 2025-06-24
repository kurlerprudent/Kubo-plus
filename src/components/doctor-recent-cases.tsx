"use client";
import { initialPatients, Patient } from '@/constants/patients-data';
import React, { useState } from 'react';

// Define color constants from your palette
const COLORS = {
  primaryBtn: "#00FF9C",
  primaryBtnHover: "#B6FFA1",
  textColor: "#26355D",
  textColorSecondary: "#6B7280",
  background1: "#F2F2F2",
  background2: "#F5F5F5",
  background3: "#F2EFE7",
};



const EnhancedPatientTable = () => {
  // State management
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sexFilter, setSexFilter] = useState<string>("All");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [viewPatient, setViewPatient] = useState<Patient | null>(null);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [deletePatient, setDeletePatient] = useState<Patient | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination calculations
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

  // Handle search and filtering
  const handleSearchAndFilter = () => {
    let result = initialPatients;
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(patient => 
        patient.name.toLowerCase().includes(term) ||
        patient.id.toLowerCase().includes(term) ||
        patient.email.toLowerCase().includes(term) ||
        patient.contact.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter(patient => patient.status === statusFilter);
    }
    
    // Apply sex filter
    if (sexFilter !== "All") {
      result = result.filter(patient => patient.sex === sexFilter);
    }
    
    setFilteredPatients(result);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Handle actions
  const handleView = (patient: Patient) => {
    setViewPatient(patient);
    setOpenMenuId(null);
  };

  const handleEdit = (patient: Patient) => {
    setEditPatient(patient);
    setOpenMenuId(null);
  };

  const handleDelete = (patient: Patient) => {
    setDeletePatient(patient);
    setOpenMenuId(null);
  };

  const confirmDelete = () => {
    if (deletePatient) {
      setPatients(patients.filter(p => p.id !== deletePatient.id));
      setFilteredPatients(filteredPatients.filter(p => p.id !== deletePatient.id));
      setDeletePatient(null);
    }
  };

  // Shorten disease history for display
  const shortenDiseaseHistory = (history: string) => {
    if (history.length > 30) {
      return history.substring(0, 30) + '...';
    }
    return history;
  };

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Urgent':
        return 'bg-amber-100 text-amber-800';
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date of birth
  const formatDOB = (dob: string) => {
    const date = new Date(dob);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Close all dialogs
  const closeAllDialogs = () => {
    setViewPatient(null);
    setEditPatient(null);
    setDeletePatient(null);
  };

  // Apply filters when search term or filters change
  React.useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm, statusFilter, sexFilter]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4" style={{ backgroundColor: COLORS.background3 }}>
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 rounded-xl" style={{ backgroundColor: COLORS.background2 }}>
        <div className="w-[20%]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              style={{ backgroundColor: COLORS.background1 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.textColorSecondary }}>Status</label>
            <select
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              style={{ backgroundColor: COLORS.background1 }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: COLORS.textColorSecondary }}>Sex</label>
            <select
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              style={{ backgroundColor: COLORS.background1 }}
              value={sexFilter}
              onChange={(e) => setSexFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold" style={{ color: COLORS.textColor }}>Patient Management</h2>
          <p className="text-sm" style={{ color: COLORS.textColorSecondary }}>Manage patient records and information</p>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200" style={{ backgroundColor: COLORS.background1 }}>
                <th className="sticky left-0 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider z-10" style={{ backgroundColor: COLORS.background1, color: COLORS.textColorSecondary }}>Patient ID</th>
                <th className="sticky left-20 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider z-10" style={{ backgroundColor: COLORS.background1, color: COLORS.textColorSecondary }}>Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textColorSecondary }}>Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textColorSecondary }}>Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textColorSecondary }}>Disease History</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textColorSecondary }}>Sex</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textColorSecondary }}>DOB</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textColorSecondary }}>Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textColorSecondary }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentPatients.length > 0 ? (
                currentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-indigo-50/50">
                    <td className="sticky left-0 px-4 py-3 whitespace-nowrap text-sm font-medium z-10" style={{ backgroundColor: 'inherit', color: COLORS.textColor }}>{patient.id}</td>
                    <td className="sticky left-20 px-4 py-3 whitespace-nowrap text-sm font-medium z-10" style={{ backgroundColor: 'inherit', color: COLORS.textColor }}>{patient.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm" style={{ color: COLORS.textColorSecondary }}>{patient.contact}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm" style={{ color: COLORS.textColorSecondary }}>{patient.email}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: COLORS.textColorSecondary }}>{shortenDiseaseHistory(patient.diseaseHistory)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm" style={{ color: COLORS.textColorSecondary }}>{patient.sex}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm" style={{ color: COLORS.textColorSecondary }}>{formatDOB(patient.dob)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === patient.id ? null : patient.id)}
                          className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>
                        
                        {openMenuId === patient.id && (
                          <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                            <div className="py-1">
                              <button
                                onClick={() => handleView(patient)}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                style={{ color: COLORS.textColor }}
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => handleEdit(patient)}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                style={{ color: COLORS.textColor }}
                              >
                                Edit Patient
                              </button>
                              <button
                                onClick={() => handleDelete(patient)}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-sm" style={{ color: COLORS.textColorSecondary }}>
                    No patients found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="text-sm" style={{ color: COLORS.textColorSecondary }}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPatients.length)} of {filteredPatients.length} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              style={{ color: COLORS.textColor }}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${currentPage === page ? 'font-bold' : 'hover:bg-gray-100'}`}
                style={{ 
                  color: currentPage === page ? '#fff' : COLORS.textColor,
                  backgroundColor: currentPage === page ? COLORS.primaryBtn : 'transparent'
                }}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              style={{ color: COLORS.textColor }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Patient Dialog */}
      {viewPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold" style={{ color: COLORS.textColor }}>Patient Details</h3>
                <button onClick={() => setViewPatient(null)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2" style={{ color: COLORS.textColor }}>Personal Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm" style={{ color: COLORS.textColorSecondary }}>Patient ID:</span>
                      <p style={{ color: COLORS.textColor }}>{viewPatient.id}</p>
                    </div>
                    <div>
                      <span className="text-sm" style={{ color: COLORS.textColorSecondary }}>Full Name:</span>
                      <p style={{ color: COLORS.textColor }}>{viewPatient.name}</p>
                    </div>
                    <div>
                      <span className="text-sm" style={{ color: COLORS.textColorSecondary }}>Date of Birth:</span>
                      <p style={{ color: COLORS.textColor }}>{formatDOB(viewPatient.dob)}</p>
                    </div>
                    <div>
                      <span className="text-sm" style={{ color: COLORS.textColorSecondary }}>Sex:</span>
                      <p style={{ color: COLORS.textColor }}>{viewPatient.sex}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2" style={{ color: COLORS.textColor }}>Contact Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm" style={{ color: COLORS.textColorSecondary }}>Phone:</span>
                      <p style={{ color: COLORS.textColor }}>{viewPatient.contact}</p>
                    </div>
                    <div>
                      <span className="text-sm" style={{ color: COLORS.textColorSecondary }}>Email:</span>
                      <p style={{ color: COLORS.textColor }}>{viewPatient.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="font-medium mb-2" style={{ color: COLORS.textColor }}>Medical Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm" style={{ color: COLORS.textColorSecondary }}>Disease History:</span>
                      <p style={{ color: COLORS.textColor }}>{viewPatient.diseaseHistory}</p>
                    </div>
                    <div>
                      <span className="text-sm" style={{ color: COLORS.textColorSecondary }}>Status:</span>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(viewPatient.status)}`}>
                        {viewPatient.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setViewPatient(null)} 
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ 
                    backgroundColor: COLORS.primaryBtn,
                    color: COLORS.textColor,
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Patient Dialog */}
      {editPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold" style={{ color: COLORS.textColor }}>Edit Patient Information</h3>
                <button onClick={() => setEditPatient(null)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textColor }}>Full Name</label>
                  <input
                    type="text"
                    value={editPatient.name}
                    onChange={(e) => setEditPatient({...editPatient, name: e.target.value})}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    style={{ backgroundColor: COLORS.background1 }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textColor }}>Contact</label>
                  <input
                    type="text"
                    value={editPatient.contact}
                    onChange={(e) => setEditPatient({...editPatient, contact: e.target.value})}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    style={{ backgroundColor: COLORS.background1 }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textColor }}>Email</label>
                  <input
                    type="email"
                    value={editPatient.email}
                    onChange={(e) => setEditPatient({...editPatient, email: e.target.value})}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    style={{ backgroundColor: COLORS.background1 }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textColor }}>Date of Birth</label>
                  <input
                    type="date"
                    value={editPatient.dob}
                    onChange={(e) => setEditPatient({...editPatient, dob: e.target.value})}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    style={{ backgroundColor: COLORS.background1 }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textColor }}>Sex</label>
                  <select
                    value={editPatient.sex}
                    onChange={(e) => setEditPatient({...editPatient, sex: e.target.value as any})}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    style={{ backgroundColor: COLORS.background1 }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textColor }}>Status</label>
                  <select
                    value={editPatient.status}
                    onChange={(e) => setEditPatient({...editPatient, status: e.target.value as any})}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    style={{ backgroundColor: COLORS.background1 }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textColor }}>Disease History</label>
                  <textarea
                    value={editPatient.diseaseHistory}
                    onChange={(e) => setEditPatient({...editPatient, diseaseHistory: e.target.value})}
                    rows={3}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    style={{ backgroundColor: COLORS.background1 }}
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button 
                  onClick={() => setEditPatient(null)} 
                  className="px-4 py-2 rounded-lg font-medium border border-gray-300"
                  style={{ 
                    backgroundColor: COLORS.background1,
                    color: COLORS.textColor,
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setPatients(patients.map(p => p.id === editPatient.id ? editPatient : p));
                    setFilteredPatients(filteredPatients.map(p => p.id === editPatient.id ? editPatient : p));
                    setEditPatient(null);
                  }}
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ 
                    backgroundColor: COLORS.primaryBtn,
                    color: COLORS.textColor,
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deletePatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold" style={{ color: COLORS.textColor }}>Confirm Deletion</h3>
                <button onClick={() => setDeletePatient(null)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="mb-6" style={{ color: COLORS.textColorSecondary }}>
                Are you sure you want to delete the patient record for <span className="font-semibold" style={{ color: COLORS.textColor }}>{deletePatient.name}</span>? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setDeletePatient(null)} 
                  className="px-4 py-2 rounded-lg font-medium border border-gray-300"
                  style={{ 
                    backgroundColor: COLORS.background1,
                    color: COLORS.textColor,
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Delete Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedPatientTable;