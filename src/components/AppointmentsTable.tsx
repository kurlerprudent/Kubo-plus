// components/AppointmentsTable.tsx
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, FileDown } from 'lucide-react';

interface Appointment {
  id: number;
  date: Date | string;
  doctor: string;
  type: string;
  status: string;
}

interface AppointmentsTableProps {
  appointments?: Appointment[];
  isLoading: boolean;
}

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({ 
  appointments = [], 
  isLoading 
}) => {
  const handleView = (id: number) => {
    console.log(`View appointment ${id}`);
    // Implement view logic
  };

  const handleDelete = (id: number) => {
    console.log(`Delete appointment ${id}`);
    // Implement delete logic
  };

  const handleExport = () => {
    console.log('Export to CSV');
    // Implement export logic
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  const data = appointments.length > 0 ? appointments : [
    // ... mock data
  ];

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(appointment.date), 'MMM d, yyyy h:mm a')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.doctor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    appointment.status === 'Scheduled' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(appointment.id)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </Button>
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(appointment.id)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <Button 
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <FileDown className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>
    </div>
  );
};

export default AppointmentsTable;