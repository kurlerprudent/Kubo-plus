// src/components/admin-app-sidebar.tsx // Renamed for clarity if it's for Admin
"use client"; // <--- Required for usePathname

import * as React from "react";
import Link from "next/link"; // <--- Import Link
import { usePathname } from "next/navigation"; // <--- Import usePathname
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Settings,
  ClipboardList,
  BarChart3,
  UserCog, // Added for Manage Admins example
  Link as LinkIcon, // For Assignments
  LogOut,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,

} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils"; // Import cn utility

// --- Data for ADMIN Sidebar ---
const dataAdmin = [
  { title: "Dashboard", url: "/admin-dashboard", icon: LayoutDashboard },
  { title: "Assignments", url: "/admin-dashboard/view-assigned", icon: LinkIcon },
  { title: "Manage Doctors", url: "/admin-dashboard/manage-doctors", icon: Stethoscope },
  { title: "Manage Patients", url: "/admin-dashboard/manage-patients", icon: Users },
  { title: "Activity Log", url: "/admin-dashboard/activity-log", icon: ClipboardList },
  { title: "Settings", url: "/admin-dashboard/settings", icon: Settings },
  { title: "Profile", url: "/admin-dashboard/profile", icon: User }, // Admin's own profile
  { title: "Logout", url: "/logout", icon: LogOut }, ]

export function AdminAppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const pathname = usePathname(); 

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* Optional: Add Logo */}
        <h2 className="font-semibold text-primary px-4 py-2">Admin Panel</h2> {/* Use themed color */}
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarMenu>
          {dataAdmin.map((item) => {
            const Icon = item.icon;
           
            const isActive = pathname === item.url;

            
            if (item.title === "Logout") {
               
               return (
                 <SidebarMenuItem key={item.title} className="mt-auto pt-2 border-t"> {/* Push logout down */}
                     <SidebarMenuButton
                        // onClick={handleLogout} // Example if using a function
                     >
                        <Link href={item.url} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full">
                            <Icon className="h-5 w-5" />
                            <span>{item.title}</span>
                        </Link>
                     </SidebarMenuButton>
                 </SidebarMenuItem>
               )
            }

            return (
              <SidebarMenuItem key={item.title}>
                {/* --- Set isActive dynamically --- */}
                <SidebarMenuButton asChild isActive={isActive}>
                  {/* --- Use next/link component --- */}
                  <Link
                    href={item.url}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground" // Active state style
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground" // Default/Hover state style
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail /> 
    </Sidebar>
  );
}