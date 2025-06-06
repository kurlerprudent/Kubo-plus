// pages/radiologist/messages.tsx
"use client"

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
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { RadiologistAppSidebar } from "@/components/app-sidebar-doctor";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Send, CircleDot, ChevronRight, Search } from "lucide-react";
  import { useState } from "react";
  
  const conversations = [
    {
      id: 1,
      patientId: "PID-2345",
      name: "Sarah Johnson",
      lastMessage: "Thank you for the detailed report!",
      timestamp: "10:30 AM",
      unread: 0,
      avatar: "/avatars/sarah.png",
      online: true,
    },
    {
      id: 2,
      patientId: "PID-6789",
      name: "Michael Chen",
      lastMessage: "I have some questions about my results...",
      timestamp: "9:45 AM",
      unread: 2,
      avatar: "/avatars/michael.png",
      online: false,
    },
    // Add 15 more sample conversations
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 3,
      patientId: `PID-${1000 + i}`,
      name: `Patient ${i + 1}`,
      lastMessage: `Sample message ${i + 1}`,
      timestamp: `${8 + i % 12}:${i % 60} ${i < 12 ? 'AM' : 'PM'}`,
      unread: i % 4 === 0 ? 1 : 0,
      avatar: "",
      online: i % 3 === 0,
    })),
  ];
  
  const initialMessages = [
    {
      id: 1,
      text: "Hello Dr. Smith, I have some questions about my X-ray results.",
      sender: "patient",
      timestamp: "9:45 AM",
    },
    {
      id: 2,
      text: "Good morning Michael, I'd be happy to clarify anything. What would you like to know?",
      sender: "radiologist",
      timestamp: "9:46 AM",
    },
    // Add more sample messages
  ];
  
  export default function MessagingPage() {
    const [selectedConversation, setSelectedConversation] = useState(1);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState(initialMessages);
  
    const handleSendMessage = () => {
      if (newMessage.trim()) {
        setMessages([
          ...messages,
          {
            id: messages.length + 1,
            text: newMessage,
            sender: "radiologist",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setNewMessage("");
      }
    };
  
    return (
      <SidebarProvider>
        <RadiologistAppSidebar />
        <SidebarInset className="flex flex-col h-screen">
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/radiologist/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Messages</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
  
          <div className="flex-1 flex">
            {/* Conversations List */}
            <div className="w-full md:w-80 border-r">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-8"
                  />
                </div>
              </div>
              <ScrollArea className="h-[calc(100vh-160px)]">
                {conversations.map((convo) => (
                  <div
                    key={convo.id}
                    onClick={() => setSelectedConversation(convo.id)}
                    className={`flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedConversation === convo.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={convo.avatar} />
                        <AvatarFallback>
                          {convo.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {convo.online && (
                        <CircleDot className="h-3 w-3 text-green-500 absolute -right-0.5 -top-0.5 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{convo.name}</h3>
                        <span className="text-xs text-gray-500">{convo.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 truncate">
                          {convo.lastMessage}
                        </p>
                        {convo.unread > 0 && (
                          <span className="bg-blue-600 text-white rounded-full px-2 py-1 text-xs">
                            {convo.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </ScrollArea>
            </div>
  
            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={conversations[0].avatar} />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">
                        {conversations.find(c => c.id === selectedConversation)?.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Patient ID: {conversations.find(c => c.id === selectedConversation)?.patientId}
                      </p>
                    </div>
                  </div>
                  <ScrollArea className="flex-1 p-4 bg-gray-50">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'radiologist' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-4 ${
                              message.sender === 'radiologist'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'radiologist'
                                ? 'text-blue-100'
                                : 'text-gray-500'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }