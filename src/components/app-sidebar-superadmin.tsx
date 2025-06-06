// src/components/superadmin-app-sidebar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCog,
  Stethoscope,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  User,
  LogOut,
  Link as LinkIcon,
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
import { cn } from "@/lib/utils";

// --- Data for SUPERADMIN Sidebar ---
const dataSuperAdmin = [
  { title: "Dashboard", url: "/superadmin-dashboard", icon: LayoutDashboard },
  { title: "Manage Admins", url: "/superadmin-dashboard/manage-admins", icon: UserCog },
  { title: "Activity Log", url: "/superadmin-dashboard/activity-log", icon: ClipboardList },
  { title: "Reports", url: "/superadmin-dashboard/reports", icon: BarChart3 },
  { title: "Settings", url: "/superadmin-dashboard/settings", icon: Settings },
  { title: "Profile", url: "/superadmin-dashboard/profile", icon: User },
  { title: "Logout", url: "/superadmin-dashboard/logout", icon: LogOut },
];

export function SuperAdminAppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h2 className="font-semibold text-primary px-4 py-2">
          SuperAdmin Panel
        </h2>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarMenu>
          {dataSuperAdmin.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.url;

            // Logout item is pushed down
            if (item.title === "Logout") {
              return (
                <SidebarMenuItem key={item.title} className="mt-auto pt-2 border-t">
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full">
                      <Icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link
                    href={item.url}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
