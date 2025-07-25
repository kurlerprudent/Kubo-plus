"use client";

import React from 'react';
import { X, User, Mail, Phone, Calendar, UserCheck, MapPin } from 'lucide-react';
import { Patient } from '@/types/patient';

interface PatientModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit';
  onSave?: (patient: Patient) => void;
}

const PatientModal: React.FC<PatientModalProps> = ({
  patient,
  isOpen,
  onClose,
  mode,
  onSave,
}) => {
  if (!isOpen || !patient) return null;

  const formatDOB = (dob: string) => {
    const date = new Date(dob);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
              {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {mode === 'view' ? 'Patient Details' : 'Edit Patient'}
              </h2>
              <p className="text-gray-500">
                {patient.firstName} {patient.lastName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'view' ? (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{patient.firstName} {patient.lastName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{patient.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{patient.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{formatDOB(patient.dateOfBirth)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <UserCheck className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium capitalize">{patient.gender.toLowerCase()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 text-gray-400">●</div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="mt-1">
                      <span className={getStatusBadge(patient.status || 'Active')}>
                        {patient.status || 'Active'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Last Visit</p>
                    <p className="font-medium">
                      {patient.lastVisit 
                        ? new Date(patient.lastVisit).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'No visits recorded'
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-medium">{patient.condition || 'Not specified'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="font-medium">
                      {new Date(patient.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">
                      {new Date(patient.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Edit mode - simplified for now
            <div className="space-y-4">
              <p className="text-gray-600">
                Edit functionality would be implemented here with form fields.
              </p>
              <p className="text-sm text-gray-500">
                This would include form validation, API calls for updates, etc.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {mode === 'view' ? 'Close' : 'Cancel'}
          </button>
          {mode === 'edit' && (
            <button
              onClick={() => onSave?.(patient)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
