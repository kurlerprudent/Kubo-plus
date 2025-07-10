
export interface Patient {
  id: string;
  name: string;
  contact: string;
  email: string;
  diseaseHistory: string;
  sex: 'Male' | 'Female' | 'Other';
  dob: string; // Date of birth in YYYY-MM-DD format
  status: 'Pending' | 'Completed' | 'Urgent';
}

// Sample patient data
 export const initialPatients: Patient[] = [
  { id: "CT-2024-0567", name: "John Doe", contact: "555-1234", email: "john.doe@example.com", diseaseHistory: "Diabetes, Hypertension, Asthma", sex: "Male", dob: "1980-05-15", status: "Pending" },
  { id: "CT-2024-0566", name: "Emma Wilson", contact: "555-5678", email: "emma.w@example.com", diseaseHistory: "Migraine, Arthritis", sex: "Female", dob: "1975-12-22", status: "Completed" },
  { id: "CT-2024-0565", name: "Michael Brown", contact: "555-9012", email: "m.brown@example.com", diseaseHistory: "Hypertension, GERD, Allergies", sex: "Male", dob: "1990-08-30", status: "Urgent" },
  { id: "CT-2024-0564", name: "Sarah Johnson", contact: "555-3456", email: "sarahj@example.com", diseaseHistory: "Asthma, Eczema", sex: "Female", dob: "1988-03-17", status: "Completed" },
  { id: "CT-2024-0563", name: "David Lee", contact: "555-7890", email: "d.lee@example.com", diseaseHistory: "Diabetes, High Cholesterol", sex: "Male", dob: "1972-11-05", status: "Pending" },
  { id: "CT-2024-0562", name: "Alex Chen", contact: "555-2345", email: "a.chen@example.com", diseaseHistory: "Anxiety, Depression", sex: "Other", dob: "1995-07-19", status: "Urgent" },
  { id: "CT-2024-0561", name: "Maria Garcia", contact: "555-6789", email: "mgarcia@example.com", diseaseHistory: "Osteoporosis, Arthritis", sex: "Female", dob: "1965-09-28", status: "Completed" },
  { id: "CT-2024-0560", name: "James Wilson", contact: "555-0123", email: "jwilson@example.com", diseaseHistory: "Hypertension, Sleep Apnea", sex: "Male", dob: "1983-01-14", status: "Pending" },
];