// pages/admin/activity-log.tsx
"use client"

import { useState, useMemo, useEffect, useCallback } from "react";
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
import {
  ArrowUpDown,
  MoreHorizontal,
  Download,
  Calendar,
  Filter,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DatePicker } from '@/components/ui/date-picker'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Activity = {
  id: string;
  timestamp: Date;
  user: {
    id: string;
    name: string;
    role: string;
    email?: string;
  };
  actionType: string;
  description: string;
  ipAddress: string;
  device?: string;
  location?: string;
};

interface DatePickerProps {
    selected?: Date;
    onChange: (date: Date | null) => void;
    placeholderText?: string;
    className?: string;
    disabled?: boolean;
  }

export default function ActivityLog() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Activity; direction: 'asc' | 'desc' } | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const fetchActivities = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulated API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API call
      const mockData = {
        activities: [
          {
            id: "1",
            timestamp: new Date("2024-03-15T09:30:00"),
            user: { id: "u1", name: "Admin User", role: "ADMIN", email: "admin@example.com" },
            actionType: "LOGIN",
            description: "Successful login",
            ipAddress: "192.168.1.1",
            device: "Chrome 122, Windows 10",
            location: "New York, US"
          },
          // ... more mock entries
        ],
        total: 25
      };

      setActivities(mockData.activities);
      setTotalPages(Math.ceil(mockData.total / pageSize));
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities, currentPage]);

  const sortedActivities = useMemo(() => {
    let filtered = [...activities];

    // Filters implementation
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity.timestamp);
        return (
          (!dateRange.start || activityDate >= dateRange.start) &&
          (!dateRange.end || activityDate <= dateRange.end)
        );
      });
    }

    if (actionFilter !== "all") {
      filtered = filtered.filter(activity => 
        activity.actionType === actionFilter
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(activity =>
        activity.description.toLowerCase().includes(query) ||
        activity.user.name.toLowerCase().includes(query) ||
        activity.ipAddress.includes(query)
      );
    }

    // Sorting
    if (!sortConfig) return filtered;
    
    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.key === 'timestamp') {
        return sortConfig.direction === 'asc' 
          ? a.timestamp.getTime() - b.timestamp.getTime()
          : b.timestamp.getTime() - a.timestamp.getTime();
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [activities, sortConfig, dateRange, actionFilter, searchQuery]);

  const handleSort = (key: keyof Activity) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Role', 'Action Type', 'Description', 'IP Address', 'Device', 'Location'],
      ...sortedActivities.map(activity => [
        `"${activity.timestamp.toISOString()}"`,
        `"${activity.user.name}"`,
        `"${activity.user.role}"`,
        `"${activity.actionType}"`,
        `"${activity.description}"`,
        `"${activity.ipAddress}"`,
        `"${activity.device}"`,
        `"${activity.location}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `activity_log_${new Date().toISOString().slice(0,10)}.csv`);
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
                <BreadcrumbPage>Activity Log</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">System Activity Log</h1>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={exportToCSV}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Export CSV
            </Button>
          </div>

          {/* Filters Section */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-slate-500">Date Range:</span>
              <span className="text-slate-500">to</span>
              <DatePicker
                selected={dateRange.start}
                onSelect={(date) => setDateRange(prev => ({ ...prev, start: date }))}
                placeholder="Start Date"
                className="bg-white border-blue-100"
                disabled={isLoading}
                />

                <DatePicker
                selected={dateRange.end}
                onSelect={(date) => setDateRange(prev => ({ ...prev, end: date }))}
                placeholder="End Date"
                className="bg-white border-blue-100"
                disabled={isLoading}
                />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white border-blue-100" disabled={isLoading}>
                  <Filter className="mr-2 h-4 w-4 text-blue-600" />
                  Action Type: {actionFilter === "all" ? "All" : actionFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setActionFilter("all")}>
                  All Actions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActionFilter("LOGIN")}>
                  Logins
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActionFilter("USER_UPDATE")}>
                  User Updates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActionFilter("PATIENT_UPDATE")}>
                  Patient Updates
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Input
              placeholder="Search activities..."
              className="max-w-xs bg-white border-blue-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-slate-600">Loading activities...</span>
            </div>
          )}

          {/* Activity Table */}
          {!isLoading && (
            <div className="bg-white rounded-lg shadow-sm border border-blue-50">
              <ScrollArea className="w-full whitespace-nowrap">
                <Table className="min-w-[1000px]">
                  <TableHeader className="bg-blue-50">
                    <TableRow>
                      <TableHead className="text-blue-600 font-semibold">
                        <button 
                          onClick={() => handleSort('timestamp')} 
                          className="flex items-center"
                          disabled={isLoading}
                        >
                          Timestamp
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead className="text-blue-600 font-semibold">
                        <button 
                          onClick={() => handleSort('user')} 
                          className="flex items-center"
                          disabled={isLoading}
                        >
                          User
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead className="text-blue-600 font-semibold">Role</TableHead>
                      <TableHead className="text-blue-600 font-semibold">
                        <button 
                          onClick={() => handleSort('actionType')} 
                          className="flex items-center"
                          disabled={isLoading}
                        >
                          Action Type
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead className="text-blue-600 font-semibold">Description</TableHead>
                      <TableHead className="text-blue-600 font-semibold">IP Address</TableHead>
                      <TableHead className="text-blue-600 font-semibold text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedActivities.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No activities found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedActivities.map((activity) => (
                        <TableRow key={activity.id} className="hover:bg-blue-50/50">
                          <TableCell>
                            {activity.timestamp.toLocaleString()}
                          </TableCell>
                          <TableCell className="font-medium">
                            {activity.user.name}
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {activity.user.role}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {activity.actionType}
                            </span>
                          </TableCell>
                          <TableCell>{activity.description}</TableCell>
                          <TableCell>{activity.ipAddress}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem 
                                  className="text-blue-600 focus:bg-blue-50"
                                  onClick={() => setSelectedActivity(activity)}
                                >
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600 focus:bg-red-50">
                                  Delete Record
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
          )}

          {/* Pagination */}
          {!isLoading && (
            <div className="flex justify-end items-center gap-4">
              <Button 
                variant="outline" 
                className="border-blue-100"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
              >
                Previous
              </Button>
              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                className="border-blue-100"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
              >
                Next
              </Button>
            </div>
          )}

          {/* Activity Details Dialog */}
          <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Activity Details</DialogTitle>
              </DialogHeader>
              {selectedActivity && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-slate-600">Timestamp</h3>
                      <p className="text-slate-900">
                        {selectedActivity.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-600">User</h3>
                      <p className="text-slate-900">
                        {selectedActivity.user.name} ({selectedActivity.user.role})
                      </p>
                      {selectedActivity.user.email && (
                        <p className="text-slate-600 text-sm">{selectedActivity.user.email}</p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-600">Action Type</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {selectedActivity.actionType}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-600">IP Address</h3>
                      <p className="text-slate-900">{selectedActivity.ipAddress}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-600">Description</h3>
                    <p className="text-slate-900 whitespace-pre-wrap">
                      {selectedActivity.description}
                    </p>
                  </div>
                  {(selectedActivity.device || selectedActivity.location) && (
                    <div className="grid grid-cols-2 gap-4">
                      {selectedActivity.device && (
                        <div>
                          <h3 className="font-medium text-slate-600">Device</h3>
                          <p className="text-slate-900">{selectedActivity.device}</p>
                        </div>
                      )}
                      {selectedActivity.location && (
                        <div>
                          <h3 className="font-medium text-slate-600">Location</h3>
                          <p className="text-slate-900">{selectedActivity.location}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}