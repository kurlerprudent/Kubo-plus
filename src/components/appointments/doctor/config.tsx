// components/appointments/doctor/config.ts
import { CheckCircle2, Clock, XCircle, Video, User, Calendar } from "lucide-react";

export const statusConfig = {
  Pending: {
    class: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: <Clock className="h-4 w-4 mr-2" />,
    color: "amber",
  },
  Scheduled: {
    class: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: <CheckCircle2 className="h-4 w-4 mr-2" />,
    color: "emerald",
  },
  Declined: {
    class: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
    icon: <XCircle className="h-4 w-4 mr-2" />,
    color: "rose",
  },
};

export const actionIcons = {
  schedule: <Calendar className="h-4 w-4 mr-2" />,
  decline: <XCircle className="h-4 w-4 mr-2" />,
  details: <User className="h-4 w-4 mr-2" />,
  join: <Video className="h-4 w-4 mr-2" />,
};