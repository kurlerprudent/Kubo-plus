// components/messaging/radiologist/MessageHeader.tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import { colors } from "../types";
import Rside from "@/components/header-right-side";

export default function MessageHeader() {
  return (
    <header 
      className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 z-10"
      style={{ backgroundColor: colors.background2 }}
    >
      <SidebarTrigger className="-ml-1">
        <Menu className="h-5 w-5" style={{ color: colors.textColor }} />
      </SidebarTrigger>
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              href="/radiologist/dashboard" 
              className="hover:text-[#00FF9C]"
              style={{ color: colors.textColor }}
            >
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage style={{ color: colors.textColor }}>
              Messages
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: colors.textColorSecondary }} />
          <Input
            type="text"
            placeholder="Search conversations..."
            className="sm:hidden md:flex pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm w-48 transition-all duration-300 hover:w-52"
            style={{ backgroundColor: colors.background1 }}
          />
        </div>
        <Rside />
      </div>
    </header>
  );
}