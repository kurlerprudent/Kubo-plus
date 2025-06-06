// src/app/superadmin/reports/page.tsx
"use client";

import * as React from "react";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  Filter,
  RefreshCw,
  Search,
  Shield,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { SuperAdminAppSidebar } from "@/components/app-sidebar-superadmin";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";

type ReportType = "usage" | "audit" | "performance" | "security" | "billing";
type ReportStatus = "generated" | "pending" | "failed";

interface ReportItem {
  id: string;
  type: ReportType;
  period: string;
  generatedBy: string;
  status: ReportStatus;
  generatedAt: string;
  downloadUrl?: string;
}

// Mock data - replace with API calls
const mockReports: ReportItem[] = [
  {
    id: "RPT-001",
    type: "usage",
    period: "April 2025",
    generatedBy: "system@admin.com",
    status: "generated",
    generatedAt: "2025-04-11T14:30:00Z",
    downloadUrl: "#",
  },
  {
    id: "RPT-002",
    type: "audit",
    period: "Q1 2025",
    generatedBy: "admin@example.com",
    status: "pending",
    generatedAt: "2025-04-10T09:15:00Z",
  },
  {
    id: "RPT-003",
    type: "security",
    period: "March 2025",
    generatedBy: "system@admin.com",
    status: "failed",
    generatedAt: "2025-04-09T18:45:00Z",
  },
  // Add more mock entries...
];

export default function ReportsPage() {
  const [dateFilter, setDateFilter] = React.useState<Date | undefined>();
  const [typeFilter, setTypeFilter] = React.useState<Set<ReportType>>(new Set());
  const [statusFilter, setStatusFilter] = React.useState<Set<ReportStatus>>(new Set());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;

  // Filtering logic
  const filteredReports = mockReports.filter((report) => {
    const matchesDate = dateFilter
      ? format(new Date(report.generatedAt), "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd")
      : true;
    const matchesType = typeFilter.size > 0 ? typeFilter.has(report.type) : true;
    const matchesStatus = statusFilter.size > 0 ? statusFilter.has(report.status) : true;
    const matchesSearch = report.generatedBy.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDate && matchesType && matchesStatus && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle filters
  const toggleFilter = <T,>(setter: React.Dispatch<React.SetStateAction<Set<T>>>, value: T) => {
    setter((prevFilters) => {
      const newFilters = new Set(prevFilters);
      newFilters.has(value) ? newFilters.delete(value) : newFilters.add(value);
      return newFilters;
    });
    setCurrentPage(1);
  };

  return (
    <SidebarProvider>
      <SuperAdminAppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        {/* Header */}
        <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b px-4 md:px-6">
          <SidebarTrigger className="lg:hidden" />
          <Separator orientation="vertical" className="h-6 lg:hidden" />
          <Breadcrumb className="flex-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/superadmin-dashboard">SuperAdmin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <ScrollArea className="flex-1">
          <main className="p-4 md:p-6 space-y-6">
            {/* Header and Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">System Reports</h1>
                <p className="text-muted-foreground">Generated system reports and analytics</p>
              </div>
              <Button asChild>
                <Link href="/superadmin/reports/generate">
                  Generate New Report
                </Link>
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Type
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {["usage", "audit", "performance", "security", "billing"].map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={typeFilter.has(type as ReportType)}
                      onCheckedChange={() => toggleFilter(setTypeFilter, type as ReportType)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Status
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {["generated", "pending", "failed"].map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={statusFilter.has(status as ReportStatus)}
                      onCheckedChange={() => toggleFilter(setStatusFilter, status as ReportStatus)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full sm:w-auto justify-start text-left font-normal", 
                      !dateFilter && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DatePicker
                    mode="single"
                    selected={dateFilter}
                    onSelect={(date) => {
                      setDateFilter(date);
                      setCurrentPage(1);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Reports Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Report ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Generated By</TableHead>
                    <TableHead className="w-[140px]">Status</TableHead>
                    <TableHead className="w-[180px]">Generated At</TableHead>
                    <TableHead className="w-[120px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "capitalize",
                            report.type === "security" && "border-destructive text-destructive",
                            report.type === "audit" && "border-primary text-primary",
                            report.type === "usage" && "border-green-600 text-green-600"
                          )}
                        >
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{report.generatedBy}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "capitalize",
                            report.status === "generated" && "bg-success/20 text-success",
                            report.status === "pending" && "bg-warning/20 text-warning",
                            report.status === "failed" && "bg-destructive/20 text-destructive"
                          )}
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(report.generatedAt), "MMM dd, yyyy HH:mm")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={report.status !== "generated"}
                            className="h-8 px-2"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Showing {paginatedReports.length} of {filteredReports.length} reports
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </main>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}