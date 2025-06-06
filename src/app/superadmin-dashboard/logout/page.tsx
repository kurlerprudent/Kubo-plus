// src/app/superadmin/dashboard/page.tsx (updated)
"use client";


import { Loader2, LogOut } from "lucide-react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SuperAdminAppSidebar } from "@/components/app-sidebar-superadmin";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/ui/breadcrumb";

// Add this component near the top of your file
function DashboardLogoutButton() {

    const logoutUser = async () => {
        // Simulate an API call to log out the user
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      router.push("/superadmin/login");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="hover:bg-destructive/20 hover:text-destructive"
    >
      {isLoggingOut ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4 mr-2" />
      )}
      Logout
    </Button>
  );
}

// Update the header section in the main component
export default function SuperAdminDashboard() {
  return (
    <SidebarProvider>
      <SuperAdminAppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        {/* Updated Header */}
        <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b px-4 md:px-6">
          <SidebarTrigger className="lg:hidden" />
          <Separator orientation="vertical" className="h-6 lg:hidden" />
          <Breadcrumb className="flex-1">
            {/* ... existing breadcrumb content ... */}
          </Breadcrumb>
          <div className="flex items-center gap-2">
            <DashboardLogoutButton />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {/* Your main content goes here */}
          <p>Are you sure you want to sign out? </p>
          {/* Add more content as needed */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}