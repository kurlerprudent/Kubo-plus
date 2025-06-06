// pages/radiologist/history.tsx
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import { Separator } from "@/components/ui/separator";
  import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { RadiologistAppSidebar } from "@/components/app-sidebar-doctor";
  import { Clock, AlertCircle, CheckCircle2, Hourglass } from "lucide-react";
  
  const statusIcons = {
    completed: CheckCircle2,
    pending: Hourglass,
    critical: AlertCircle,
  };
  
  const historyItems = [
    {
      id: 1,
      date: "2024-03-15",
      patientId: "PID-2345",
      filename: "chest_xray_001.dcm",
      status: "completed",
      diagnosis: "Normal",
    },
    // Add more sample items (30 items to test scrolling)
    ...Array.from({ length: 30 }, (_, i) => ({
      id: i + 2,
      date: `2024-03-${String(15 + (i % 5)).padStart(2, '0')}`,
      patientId: `PID-${6789 + i}`,
      filename: `chest_xray_${String(i + 2).padStart(3, '0')}.dcm`,
      status: i % 3 === 0 ? 'pending' : i % 4 === 0 ? 'critical' : 'completed',
      diagnosis: i % 3 === 0 ? "Pending Analysis" : 
                i % 5 === 0 ? "Pneumonia" : 
                "Normal",
    })),
  ];
  
  export default function HistoryPage() {
    return (
      <SidebarProvider>
        <RadiologistAppSidebar />
        <SidebarInset className="flex flex-col h-screen">
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/radiologist/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Case History</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
  
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-4 p-4">
              {/* History Timeline Section */}
              <div className="bg-white shadow p-6 rounded-xl">
                <h1 className="text-2xl font-bold mb-6">Case History</h1>
                
                <div className="space-y-4">
                  {historyItems.map((item) => {
                    const StatusIcon = statusIcons[item.status as 'completed' | 'pending' | 'critical'];
                    const statusColors = {
                      completed: 'text-green-600',
                      pending: 'text-amber-600',
                      critical: 'text-red-600',
                    };
  
                    return (
                      <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <span className="font-medium">{item.date}</span>
                          </div>
                          <StatusIcon className={`h-5 w-5 ${statusColors[item.status as 'completed' | 'pending' | 'critical']}`} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Patient ID</p>
                            <p className="font-mono">{item.patientId}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Filename</p>
                            <p className="truncate">{item.filename}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Diagnosis</p>
                            <p className={`font-medium ${
                              item.diagnosis === 'Pneumonia' ? 'text-red-600' :
                              item.diagnosis === 'Pending Analysis' ? 'text-amber-600' :
                              'text-green-600'
                            }`}>
                              {item.diagnosis}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex justify-end gap-2">
                          <button className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50">
                            View Details
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md hover:bg-gray-50">
                            Download
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
  
              {/* Statistics Section */}
              <div className="bg-white shadow p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Monthly Trends</h2>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <p>Case distribution chart placeholder</p>
                    <p className="text-sm text-gray-400">(Line/Bar chart showing monthly cases)</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    );
  }