// app/dashboard/patient/settings/page.tsx
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Bell, Lock, Mail } from "lucide-react";

export default function PatientSettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="bg-background sticky top-0 z-10 flex h-16 items-center gap-4 border-b px-4">
            <SidebarTrigger 
              className="-ml-1" 
              aria-label="Toggle navigation"
            />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-4xl space-y-6">
              {/* Account Settings */}
              <div className="space-y-4">
                <p className="text-xl font-semibold flex items-center gap-2">
                  <Globe className="h-5 w-5" /> Account Settings
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="English" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="GMT +00:00" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gmt0">GMT +00:00</SelectItem>
                        <SelectItem value="gmt1">GMT +01:00</SelectItem>
                        <SelectItem value="gmt2">GMT +02:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notification Preferences */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Bell className="h-5 w-5" /> Notifications
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>Appointment Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for upcoming appointments
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>Test Results</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new test results are available
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>Health Tips</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive periodic health education content
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Privacy & Security */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Privacy & Security
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow anonymous health data for research
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add extra security to your account
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Not Enabled
                    </Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Label>Download Medical Data</Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Request a copy of your medical records
                    </p>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Request Data Export
                    </Button>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-4 pt-8 border-t">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}