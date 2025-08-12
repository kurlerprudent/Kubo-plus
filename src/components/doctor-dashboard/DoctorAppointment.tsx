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

export type AppointmentType = "physical" | "online";

export interface DoctorAppt {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: "pending" | "accepted" | "declined";
  meetLink: string;
}

// Dummy data
const PATIENTS: { id: string; name: string }[] = [
  { id: "p1", name: "Alex Johnson" },
  { id: "p2", name: "Maria Gonzalez" },
  { id: "p3", name: "Li Wei" },
];

const DOCTORS: { id: string; name: string }[] = [
  { id: "d1", name: "Dr. Alice Johnson" },
  { id: "d2", name: "Dr. Brian Lee" },
  { id: "d3", name: "Dr. Clara Smith" },
];

const INITIAL_REQUESTS: DoctorAppt[] = [
  {
    id: "r1",
    patientId: "p1",
    patientName: "Alex Johnson",
    date: "2025-08-12",
    time: "10:30",
    status: "pending",
    meetLink: "https://meet.google.com/jhx-fzhn-eqt",
  },
  {
    id: "r2",
    patientId: "p2",
    patientName: "Maria Gonzalez",
    date: "2025-08-13",
    time: "15:00",
    status: "accepted",
    meetLink: "https://meet.google.com/xff-iokt-xgi",
  },
  {
    id: "r3",
    patientId: "p3",
    patientName: "Li Wei",
    date: "2025-08-14",
    time: "09:00",
    status: "declined",
    meetLink: "https://meet.google.com/uzw-nzbx-aos",
  },
];

export default function DoctorAppointment() {
  const [requests, setRequests] = useState<DoctorAppt[]>(INITIAL_REQUESTS);

  // Availability
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Booking form
  const [selPatientId, setSelPatientId] = useState(PATIENTS[0]?.id ?? "");
  const [selDoctorId, setSelDoctorId] = useState(DOCTORS[0]?.id ?? "");
  const [type, setType] = useState<AppointmentType>("physical");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");

  const selPatient = useMemo(() => PATIENTS.find((p) => p.id === selPatientId), [selPatientId]);
  const selDoctor = useMemo(() => DOCTORS.find((d) => d.id === selDoctorId), [selDoctorId]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  const accept = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "accepted",
              meetLink: r.meetLink || "https://meet.google.com/wdi-gstx-mfr",
            }
          : r
      )
    );
  };

  const decline = (id: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "declined" } : r)));
  };

  const saveAvailability = () => {
    console.log("Saving availability (dummy)", { startTime, endTime });
  };

  const bookAppt = () => {
    const formattedDate = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const created: DoctorAppt = {
      id: `d-${Date.now()}`,
      patientId: selPatientId,
      patientName: selPatient?.name || "Unknown",
      date: formattedDate,
      time: time || "09:00",
      status: "pending",
      meetLink: "https://meet.google.com/gmf-zvpp-giw",
    };
    console.log("Doctor creating appointment (dummy)", { created, withDoctor: selDoctor });
    setRequests((prev) => [created, ...prev]);

    // reset
    setSelPatientId(PATIENTS[0]?.id ?? "");
    setSelDoctorId(DOCTORS[0]?.id ?? "");
    setType("physical");
    setDate(undefined);
    setTime("");
  };

  return (
    <div className="space-y-8">
      {/* Availability */}
      <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Set availability</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label className="mb-2">Start time</Label>
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div>
            <Label className="mb-2">End time</Label>
            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <div className="flex items-end">
            <Button onClick={saveAvailability} style={{ backgroundColor: COLORS.accent.primary }}>
              Save
            </Button>
          </div>
        </div>
      </section>

      {/* Create appointment */}
      <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Book an appointment</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-2">Patient</Label>
            <Select value={selPatientId} onValueChange={setSelPatientId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {PATIENTS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2">Another Doctor (optional)</Label>
            <Select value={selDoctorId} onValueChange={setSelDoctorId}>
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

          <div>
            <Label className="mb-2">Type</Label>
            <RadioGroup value={type} onValueChange={(v) => setType(v as AppointmentType)} className="grid grid-cols-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="doc-type-physical" value="physical" />
                <Label htmlFor="doc-type-physical">Physical</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="doc-type-online" value="online" />
                <Label htmlFor="doc-type-online">Online</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="mb-2">Date</Label>
            <DatePicker selected={date} onSelect={setDate} className="w-full" />
          </div>
          <div>
            <Label className="mb-2">Time</Label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          <div className="md:col-span-2 flex items-end">
            <Button onClick={bookAppt} style={{ backgroundColor: COLORS.accent.primary }}>
              Book Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Requests table */}
      <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Patient Appointment Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Patient</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-4 px-4">{formatDate(r.date)}</td>
                  <td className="py-4 px-4">{r.time}</td>
                  <td className="py-4 px-4">{r.patientName}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        r.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : r.status === "declined"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {r.status === "pending" ? (
                        <>
                          <Button 
                            size="sm" 
                            style={{ backgroundColor: COLORS.status.success }} 
                            onClick={() => accept(r.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            style={{ backgroundColor: COLORS.status.error }}
                            onClick={() => decline(r.id)}
                          >
                            Decline
                          </Button>
                        </>
                      ) : r.status === "accepted" ? (
                        <MeetingButton
                          meetLink={r.meetLink}
                          disabled={false}
                        />
                      ) : (
                        <span className="text-sm text-gray-500">No action available</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No appointment requests found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
