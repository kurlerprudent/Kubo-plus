// pages/dashboard/patient-messages.tsx
"use client"

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar"; // Replace with PatientAppSidebar if available
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Message {
  id: number;
  sender: "patient" | "doctor";
  text: string;
  timestamp: string;
}

export default function PatientMessagesPage() {
  // Sample conversation messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "patient",
      text: "Hello Dr. Smith, I have a question regarding my treatment.",
      timestamp: "09:30 AM",
    },
    {
      id: 2,
      sender: "doctor",
      text: "Hi, I'm here to help. What is your question?",
      timestamp: "09:32 AM",
    },
    // Add more sample messages if needed
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "patient",
          text: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setNewMessage("");
    }
  };

  // Sample assigned doctor details
  const assignedDoctor = {
    name: "Dr. John Smith",
    specialty: "Cardiology",
    avatar: "/avatars/doctor_smith.png", // adjust the path as needed
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        {/* Header with breadcrumb */}
        <header className="bg-background sticky top-0 z-10 flex h-16 items-center gap-4 border-b px-4">
          <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Messages</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 flex flex-col">
          {/* Doctor Info */}
          <div className="p-4 border-b flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={assignedDoctor.avatar} />
              <AvatarFallback>
                {assignedDoctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{assignedDoctor.name}</h2>
              <p className="text-sm text-muted-foreground">{assignedDoctor.specialty}</p>
            </div>
          </div>

          {/* Chat Window */}
          <ScrollArea className="flex-1 p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "patient" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.sender === "patient"
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === "patient" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
