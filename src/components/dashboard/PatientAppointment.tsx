"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { COLORS } from "@/constants/colors";
import MeetingButton from "@/components/MeetingButton";

// Types
export type AppointmentType = "physical" | "online";

export interface Appointment {
  id: string;
  patientName?: string;
  doctorName?: string;
  date: string;
  time: string;
  status: "pending" | "accepted" | "declined";
  meetLink: string;
}

// Dummy data
const DOCTORS: { id: string; name: string }[] = [
  { id: "d1", name: "Dr. Alice Johnson" },
  { id: "d2", name: "Dr. Brian Lee" },
  { id: "d3", name: "Dr. Clara Smith" },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "a1",
    date: "2025-08-12",
    time: "10:00",
    doctorName: "Dr. Alice Johnson",
    status: "accepted",
    meetLink: "https://meet.google.com/wdi-gstx-mfr",
  },
  {
    id: "a2",
    date: "2025-08-13",
    time: "14:30",
    doctorName: "Dr. Brian Lee", 
    status: "pending",
    meetLink: "https://meet.google.com/gmf-zvpp-giw",
  },
  {
    id: "a3",
    date: "2025-08-14",
    time: "09:15",
    doctorName: "Dr. Clara Smith",
    status: "declined",
    meetLink: "https://meet.google.com/wrf-vxng-rqf",
  },
];

export default function PatientAppointment() {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  // Form state
  const [type, setType] = useState<AppointmentType>("physical");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>(DOCTORS[0]?.id ?? "");

  const selectedDoctor = useMemo(() => DOCTORS.find((d) => d.id === doctorId), [doctorId]);

  const handleBook = () => {
    const formattedDate = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const newAppointment: Appointment = {
      id: `a-${Date.now()}`,
      date: formattedDate,
      time: time || "09:00",
      doctorName: selectedDoctor?.name || "Unknown Doctor",
      status: "pending",
      meetLink: "https://meet.google.com/mho-vdtz-ryg",
    };
    console.log("Booking appointment (dummy):", newAppointment);
    setAppointments((prev) => [newAppointment, ...prev]);
    // reset
    setType("physical");
    setDate(undefined);
    setTime("");
    setDoctorId(DOCTORS[0]?.id ?? "");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Book form */}
      <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Book a new appointment</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Type */}
          <div className="col-span-1">
            <Label className="mb-2">Appointment Type</Label>
            <RadioGroup value={type} onValueChange={(v) => setType(v as AppointmentType)} className="grid grid-cols-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="patient-type-physical" value="physical" />
                <Label htmlFor="patient-type-physical">Physical</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="patient-type-online" value="online" />
                <Label htmlFor="patient-type-online">Online</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Date & Time (shadcn Calendar + time input) */}
          <div className="col-span-1">
            <Label className="mb-2">Date</Label>
            <DatePicker selected={date} onSelect={setDate} className="w-full" />
          </div>
          <div className="col-span-1">
            <Label className="mb-2">Time</Label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          {/* Doctor */}
          <div className="col-span-1">
            <Label className="mb-2">Doctor</Label>
            <Select value={doctorId} onValueChange={setDoctorId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {DOCTORS.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-1 flex items-end">
            <Button onClick={handleBook} style={{ backgroundColor: COLORS.accent.primary }}>
              Book Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Appointments Table */}
      <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">My Appointments</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Doctor</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-4 px-4">{formatDate(appt.date)}</td>
                  <td className="py-4 px-4">{appt.time}</td>
                  <td className="py-4 px-4">{appt.doctorName}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        appt.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : appt.status === "declined"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <MeetingButton
                      meetLink={appt.meetLink}
                      disabled={appt.status !== "accepted"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No appointments found. Book your first appointment above.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
