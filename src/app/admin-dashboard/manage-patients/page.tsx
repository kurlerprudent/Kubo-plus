"use client"

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
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  assignedDoctor?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
};

export default function ManagePatients() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Patient; direction: 'asc' | 'desc' } | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  // Sample data - replace with an API call in production
  useEffect(() => {
    const mockPatients: Patient[] = [
      {
        id: "1",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.j@example.com",
        phone: "+1 555 123 4567",
        dateOfBirth: "1985-03-15",
        gender: "Female",
        address: "123 Main St, City",
        assignedDoctor: {
          id: "d1",
          firstName: "John",
          lastName: "Doe"
        },
        createdAt: "2023-01-10"
      },
      {
        id: "2",
        firstName: "Michael",
        lastName: "Chen",
        email: "michael.c@example.com",
        phone: "+1 555 987 6543",
        dateOfBirth: "1992-07-22",
        gender: "Male",
        address: "456 Oak Ave, Town",
        createdAt: "2023-02-20"
      },
    ];
    setPatients(mockPatients);
  }, []);

  const sortedPatients = useMemo(() => {
    if (!sortConfig) return patients;
    
    return [...patients].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      // Special handling for assignedDoctor (sort by full name)
      if (sortConfig.key === 'assignedDoctor') {
        const aName = a.assignedDoctor ? `${a.assignedDoctor.lastName} ${a.assignedDoctor.firstName}` : '';
        const bName = b.assignedDoctor ? `${b.assignedDoctor.lastName} ${b.assignedDoctor.firstName}` : '';
        return sortConfig.direction === 'asc' 
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [patients, sortConfig]);

  const handleSort = (key: keyof Patient) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const exportToCSV = () => {
    const csvContent = [
      ['First Name', 'Last Name', 'Email', 'Phone', 'Date of Birth', 'Gender', 'Address', 'Assigned Doctor', 'Created At'],
      ...sortedPatients.map(patient => [
        `"${patient.firstName}"`,
        `"${patient.lastName}"`,
        `"${patient.email}"`,
        `"${patient.phone}"`,
        `"${patient.dateOfBirth}"`,
        `"${patient.gender}"`,
        `"${patient.address}"`,
        patient.assignedDoctor ? `"${patient.assignedDoctor.firstName} ${patient.assignedDoctor.lastName}"` : '',
        `"${patient.createdAt}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `patients_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
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
                <BreadcrumbPage>Manage Patients</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">Patients Management</h1>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
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
                <Plus className="mr-2 h-4 w-4" /> Add Patient
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
                    <Input placeholder="Date of Birth" type="date" className="bg-blue-50 border-blue-100" />
                    <Input placeholder="Gender" className="bg-blue-50 border-blue-100" />
                    <Input placeholder="Address" className="bg-blue-50 border-blue-100" />
                    <Input placeholder="Assigned Doctor ID" className="bg-blue-50 border-blue-100" />
                  </div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Add Patient
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
                      <p className="mt-2 text-sm text-slate-500">
                        Upload a CSV file with patient details
                      </p>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                    Upload and Process
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Patients Table */}
          <div className="bg-white rounded-lg shadow-sm border border-blue-50">
            {/* The ScrollArea here makes only the table scroll horizontally */}
            <ScrollArea className="w-full overflow-x-auto">
              <Table className="min-w-[1000px] table-auto">
                <TableHeader className="bg-blue-50">
                  <TableRow>
                    {/* First Column (sticky) */}
                    <TableHead
                      className="text-blue-600 font-semibold sticky left-0 z-10"
                      style={{ minWidth: "150px", background: "#F8FAFC" }}  
                    >
                      <button onClick={() => handleSort('firstName')} className="flex items-center">
                        First Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    {/* Second Column (sticky with offset) */}
                    <TableHead
                      className="text-blue-600 font-semibold sticky z-10"
                      style={{ minWidth: "150px", left: "150px", background: "#F8FAFC" }}
                    >
                      <button onClick={() => handleSort('lastName')} className="flex items-center">
                        Last Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold">
                      <button onClick={() => handleSort('email')} className="flex items-center">
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold">Phone</TableHead>
                    <TableHead className="text-blue-600 font-semibold">
                      <button onClick={() => handleSort('dateOfBirth')} className="flex items-center">
                        Date of Birth
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold">Gender</TableHead>
                    <TableHead className="text-blue-600 font-semibold">Address</TableHead>
                    <TableHead className="text-blue-600 font-semibold">
                      <button onClick={() => handleSort('assignedDoctor')} className="flex items-center">
                        Assigned Doctor
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        No patients found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedPatients.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-blue-50/50">
                        {/* First Column (sticky) */}
                        <TableCell
                          className="font-medium sticky left-0 bg-white"
                          style={{ minWidth: "150px" }}
                        >
                          {patient.firstName}
                        </TableCell>
                        {/* Second Column (sticky with offset) */}
                        <TableCell
                          className="sticky bg-white"
                          style={{ minWidth: "150px", left: "150px" }}
                        >
                          {patient.lastName}
                        </TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell>{new Date(patient.dateOfBirth).toLocaleDateString()}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.address}</TableCell>
                        <TableCell>
                          {patient.assignedDoctor 
                            ? `${patient.assignedDoctor.firstName} ${patient.assignedDoctor.lastName}`
                            : 'Unassigned'}
                        </TableCell>
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
                              <DropdownMenuItem className="text-blue-600 focus:bg-blue-50">
                                Assign Doctor
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
