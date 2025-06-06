// pages/dashboard/patient-reports/index.tsx

"use client"

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Download,
  Flag,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MedicalReport {
  id: number;
  title: string;
  date: string;
  status: "Reviewed" | "Pending" | "Critical";
  description: string;
  details: string;
  attachments: string[];
}

const statusConfig = {
  Reviewed: {
    class: "bg-green-100 text-green-800",
    icon: <CheckCircle2 className="h-4 w-4 mr-2" />,
  },
  Pending: {
    class: "bg-yellow-100 text-yellow-800",
    icon: <Clock className="h-4 w-4 mr-2" />,
  },
  Critical: {
    class: "bg-red-100 text-red-800",
    icon: <AlertTriangle className="h-4 w-4 mr-2" />,
  },
};

function ReportCard({ report }: { report: MedicalReport }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="group bg-card rounded-xl p-6 shadow-sm border transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <h2 className="text-lg font-semibold leading-tight hover:underline">
                {report.title}
              </h2>
            </Button>
            <Badge variant="outline" className={statusConfig[report.status].class}>
              {statusConfig[report.status].icon}
              {report.status}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">{report.description}</p>
          <time className="text-xs text-muted-foreground block">
            {formatDate(report.date, "long")}
          </time>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Flag className="h-4 w-4" />
              Flag for Review
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t">
          <div className="prose max-w-none text-sm">
            <h3 className="font-medium mb-2">Detailed Findings</h3>
            <p>{report.details}</p>
            {report.attachments.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Attachments</h4>
                <div className="flex gap-2">
                  {report.attachments.map((file, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      {file}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default function PatientReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  
  const reports: MedicalReport[] = [
    {
      id: 1,
      title: "Chest X-Ray Report",
      date: "2023-04-10",
      status: "Reviewed",
      description: "Findings indicate normal lung structure with no significant abnormalities.",
      details: "Full radiographic examination shows clear lung fields with normal cardiac silhouette. No pleural effusion or pneumothorax observed. Mild degenerative changes in the thoracic spine, consistent with age.",
      attachments: ["xray_scan.pdf", "radiologist_notes.txt"]
    },
    // ... other reports with added details
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="bg-background sticky top-0 z-10 flex h-16 items-center gap-4 border-b px-4">
            <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Medical Reports</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tight">Medical Reports</h1>
                
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
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
                      {Object.keys(statusConfig).map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => setStatusFilter(status)}
                        >
                          {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <section className="space-y-4">
                {filteredReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}

                {filteredReports.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-96 gap-4 rounded-lg border">
                    <Search className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground text-lg">
                      No reports found matching your criteria
                    </p>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("All");
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </section>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}