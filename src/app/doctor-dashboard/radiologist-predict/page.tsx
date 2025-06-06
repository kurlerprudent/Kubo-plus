// pages/radiologist/predict-diseases.tsx
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
  import { Activity, FileText } from "lucide-react";
  
  const samplePredictions = [
    {
      id: 1,
      filename: "chest_xray_001.dcm",
      prediction: "Normal",
      confidence: 92.4,
      date: "2024-03-15",
    },
    // Add 20 more sample entries to test scrolling
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 2,
      filename: `chest_xray_${String(i + 2).padStart(3, '0')}.dcm`,
      prediction: i % 2 === 0 ? "Pneumonia" : "COVID-19",
      confidence: 85.5 + (i % 10),
      date: `2024-03-${String(15 + (i % 5)).padStart(2, '0')}`,
    })),
  ];
  
  export default function PredictDiseasesPage() {
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
                  <BreadcrumbPage>Disease Predictions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
  
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-4 p-4">
              <div className="bg-white shadow p-6 rounded-xl">
                <h1 className="text-2xl font-bold mb-6">Recent Predictions</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {samplePredictions.map((prediction) => (
                    <div key={prediction.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-4">
                        <Activity className="h-6 w-6 text-blue-500" />
                        <h3 className="text-lg font-semibold truncate">{prediction.filename}</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Prediction:</span>
                          <span className={`font-medium ${
                            prediction.prediction === 'Normal' 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {prediction.prediction}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Confidence:</span>
                          <span>{prediction.confidence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Date:</span>
                          <span>{prediction.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Additional Sections */}
              <div className="bg-white shadow p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Prediction Statistics</h2>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Bar chart placeholder
                </div>
              </div>
            </div>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    );
  }