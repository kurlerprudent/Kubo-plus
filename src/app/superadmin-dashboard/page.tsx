// src/app/superadmin/dashboard/page.tsx (NEW FILE/LOCATION)
"use client";

import * as React from "react";
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  ClipboardList,
  // CircleDollarSign, // unused
  Clock, // unused
  Cpu,
  Database,
  DatabaseZap, // Changed from Server for System Health
  LayoutDashboard, // unused
  MemoryStick,
  Server, // Keep for DB Status
  Shield,
  UserCog,
  // UserCog, // unused
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { RecentActivities } from "@/components/recent-activities"; // Assuming this exists
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink, // Use Link for potential navigation
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator, // Use Separator
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"; // Add SidebarTrigger
import { SuperAdminAppSidebar } from "@/components/app-sidebar-superadmin"
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator"; // Import Separator
import { ScrollArea } from "@/components/ui/scroll-area"; // Use ScrollArea for main content

// Import Shadcn Chart components
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"; // Keep Recharts imports
import Link from "next/link";

// --- Placeholder for RecentActivities ---
function RecentActivitiesPlaceholder({ activities }: { activities: ActivityItem[] }) {
    return (
        <ul className="space-y-3">
            {activities.map((activity) => (
                <li key={activity.id} className="flex items-start gap-3 text-sm">
                    <div className="flex-shrink-0 pt-0.5">
                        {activity.type === 'admin' && <Shield className="h-4 w-4 text-primary" />}
                        {activity.type === 'system' && <DatabaseZap className="h-4 w-4 text-blue-500" />}
                        {activity.type === 'security' && <AlertCircle className="h-4 w-4 text-destructive" />}
                    </div>
                    <div>
                        <p className="text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground/70">{new Date(activity.timestamp).toLocaleString()}</p>
                    </div>
                </li>
            ))}
             {activities.length === 0 && <p className="text-muted-foreground">No recent activities found.</p>}
        </ul>
    );
}

// --- Type for Activity ---
interface ActivityItem {
    id: number;
    type: "admin" | "system" | "security";
    description: string;
    timestamp: string;
}


