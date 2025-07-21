// src/components/superadmin-app-sidebar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  UserCog,
  ClipboardList,
  BarChart3,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// --- Data for SUPERADMIN Sidebar ---
const NAV_ITEMS = [
  { title: "Dashboard", url: "/superadmin-dashboard", icon: LayoutDashboard },
  { title: "Manage Admins", url: "/superadmin-dashboard/manage-admins", icon: UserCog },
  { title: "Activity Log", url: "/superadmin-dashboard/activity-log", icon: ClipboardList },
  { title: "Reports", url: "/superadmin-dashboard/reports", icon: BarChart3 },
  { title: "Settings", url: "/superadmin-dashboard/settings", icon: Settings },
  { title: "Profile", url: "/superadmin-dashboard/profile", icon: User },
];

export function SuperAdminAppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    // Implement secure logout logic here (e.g., API call, clear tokens)
    console.log("Signing out securely...");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-4 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <motion.h2
            className="text-lg font-semibold text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            SuperAdmin Panel
          </motion.h2>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-foreground/70 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto flex flex-col">
        {/* User Profile Section */}
        <div className="px-4 py-5 flex flex-col items-center border-b border-border">
          <Avatar className="w-16 h-16 mb-3 border-2 border-primary">
            {/* You can add an image source if available */}
            <AvatarImage src="" alt="Super Admin" /> 
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              SA
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-foreground">Admin User</h3>
          <p className="text-sm text-muted-foreground">Super Administrator</p>
        </div>

        {/* Navigation Menu */}
        <SidebarMenu className="mt-2 flex-1">
          <AnimatePresence>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.url === "/superadmin-dashboard"
                  ? pathname === item.url
                  : pathname.startsWith(item.url);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="group relative overflow-visible"
                  >
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-foreground/70 transition-colors duration-200",
                        isActive
                          ? "text-primary font-medium"
                          : "hover:text-primary"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="superadmin-activeIndicator"
                            className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-1.5 rounded-lg bg-secondary group-hover:bg-primary/10"
                      >
                        <Icon
                          className={cn(
                            "w-5 h-5 transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-primary"
                          )}
                        />
                      </motion.div>

                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm"
                      >
                        {item.title}
                      </motion.span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </AnimatePresence>
        </SidebarMenu>

        {/* Sign Out Button */}
        <div className="mt-auto px-4 py-3">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors duration-200 group"
            onClick={handleLogout}
          >
            <div className="p-1.5 rounded-lg bg-destructive/20 group-hover:bg-destructive/30">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </SidebarContent>

  
    </Sidebar>
  );
}