// components/AppSidebar.tsx
import * as React from "react";
import { Home, FileText, Calendar, User, MessageCircle, Settings, LogOut } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { title } from "process";

// Patient-specific navigation data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "My Reports",
      url: "/dashboard/patient-reports",
      icon: FileText,
    },
    {
      title: "Appointments",
      url: "/dashboard/patient-appointments",
      icon: Calendar,
    },
    {
      title:"Message",
      url:"/dashboard/patient-message",
      icon: MessageCircle

    },
    {
      title:"Settings",
      url:"/dashboard/patient-settings",
      icon:Settings
    },
    {
      title: "Profile",
      url: "/dashboard/patient-profile",
      icon: User,
    },
    {
      title:"Logout",
      url:"/",
      icon:LogOut
    }
   
  ],
};

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
       
        <div className="flex items-center justify-between px-4 py-2">
          <h1 className="text-lg font-semibold">Patient Dashboard</h1>
  
        </div>
        
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarMenu>
          {data.navMain.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem
                key={item.title}
                className="transition-colors duration-200 hover:bg-gray-100"
              >
                <SidebarMenuButton asChild isActive={false}>
                  <a href={item.url} className="flex items-center gap-2 px-4 py-2">
                    <Icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </a>
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
