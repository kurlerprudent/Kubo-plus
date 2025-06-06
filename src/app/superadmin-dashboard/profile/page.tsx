// src/app/superadmin/profile/page.tsx
"use client";

import * as React from "react";
import {
    Activity,
  AlertCircle,
  Bell,
  ChevronDown,
  Clock,
  Key,
  Lock,
  LogOut,
  Mail,
  MonitorCheck,
  Shield,
  Trash2,
  User,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface UserDevice {
  id: string;
  device: string;
  browser: string;
  ip: string;
  lastUsed: string;
}

interface LoginActivity {
  id: string;
  date: string;
  location: string;
  device: string;
  status: string;
}

// Mock data
const mockDevices: UserDevice[] = [
  {
    id: "1",
    device: "MacBook Pro (16-inch, 2023)",
    browser: "Chrome 123",
    ip: "192.168.1.1",
    lastUsed: "2025-04-11T14:30:00Z",
  },
];

const mockLoginActivity: LoginActivity[] = [
  {
    id: "1",
    date: "2025-04-11T14:30:00Z",
    location: "New York, NY",
    device: "Chrome on macOS",
    status: "Successful",
  },
];

export default function ProfilePage() {
  const [twoFactorAuth, setTwoFactorAuth] = React.useState(true);
  const [editMode, setEditMode] = React.useState(false);

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
                <BreadcrumbLink href="/superadmin/dashboard">SuperAdmin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <ScrollArea className="flex-1">
          <main className="p-4 md:p-6 space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">Admin Profile</h1>
                <p className="text-muted-foreground">Manage your account settings and security</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditMode(!editMode)}>
                  {editMode ? "Cancel" : "Edit Profile"}
                </Button>
                <Button variant="destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Profile Sections */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input 
                      placeholder="John Doe" 
                      disabled={!editMode}
                      value="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="sark@example.com"
                      disabled={!editMode}
                      value="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted" />
                      {editMode && <Button variant="outline">Change Photo</Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Password</div>
                        <p className="text-sm text-muted-foreground">
                          Last changed 3 weeks ago
                        </p>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">Two-Factor Authentication</div>
                        <p className="text-sm text-muted-foreground">
                          Extra layer of security for your account
                        </p>
                      </div>
                      <Switch
                        checked={twoFactorAuth}
                        onCheckedChange={setTwoFactorAuth}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Active Sessions</h3>
                    <div className="space-y-2">
                      {mockDevices.map((device) => (
                        <div
                          key={device.id}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="space-y-1">
                            <div className="font-medium">{device.device}</div>
                            <div className="text-sm text-muted-foreground">
                              {device.browser} • {device.ip} • Last used{" "}
                              {format(new Date(device.lastUsed), "MMM dd, yyyy")}
                            </div>
                          </div>
                          <Button variant="destructive" size="sm">
                            Revoke
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Card */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockLoginActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="space-y-1">
                          <div className="font-medium">
                            {format(new Date(activity.date), "MMM dd, yyyy HH:mm")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {activity.location} • {activity.device}
                          </div>
                        </div>
                        <Badge
                          variant={activity.status === "Successful" ? "success" : "destructive"}
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}