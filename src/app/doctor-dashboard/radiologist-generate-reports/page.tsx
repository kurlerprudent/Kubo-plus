// pages/radiologist/generate-reports.tsx
// (import statements similar to above)

import { RadiologistAppSidebar } from "@/components/app-sidebar-doctor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function GenerateReportsPage() {
  const sampleReports = [
    { id: '1', title: 'Report 1', content: 'This is report 1' },
    { id: '2', title: 'Report 2', content: 'This is report 2' }
  ];
  return (
    <SidebarProvider>
      <RadiologistAppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          {/* Similar breadcrumb structure */}
        </header>

        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-4 p-4">
            <div className="bg-white shadow p-6 rounded-xl">
              <h1 className="text-2xl font-bold mb-6">Generated Reports</h1>
              
              <div className="space-y-4">
                {sampleReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    {/* Report content */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}