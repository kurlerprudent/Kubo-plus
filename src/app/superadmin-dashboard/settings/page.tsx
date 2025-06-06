// src/app/superadmin/settings/page.tsx
"use client";

import * as React from "react";
import {
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface ApiKey {
  id: string;
  name: string;
  lastUsed: string;
  expires: string;
}

// Mock data - replace with API calls
const mockDevices: UserDevice[] = [
  {
    id: "1",
    device: "MacBook Pro (16-inch, 2023)",
    browser: "Chrome 123",
    ip: "192.168.1.1",
    lastUsed: "2025-04-11T14:30:00Z",
  },
  // Add more devices...
];

const mockApiKeys: ApiKey[] = [
  {
    id: "API-123456",
    name: "Production Server",
    lastUsed: "2025-04-10T09:15:00Z",
    expires: "2026-04-11T00:00:00Z",
  },
  // Add more API keys...
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("profile");
  const [retentionPeriod, setRetentionPeriod] = React.useState("365");
  const [twoFactorAuth, setTwoFactorAuth] = React.useState(true);

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
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <ScrollArea className="flex-1">
          <main className="p-4 md:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* Settings Navigation */}
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
                <TabsTrigger value="profile" className="py-4">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="py-4">
                  <Lock className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="py-4">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="advanced" className="py-4">
                  <Shield className="w-4 h-4 mr-2" />
                  Advanced
                </TabsTrigger>
                <TabsTrigger value="danger" className="py-4 text-destructive">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Danger Zone
                </TabsTrigger>
              </TabsList>

              {/* Profile Settings */}
              <TabsContent value="profile" className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Profile Settings</h2>
                  <p className="text-muted-foreground">
                    Manage your account information and contact details
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted" />
                      <Button variant="outline">Upload New Photo</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Security Settings</h2>
                  <p className="text-muted-foreground">
                    Manage account security and authentication methods
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2">
                          <Key className="w-4 h-4" />
                          Password
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Last changed 3 weeks ago
                        </p>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2">
                          <MonitorCheck className="w-4 h-4" />
                          Two-Factor Authentication
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        checked={twoFactorAuth}
                        onCheckedChange={setTwoFactorAuth}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Active Devices</h3>
                    <div className="space-y-2">
                      {mockDevices.map((device) => (
                        <div
                          key={device.id}
                          className="flex items-center justify-between p-4 rounded-lg border"
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
                </div>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Notification Preferences</h2>
                  <p className="text-muted-foreground">
                    Configure how you receive system notifications
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <div className="font-medium">Email Notifications</div>
                        <p className="text-sm text-muted-foreground">
                          Receive important updates via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <div className="font-medium">Security Alerts</div>
                        <p className="text-sm text-muted-foreground">
                          Immediate notifications for security events
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <div className="font-medium">System Updates</div>
                        <p className="text-sm text-muted-foreground">
                          Notify about maintenance and updates
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Advanced Settings */}
              <TabsContent value="advanced" className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Advanced Settings</h2>
                  <p className="text-muted-foreground">
                    Manage system-level configurations and API access
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">API Keys</h3>
                    <div className="space-y-2">
                      {mockApiKeys.map((key) => (
                        <div
                          key={key.id}
                          className="flex items-center justify-between p-4 rounded-lg border"
                        >
                          <div className="space-y-1">
                            <div className="font-medium">{key.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Expires {format(new Date(key.expires), "MMM dd, yyyy")} • Last used{" "}
                              {format(new Date(key.lastUsed), "MMM dd, yyyy")}
                            </div>
                          </div>
                          <Button variant="destructive" size="sm">
                            Revoke
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-4">
                      Generate New API Key
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Audit Log Retention</h3>
                    <div className="flex items-center gap-4">
                      <Select value={retentionPeriod} onValueChange={setRetentionPeriod}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                          <SelectItem value="0">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline">Apply Changes</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Danger Zone */}
              <TabsContent value="danger" className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-destructive">Danger Zone</h2>
                  <p className="text-muted-foreground">
                    Critical actions with permanent consequences
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-lg border border-destructive">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2 text-destructive">
                          <Trash2 className="w-4 h-4" />
                          Delete All User Data
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Permanently remove all user records and associated data
                        </p>
                      </div>
                      <Button variant="destructive">Delete Data</Button>
                    </div>
                  </div>

                  <div className="p-6 rounded-lg border border-destructive">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2 text-destructive">
                          <LogOut className="w-4 h-4" />
                          Deactivate Account
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Temporarily disable your superadmin account
                        </p>
                      </div>
                      <Button variant="destructive">Deactivate Account</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}