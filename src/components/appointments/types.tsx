// components/appointments/types.ts
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export type Status = "Confirmed" | "Pending" | "Completed" | "Cancelled";
export type StatusFilter = Status | "All";

export interface Appointment {
  id: number;
  doctor: string;
  date: string;
  time: string;
  type: string;
  status: Status;
  location: string;
  notes?: string;
  duration: string;
}

export const statusConfig = {
  Confirmed: {
    class: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: <CheckCircle2 className="h-4 w-4 mr-2" />,
  },
  Pending: {
    class: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: <Clock className="h-4 w-4 mr-2" />,
  },
  Completed: {
    class: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: <CheckCircle2 className="h-4 w-4 mr-2" />,
  },
  Cancelled: {
    class: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: <XCircle className="h-4 w-4 mr-2" />,
  },
};