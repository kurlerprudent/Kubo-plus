// components/RadiologistAppSidebar.tsx
import * as React from "react";
import { 
  Home, 
  FileText, 
  UploadCloud, 
  Activity, 
  Clock,
  User, 
  Settings, 
  LogOut, 
  MessageCircle
} from "lucide-react";

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

const data = {
  versions: ["2.1.0", "2.0.1-stable", "3.0.0-beta"],
  navMain: [
    {
      title: "Dashboard",
      url: "/doctor-dashboard",
      icon: Home,
    },
    {
      title: "Upload X-Ray",
      url: "/doctor-dashboard/radiologist-upload-xray",
      icon: UploadCloud,
    },
    {
      title: "Predict Diseases",
      url: "/doctor-dashboard/radiologist-predict",
      icon: Activity,
    },
    {
      title: "Generate Reports",
      url: "/doctor-dashboard/radiologist-generate-reports",
      icon: FileText,
    },
    {
      title: "History",
      url: "/doctor-dashboard/radiologist-history",
      icon: Clock,
    },
    {
        title:"Message",
        url:"/doctor-dashboard/message",
        icon:MessageCircle
    },
    {
      title: "Settings",
      url: "/doctor-dashboard/radiologist-settings",
      icon: Settings
    },
    {
      title: "Profile",
      url: "/doctor-dashboard/radiologist-profile",
      icon: User,
    },
    {
      title: "Logout",
      url: "/",
      icon: LogOut
    }
  ],
};

export function RadiologistAppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
       
        <h2 className="text-blue-400">Radiologist Dashboard</h2>
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