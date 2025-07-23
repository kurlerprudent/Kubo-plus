// components/appointments/AppointmentFilters.tsx
import { motion } from "framer-motion";
import { Search, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusFilter } from "./types";

interface AppointmentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
  onNew: () => void;
}

export function AppointmentFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onNew,
}: AppointmentFiltersProps) {
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
            {(["Confirmed", "Pending", "Completed", "Cancelled"] as const).map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>
    </motion.div>
  );
}