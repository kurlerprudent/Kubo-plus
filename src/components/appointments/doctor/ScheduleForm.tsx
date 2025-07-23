// components/appointments/doctor/ScheduleForm.tsx
"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";

interface ScheduleFormProps {
  appointmentId: number;
  onSchedule: (date: string, time: string) => void;
  onCancel: () => void;
}

export function ScheduleForm({ appointmentId, onSchedule, onCancel }: ScheduleFormProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && time) {
      onSchedule(date, time);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Schedule Appointment</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onCancel}
          className="h-6 w-6 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes for Patient (Optional)</Label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Add any special instructions..."
        />
      </div>
      
      <div className="flex gap-2">
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Confirm Schedule
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </motion.form>
  );
}