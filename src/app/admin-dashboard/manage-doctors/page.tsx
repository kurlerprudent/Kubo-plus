"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminAppSidebar } from "@/components/app-sidebar-admin";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Upload,
  Download,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Doctor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  qualifications: string;
  yearsOfExperience: number;
  bio: string;
  createdAt: string;
};

export default function ManageDoctors() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Doctor;
    direction: "asc" | "desc";
  } | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Sample data - replace with API call
  useEffect(() => {
    // Simulated API call
    const mockDoctors: Doctor[] = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        specialization: "Cardiology",
        qualifications: "MD, PhD",
        yearsOfExperience: 10,
        bio: "Senior cardiologist with extensive experience...",
        createdAt: "2023-01-15",
      },
      {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "+1 987 654 321",
        specialization: "Neurology",
        qualifications: "MD, MSc",
        yearsOfExperience: 8,
        bio: "Neurology specialist with research background...",
        createdAt: "2023-03-22",
      },
    ];
    setDoctors(mockDoctors);
  }, []);

  const sortedDoctors = useMemo(() => {
    if (!sortConfig) return doctors;

    return [...doctors].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, [doctors, sortConfig]);

  const handleSort = (key: keyof Doctor) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // --- Export to CSV Function ---
  const exportToCSV = () => {
    // Create CSV header and content
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Specialization",
      "Qualifications",
      "Experience",
      "Bio",
      "Created At",
    ];
    const csvContent = [
      headers.join(","),
      ...sortedDoctors.map((doctor) =>
        [
          `"${doctor.firstName}"`,
          `"${doctor.lastName}"`,
          `"${doctor.email}"`,
          `"${doctor.phone}"`,
          `"${doctor.specialization}"`,
          `"${doctor.qualifications}"`,
          doctor.yearsOfExperience,
          `"${doctor.bio}"`,
          `"${doctor.createdAt}"`,
        ].join(",")
      ),
    ].join("\n");

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `doctors_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SidebarProvider>
      <AdminAppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin-dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Manage Doctors</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">Doctors Management</h1>
            {/* CSV Export Button */}
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={exportToCSV}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="add" className="space-y-4">
            <TabsList className="bg-blue-50">
              <TabsTrigger value="add" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Doctor
              </TabsTrigger>
              <TabsTrigger value="bulk" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Upload className="mr-2 h-4 w-4" /> Bulk Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="add" className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-50">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" className="bg-blue-50 border-blue-100" />
                    <Input placeholder="Last Name" className="bg-blue-50 border-blue-100" />
                    <Input placeholder="Email" type="email" className="bg-blue-50 border-blue-100" />
                    <Input placeholder="Phone" className="bg-blue-50 border-blue-100" />
                    <Input placeholder="Specialization" className="bg-blue-50 border-blue-100" />
                    <Input placeholder="Qualifications" className="bg-blue-50 border-blue-100" />
                    <Input placeholder="Years of Experience" type="number" className="bg-blue-50 border-blue-100" />
                    <Input placeholder="Bio" className="bg-blue-50 border-blue-100" />
                  </div>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                    Add Doctor
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="bulk">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-50">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-blue-400" />
                    <div className="mt-4">
                      <Button variant="outline" className="bg-blue-50 border-blue-200 text-blue-600">
                        Select CSV File
                      </Button>
                      <p className="mt-2 text-sm text-slate-500">Upload a CSV file with doctor details</p>
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                    Upload and Process
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Doctors Table */}
          <div className="bg-white rounded-lg shadow-sm border border-blue-50">
            <ScrollArea className="w-full overflow-x-auto">
              <Table className="min-w-[800px] table-auto">
                <TableHeader className="bg-blue-50">
                  <TableRow>
                    {/* First Column (sticky) */}
                    <TableHead
                      className="text-blue-600 font-semibold sticky left-0 z-10"
                      style={{ minWidth: "150px" }}
                    >
                      <button onClick={() => handleSort("firstName")} className="flex items-center">
                        First Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    {/* Second Column (sticky with offset) */}
                    <TableHead
                      className="text-blue-600 font-semibold sticky z-10"
                      style={{ minWidth: "150px", left: "150px" }}
                    >
                      <button onClick={() => handleSort("lastName")} className="flex items-center">
                        Last Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold">
                      <button onClick={() => handleSort("email")} className="flex items-center">
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold">Phone</TableHead>
                    <TableHead className="text-blue-600 font-semibold">
                      <button onClick={() => handleSort("specialization")} className="flex items-center">
                        Specialization
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold">Qualifications</TableHead>
                    <TableHead className="text-blue-600 font-semibold">
                      <button onClick={() => handleSort("yearsOfExperience")} className="flex items-center">
                        Experience
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedDoctors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No doctors found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedDoctors.map((doctor) => (
                      <TableRow key={doctor.id} className="hover:bg-blue-50/50">
                        {/* First Column (sticky) */}
                        <TableCell
                          className="font-medium sticky left-0 bg-white"
                          style={{ minWidth: "150px" }}
                        >
                          {doctor.firstName}
                        </TableCell>
                        {/* Second Column (sticky with offset) */}
                        <TableCell
                          className="sticky bg-white"
                          style={{ minWidth: "150px", left: "150px" }}
                        >
                          {doctor.lastName}
                        </TableCell>
                        <TableCell>{doctor.email}</TableCell>
                        <TableCell>{doctor.phone}</TableCell>
                        <TableCell>{doctor.specialization}</TableCell>
                        <TableCell>{doctor.qualifications}</TableCell>
                        <TableCell>{doctor.yearsOfExperience} years</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="text-green-600 focus:bg-green-50">
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 focus:bg-red-50">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
