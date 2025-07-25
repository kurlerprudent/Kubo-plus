"use client";

import React, { useState } from 'react';
import { MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { Patient } from '@/types/patient';

interface PatientTableRowProps {
  patient: Patient;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

const PatientTableRow: React.FC<PatientTableRowProps> = ({
  patient,
  onView,
  onEdit,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status?.toLowerCase()) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'inactive':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDOB = (dob: string) => {
    const date = new Date(dob);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleMenuAction = (action: 'view' | 'edit' | 'delete') => {
    setShowMenu(false);
    
    switch (action) {
      case 'view':
        onView(patient);
        break;
      case 'edit':
        onEdit(patient);
        break;
      case 'delete':
        onDelete(patient);
        break;
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {patient.firstName} {patient.lastName}
            </div>
            <div className="text-sm text-gray-500">{patient.email}</div>
          </div>
        </div>
      </td>
      
      <td className="py-4 px-6">
        <div className="text-sm text-gray-900">{patient.phoneNumber}</div>
      </td>
      
      <td className="py-4 px-6">
        <div className="text-sm text-gray-900">{formatDOB(patient.dateOfBirth)}</div>
      </td>
      
      <td className="py-4 px-6">
        <div className="text-sm text-gray-900 capitalize">
          {patient.gender.toLowerCase()}
        </div>
      </td>
      
      <td className="py-4 px-6">
        <span className={getStatusBadge(patient.status || 'Active')}>
          {patient.status || 'Active'}
        </span>
      </td>
      
      <td className="py-4 px-6">
        <div className="text-sm text-gray-900">
          {patient.lastVisit 
            ? new Date(patient.lastVisit).toLocaleDateString() 
            : 'No visits'
          }
        </div>
      </td>
      
      <td className="py-4 px-6 text-right relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="inline-flex items-center p-2 rounded-md hover:bg-gray-100"
        >
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="py-1">
              <button
                onClick={() => handleMenuAction('view')}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Eye className="h-4 w-4 mr-3" />
                View Details
              </button>
              <button
                onClick={() => handleMenuAction('edit')}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Edit className="h-4 w-4 mr-3" />
                Edit Patient
              </button>
              <button
                onClick={() => handleMenuAction('delete')}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-3" />
                Delete Patient
              </button>
            </div>
          </div>
        )}
        
        {/* Overlay to close menu when clicking outside */}
        {showMenu && (
          <div 
            className="fixed inset-0 z-5"
            onClick={() => setShowMenu(false)}
          />
        )}
      </td>
    </tr>
  );
};

export default PatientTableRow;
