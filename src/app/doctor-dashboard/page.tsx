// pages/radiologist/dashboard.tsx
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
  import DashboardChart from "@/components/DashboardChart";
  import { RadiologistAppSidebar } from "@/components/app-sidebar-doctor";
import Rside from "@/components/header-right-side";
import {SystemCarousel} from "@/components/system-courosel";
  
  export default function RadiologistDashboard() {
    return (
      <SidebarProvider>
        <RadiologistAppSidebar />
        <SidebarInset className="flex flex-col h-screen">
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/radiologist/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto">
             <Rside/>
            </div>
          </header>
          
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-4 p-4">
              {                /* First section */}

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  {/* Carousel to show how the chest X-ray abnormalities are detected and displayed */}
                  <SystemCarousel />
                </div>
                <div className="flex flex-col md:flex-row w-full md:w-1/2 gap-2 mt-4">
                  <div className="flex-1">
                    {/* Line chart to show the number of patients seen in the last 7 days */}
                    Line chart to show the number of patients seen in the last 7 days
                  </div>
                  <div className="flex-1">
                    {/* Bar chart to show the distribution of diagnoses */}
                    Bar chart to show the distribution of diagnoses
                  </div>
                </div>
              </div>


              {/* Second section */}
                  <div>
                    <div>
                      {/* Bar chart for some analysis of the data */}
                    </div>
                    <div>
                      {/* Pie chart or some round stat for some analysis of the data */}
                    </div>
                    
                  </div>

               {                /* Third section */}
                  <div>
                    {/* Table to show the list of patients with their details */}

                 </div>
            </div>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    );
  }