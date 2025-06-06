// pages/admin/settings.tsx
"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminAppSidebar } from "@/components/app-sidebar-admin";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
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
                <BreadcrumbPage>System Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
            <Badge variant="outline" className="border-green-600 text-green-600">
              Admin Privileges
            </Badge>
          </div>

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="bg-blue-50">
              <TabsTrigger value="general" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                General
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Appearance
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-4">
              <Card className="border-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-600">Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/avatar.png" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" className="border-blue-200 bg-blue-50 text-blue-600">
                        Upload New Photo
                      </Button>
                      <p className="text-sm text-slate-500">
                        JPG, PNG or GIF up to 2MB
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Admin Name" className="bg-blue-50 border-blue-100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="admin@example.com" className="bg-blue-50 border-blue-100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 234 567 890" className="bg-blue-50 border-blue-100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select>
                        <SelectTrigger className="bg-blue-50 border-blue-100">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">EST (UTC-05:00)</SelectItem>
                          <SelectItem value="pst">PST (UTC-08:00)</SelectItem>
                          <SelectItem value="gmt">GMT (UTC+00:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-4">
              <Card className="border-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-600">Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-slate-500">
                          Last changed 3 days ago
                        </p>
                      </div>
                      <Button variant="outline" className="border-blue-200 bg-blue-50 text-blue-600">
                        Change Password
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" className="bg-blue-50 border-blue-100" />
                      
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" className="bg-blue-50 border-blue-100" />
                      
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" className="bg-blue-50 border-blue-100" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-slate-500">
                          Add extra security to your account
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-4">
              <Card className="border-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-600">Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">System Notifications</h3>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm">Critical System Alerts</p>
                        <p className="text-sm text-slate-500">
                          Receive urgent system notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm">Security Updates</p>
                        <p className="text-sm text-slate-500">
                          Get notified about security patches
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">User Activity</h3>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm">New User Registrations</p>
                        <p className="text-sm text-slate-500">
                          Notify when new users sign up
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm">Role Changes</p>
                        <p className="text-sm text-slate-500">
                          Alert when user roles are modified
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="space-y-4">
              <Card className="border-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-600">Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Theme Preferences</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-24 w-full rounded-lg border-2 border-blue-600 bg-white" />
                        <span className="text-sm">Light</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-24 w-full rounded-lg border-2 border-blue-200 bg-slate-800" />
                        <span className="text-sm">Dark</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-24 w-full rounded-lg border-2 border-blue-200 bg-gradient-to-br from-white to-slate-100" />
                        <span className="text-sm">System</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">UI Density</h3>
                    <Select>
                      <SelectTrigger className="bg-blue-50 border-blue-100 w-[200px]">
                        <SelectValue placeholder="Select density" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}