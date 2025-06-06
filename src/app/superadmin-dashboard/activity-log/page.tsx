// src/app/superadmin/activity-logs/page.tsx
"use client";

import * as React from "react";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  Filter,
  Shield,
  DatabaseZap,
  Search,
  SlidersHorizontal,
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

  // Reuse ActivityItem type from dashboard
  type ActivityItem = {
    id: number;
    type: "admin" | "system" | "security";
    description: string;
    timestamp: string;
    severity?: "low" | "medium" | "high";
    initiator?: string;
  };

  // Mock data - replace with API calls
  const mockActivities: ActivityItem[] = [
    {
      id: 1,
      type: "admin",
      description: "Created new admin account - admin_ops",
      timestamp: "2025-04-11T14:30:00Z",
      severity: "medium",
      initiator: "system@admin.com",
    },
    {
      id: 2,
      type: "system",
      description: "Database backup completed successfully",
      timestamp: "2025-04-11T11:00:00Z",
      severity: "low",
    },
    {
      id: 3,
      type: "security",
      description: "Failed login attempt detected for user 'root'",
      timestamp: "2025-04-10T22:15:00Z",
      severity: "high",
    },
    // Add more mock entries...
  ];

  export default function ActivityLogsPage() {
    const [dateFilter, setDateFilter] = React.useState<Date | undefined>();
    const [typeFilter, setTypeFilter] = React.useState<Set<ActivityItem["type"]>>(new Set());
    const [searchQuery, setSearchQuery] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    // Filtering logic
    const filteredActivities = mockActivities.filter((activity) => {
      const matchesDate = dateFilter
        ? format(new Date(activity.timestamp), "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd")
        : true;
      const matchesType = typeFilter.size > 0 ? typeFilter.has(activity.type) : true;
      const matchesSearch = activity.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDate && matchesType && matchesSearch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
    const paginatedActivities = filteredActivities.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    // Type filter toggle
    const toggleTypeFilter = (type: ActivityItem["type"]) => {
      const newFilters = new Set(typeFilter);
      newFilters.has(type) ? newFilters.delete(type) : newFilters.add(type);
      setTypeFilter(newFilters);
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
                  <BreadcrumbPage>Activity Logs</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {/* Main Content */}
          <ScrollArea className="flex-1">
            <main className="p-4 md:p-6 space-y-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search activities..."
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
                    {["admin", "system", "security"].map((type) => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        checked={typeFilter.has(type as ActivityItem["type"])}
                        onCheckedChange={() => toggleTypeFilter(type as ActivityItem["type"])}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
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

                <Button
                  variant="ghost"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setDateFilter(undefined);
                    setTypeFilter(new Set());
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>

              {/* Activity Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[150px]">Severity</TableHead>
                      <TableHead className="w-[180px]">Date & Time</TableHead>
                      <TableHead className="w-[200px]">Initiator</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "capitalize",
                              activity.type === "admin" && "border-primary text-primary",
                              activity.type === "system" && "border-blue-500 text-blue-500",
                              activity.type === "security" && "border-destructive text-destructive"
                            )}
                          >
                            {activity.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{activity.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "capitalize",
                              activity.severity === "high" && "bg-destructive/20 text-destructive",
                              activity.severity === "medium" && "bg-warning/20 text-warning",
                              activity.severity === "low" && "bg-success/20 text-success"
                            )}
                          >
                            {activity.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(new Date(activity.timestamp), "MMM dd, yyyy HH:mm")}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {activity.initiator || "System"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Showing {paginatedActivities.length} of {filteredActivities.length} results
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