// --- Main Dashboard Component ---
export default function SuperAdminDashboard() {
  // Sample data - replace with real data
  const systemMetrics = React.useMemo(() => ({
    activeAdmins: 12,
    totalTenants: 45, // Example tenant count
    systemHealth: 99.9,
    auditEvents: 2345,
    cpuUsage: 28,
    memoryUsage: 64,
    storageUsage: 42,
    activeAlerts: 2,
  }), []);

  const userGrowthData = React.useMemo(() => [
    { month: "Jan", users: 400 }, { month: "Feb", users: 1200 }, { month: "Mar", users: 800 },
    { month: "Apr", users: 1600 }, { month: "May", users: 1500 }, { month: "Jun", users: 2100 },
  ], []);

  const resourceUsageData = React.useMemo(() => [
        { name: "Doctors active", value: systemMetrics.cpuUsage, fill: "hsl(var(--chart-1))" }, // Use CSS vars
        { name: "Patients active", value: systemMetrics.memoryUsage, fill: "hsl(var(--chart-2))" },
        { name: "Admins Active", value: systemMetrics.storageUsage, fill: "hsl(var(--chart-3))" },
      ], [systemMetrics]);

  const recentActivities: ActivityItem[] = React.useMemo(() => [
     { id: 1, type: "admin", description: "Created new admin account - admin_ops", timestamp: "2025-04-11T14:30:00Z", },
     { id: 2, type: "system", description: "Database backup completed successfully", timestamp: "2025-04-11T11:00:00Z", },
     { id: 3, type: "security", description: "Failed login attempt detected for user 'root'", timestamp: "2025-04-10T22:15:00Z", },
     { id: 4, type: "admin", description: "Updated system setting: SESSION_TIMEOUT", timestamp: "2025-04-10T09:05:00Z", },
  ], []);


  // --- Chart Configurations (using CSS variables for colors) ---
  const userGrowthChartConfig = {
    users: { label: "Users", color: "hsl(var(--chart-1))" },
  } satisfies ChartConfig;

  const resourceChartConfig = {
    value: { label: "Usage (%)" },
    CPU: { label: "CPU", color: "hsl(var(--chart-1))" },
    Memory: { label: "Memory", color: "hsl(var(--chart-2))" },
    Storage: { label: "Storage", color: "hsl(var(--chart-3))" },
  } satisfies ChartConfig;


  return (
    <SidebarProvider>
      <SuperAdminAppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        {/* Header */}
        <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b px-4 md:px-6">
          <SidebarTrigger className="lg:hidden" /> {/* Trigger for mobile */}
          <Separator orientation="vertical" className="h-6 lg:hidden" /> {/* Separator for mobile */}
          <Breadcrumb className="flex-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                 {/* Link potentially back to base superadmin path */}
                 <BreadcrumbLink href="/superadmin-dashboard">SuperAdmin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* Add Header actions here if needed (e.g., Profile Menu) */}
        </header>

        {/* Main Content Area */}
        <ScrollArea className="flex-1">
          <main className="p-4 md:p-6 space-y-6">
            {/* Quick Stats */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1: Active Admins */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
                    <UserCog className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemMetrics.activeAdmins}</div>
                    {/* <p className="text-xs text-muted-foreground">+2 since last hour</p> */}
                    <Badge variant="outline" className="mt-2 font-normal">
                       <ArrowUpRight className="h-3 w-3 mr-1" /> 12% last month
                    </Badge>
                  </CardContent>
                </Card>
                 {/* Card 2: System Health */}
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemMetrics.activeAdmins}%</div>
                    <p className="text-xs text-muted-foreground">Total Patients</p>
                  </CardContent>
                </Card>
                 {/* Card 3: Audit Events */}
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Audit Events</CardTitle>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{systemMetrics.auditEvents.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Activities recorded last 7 days</p>
                  </CardContent>
                </Card>
                 {/* Card 4: Active Alerts */}
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-destructive">Active Alerts</CardTitle>
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive">{systemMetrics.activeAlerts}</div>
                    <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                  </CardContent>
                </Card>
             </div>

             {/* Charts Section */}
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* User Growth Chart (Larger) */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>User Growth Trend</CardTitle>
                        <CardDescription>Total user accounts over time.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 pl-2"> {/* Added padding for Y-axis */}
                        <ChartContainer config={userGrowthChartConfig} className="h-full w-full">
                            <LineChart accessibilityLayer data={userGrowthData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }} >
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8}/>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                <Line dataKey="users" type="monotone" stroke="var(--color-users)" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* System Resources Chart (Smaller) */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>System Resources</CardTitle>
                        <CardDescription>Current resource utilization.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center pb-4">
                      
                       <ChartContainer config={resourceChartConfig} className="h-full w-full max-w-[250px]">
                           <ResponsiveContainer width="100%" height="100%">
                                <BarChart accessibilityLayer data={resourceUsageData} layout="vertical" margin={{ left: -20 }}>
                                    <CartesianGrid horizontal={false} />
                                    <YAxis dataKey="name" type="category" tickLine={false} tickMargin={10} axisLine={false} className="capitalize"/>
                                    <XAxis dataKey="value" type="number" hide />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" hideLabel />} />
                                    <Bar dataKey="value" layout="vertical" radius={4}>
                                        {resourceUsageData.map((entry) => ( <Cell key={entry.name} fill={entry.fill} /> ))}
                                    </Bar>
                                </BarChart>
                           </ResponsiveContainer>
                       </ChartContainer>
                    </CardContent>
                </Card>
             </div>

             {/* Recent Activities & System Status */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                        <Link href="/superadmin-dashboard/activity-log" passHref>
                     
                         <Button variant="link" className="text-xs -mt-1 -mr-4 float-right">View All</Button> 
                         </Link> 
                    </CardHeader>
                    <CardContent>
                         {/* Use the placeholder or your actual component */}
                        <RecentActivitiesPlaceholder activities={recentActivities} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3"> <Server className="h-5 w-5 text-muted-foreground" /> <span className="font-medium">Main Database</span> </div>
                            <Badge variant="success">Operational</Badge> {/* Use custom variant */}
                        </div>
                         <Separator />
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3"> <DatabaseZap className="h-5 w-5 text-muted-foreground" /> <span className="font-medium">Background Jobs</span> </div>
                            <Badge variant="success">Operational</Badge>
                        </div>
                         <Separator />
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3"> <Users className="h-5 w-5 text-muted-foreground" /> <span className="font-medium">Tenant Services</span> </div>
                            <Badge variant="success">Operational</Badge>
                        </div>
                         <Separator />
                         {/* Add more status items */}
                    </CardContent>
                </Card>
             </div>
          </main>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}

