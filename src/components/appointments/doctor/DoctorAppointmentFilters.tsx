// components/appointments/doctor/DoctorAppointmentFilters.tsx
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { DoctorAppointmentStatusFilter } from "./types";

interface DoctorAppointmentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: DoctorAppointmentStatusFilter;
  setStatusFilter: (status: DoctorAppointmentStatusFilter) => void;
  onNew?: () => void;
}

export function DoctorAppointmentFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onNew,
}: DoctorAppointmentFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search appointments..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              {statusFilter}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("All")}>
              All Statuses
            </DropdownMenuItem>
            {(["Pending", "Scheduled", "Declined"] as const).map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {onNew && (
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onNew}
          >
            New Slot
          </Button>
        )}
      </div>
    </motion.div>
  );
}