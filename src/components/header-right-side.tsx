// app/components/Rside.tsx
"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Bell } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

interface Notification {
  id: number
  message: string
  time: string
}

const Rside = () => {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  // Dummy notifications
  const notifications: Notification[] = [
    { id: 1, message: "New abnormality detected for Patient A.", time: "2m ago" },
    { id: 2, message: "CTR ratio outlier on Patient B.", time: "15m ago" },
    { id: 3, message: "Report signed‑off for Patient C.", time: "1h ago" },
  ]

  // Toggle between light and dark themes
  const toggleTheme = () => setTheme(isDark ? "light" : "dark")

  return (
    <div className="flex items-center space-x-4">
      {/* Notification Bell + Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="View notifications"
            className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-1 ring-white dark:ring-gray-900" />
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={8} className="w-80 max-h-[70vh] overflow-y-auto">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {notifications.length > 0 ? (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                className="flex flex-col space-y-0.5 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <span className="text-sm">{n.message}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{n.time}</span>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem className="text-center py-4 text-gray-500" disabled>
              No notifications
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a
              href="#"
              className="text-center w-full text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              onClick={(e) => e.preventDefault()}
            >
              View all notifications
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Toggle (Icon-only) */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-gray-400" />
        )}
      </button>

      {/* Avatar & Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="User menu"
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <Avatar>
              <AvatarImage src="/profile.jpg" alt="Dr. Obed's avatar" />
              <AvatarFallback>RD</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={8} className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Rside
