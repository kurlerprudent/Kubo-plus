// components/RadiologistAppSidebar.tsx
"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, UploadCloud, Clock, User, 
  Settings, LogOut, MessageCircle, Sun, Moon 
} from "lucide-react";
import { 
  Sidebar, SidebarContent, SidebarHeader, 
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, 
  SidebarRail, SidebarFooter 
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAV_ITEMS = [
  { title: "Dashboard", url: "/doctor-dashboard", icon: Home },
  { title: "Upload X-Ray", url: "/doctor-dashboard/radiologist-upload-xray", icon: UploadCloud },
  { title: "History", url: "/doctor-dashboard/radiologist-history", icon: Clock },
  { title: "Appointment", url: "/doctor-dashboard/appointments", icon: Clock },
  { title: "Messages", url: "/doctor-dashboard/message", icon: MessageCircle },
  { title: "Settings", url: "/doctor-dashboard/radiologist-settings", icon: Settings },
  { title: "Profile", url: "/doctor-dashboard/radiologist-profile", icon: User },
];

export function RadiologistAppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-4 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <motion.h2 
            className="text-lg font-semibold text-blue-600 dark:text-blue-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Radiologist Dashboard
          </motion.h2>
         <div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto flex flex-col">
        {/* User Profile Section */}
        <div className="px-4 py-5 flex flex-col items-center border-b border-gray-200 dark:border-gray-800">
          <Avatar className="w-16 h-16 mb-3 border-2 border-blue-500">
            <AvatarImage src="/radiologist-avatar.jpg" alt="Dr. Smith" />
            <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xl">
              DS
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-gray-900 dark:text-white">Dr. Samantha Smith</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Radiology Specialist</p>
        </div>

        {/* Navigation Menu */}
        <SidebarMenu className="mt-2 flex-1">
          <AnimatePresence>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url || 
                              (item.url !== "/" && pathname.startsWith(item.url));
              
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="group relative overflow-visible"
                  >
                    <a 
                      href={item.url}
                      className={`flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 transition-colors duration-200
                        ${isActive 
                          ? "text-blue-600 dark:text-blue-300 font-medium" 
                          : "hover:text-blue-500 dark:hover:text-blue-400"}
                      `}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30"
                      >
                        <Icon 
                          className={`w-5 h-5 transition-colors ${isActive 
                            ? "text-blue-500" 
                            : "text-gray-500 dark:text-gray-400 group-hover:text-blue-500"}`} 
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
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </AnimatePresence>
        </SidebarMenu>

        {/* Sign Out Button */}
        <div className="mt-auto px-4 py-3">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 group"
            onClick={() => console.log("Signing out...")}
          >
            <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/40">
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </SidebarContent>
      
     
    </Sidebar>
  );
}