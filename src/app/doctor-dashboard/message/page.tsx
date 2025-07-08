// pages/radiologist/messages.tsx
"use client";

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
import { Send, CircleDot, ChevronRight, Search, Menu, MoreVertical, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Rside from "@/components/header-right-side";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Color scheme
const colors = {
  primaryBtn: "#00FF9C",
  primaryBtnHover: "#B6FFA1",
  textColor: "#26355D",
  textColorSecondary: "#6B7280",
  background1: "#F2F2F2",
  background2: "#F5F5F5",
  background3: "#F2EFE7",
  accentBlue: "#3B82F6",
  accentRed: "#EF4444",
};

// Type definitions
type Conversation = {
  id: number;
  patientId: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
  lastOnline?: string;
  isTyping?: boolean;
};

type Message = {
  id: number;
  text: string;
  sender: "patient" | "radiologist";
  timestamp: string;
  status?: "sent" | "delivered" | "read";
  isEdited?: boolean;
};

type PatientInfo = {
  name: string;
  age: number;
  gender: string;
  lastAppointment: string;
  nextAppointment?: string;
  medicalNotes: string;
};

const generateConversations = (): Conversation[] => [
  {
    id: 1,
    patientId: "PID-2345",
    name: "Sarah Johnson",
    lastMessage: "Thank you for the detailed report!",
    timestamp: "10:30 AM",
    unread: 0,
    avatar: "",
    online: true,
    lastOnline: "Just now",
  },
  {
    id: 2,
    patientId: "PID-6789",
    name: "Michael Chen",
    lastMessage: "I have some questions about my results...",
    timestamp: "9:45 AM",
    unread: 2,
    avatar: "",
    online: false,
    lastOnline: "2 hours ago",
    isTyping: true,
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 3,
    patientId: `PID-${1000 + i}`,
    name: `Patient ${i + 1}`,
    lastMessage: `Sample message ${i + 1}`,
    timestamp: `${8 + i % 12}:${i % 60} ${i < 12 ? 'AM' : 'PM'}`,
    unread: i % 4 === 0 ? 1 : 0,
    avatar: "",
    online: i % 3 === 0,
    lastOnline: i % 3 === 0 ? "Online" : `${i % 24} hours ago`,
  })),
];

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello Dr. Smith, I have some questions about my X-ray results.",
    sender: "patient",
    timestamp: "9:45 AM",
    status: "read",
  },
  {
    id: 2,
    text: "Good morning Michael, I'd be happy to clarify anything. What would you like to know?",
    sender: "radiologist",
    timestamp: "9:46 AM",
    status: "read",
  },
  {
    id: 3,
    text: "I noticed a comment about a shadow on my left lung. Should I be concerned?",
    sender: "patient",
    timestamp: "9:48 AM",
    status: "read",
  },
  {
    id: 4,
    text: "That's a common finding and likely benign. We'll monitor it in your next scan, but no immediate action is needed.",
    sender: "radiologist",
    timestamp: "9:50 AM",
    status: "read",
  },
  {
    id: 5,
    text: "That's reassuring. When should I schedule my next appointment?",
    sender: "patient",
    timestamp: "9:51 AM",
    status: "delivered",
    isEdited: true,
  },
];

const patientInfo: PatientInfo = {
  name: "Michael Chen",
  age: 42,
  gender: "Male",
  lastAppointment: "2023-10-15",
  nextAppointment: "2024-02-20",
  medicalNotes: "History of pneumonia. Recent chest X-ray showed minor scarring but no active disease.",
};

export default function MessagingPage() {
  const [conversations] = useState<Conversation[]>(generateConversations());
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectedConvo = conversations.find(c => c.id === selectedConversation);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // Simulate typing indicator for selected conversation
    if (selectedConversation === 2) {
      const typingTimeout = setTimeout(() => {
        setIsTyping(true);
        
        const stopTyping = setTimeout(() => {
          setIsTyping(false);
          
          // Simulate receiving a new message after typing
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                id: prev.length + 1,
                text: "Actually, I just received your message. Let me check the report again.",
                sender: "patient",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: "delivered"
              }
            ]);
          }, 500);
        }, 2000);
        
        return () => clearTimeout(stopTyping);
      }, 3000);
      
      return () => clearTimeout(typingTimeout);
    }
  }, [messages, selectedConversation]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "radiologist",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "sent"
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage("");
      
      // Update message status to delivered after a delay
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMsg.id 
              ? { ...msg, status: "delivered" } 
              : msg
          )
        );
      }, 1000);
    }
  };

  return (
    <SidebarProvider>
      <RadiologistAppSidebar />
      <SidebarInset className="flex flex-col h-screen">
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

        <div 
          className="flex-1 flex"
          style={{ backgroundColor: colors.background1 }}
        >
          {/* Conversations List */}
          <div 
            className="w-full md:w-80 border-r flex flex-col"
            style={{ backgroundColor: colors.background2 }}
          >
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4" style={{ color: colors.textColorSecondary }} />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  style={{ backgroundColor: colors.background1 }}
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              {conversations.map((convo) => (
                <motion.div
                  key={convo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedConversation(convo.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 border-b cursor-pointer transition-all duration-200",
                    selectedConversation === convo.id 
                      ? "bg-white shadow-sm" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={convo.avatar} />
                      <AvatarFallback className="text-sm" style={{ backgroundColor: colors.background3, color: colors.textColor }}>
                        {convo.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {convo.online && (
                      <div className="absolute bottom-0 right-0">
                        <div className="h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 
                        className="font-medium truncate"
                        style={{ color: colors.textColor }}
                      >
                        {convo.name}
                      </h3>
                      <span 
                        className="text-xs"
                        style={{ color: colors.textColorSecondary }}
                      >
                        {convo.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      {convo.isTyping ? (
                        <motion.div
                          className="flex items-center gap-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="text-xs italic" style={{ color: colors.accentBlue }}>
                            Typing...
                          </div>
                          <div className="flex space-x-1">
                            <div className="h-1 w-1 rounded-full bg-blue-500 animate-bounce"></div>
                            <div className="h-1 w-1 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            <div className="h-1 w-1 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                          </div>
                        </motion.div>
                      ) : (
                        <p 
                          className="text-xs truncate"
                          style={{ color: colors.textColorSecondary }}
                        >
                          {convo.lastMessage}
                        </p>
                      )}
                      {convo.unread > 0 && (
                        <span 
                          className="flex-shrink-0 rounded-full px-1.5 py-0.5 text-xs font-medium"
                          style={{ backgroundColor: colors.accentBlue, color: "white" }}
                        >
                          {convo.unread}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" style={{ color: colors.textColorSecondary }} />
                </motion.div>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <div 
                  className="p-4 border-b flex items-center justify-between"
                  style={{ backgroundColor: colors.background2 }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedConvo?.avatar} />
                      <AvatarFallback className="text-sm" style={{ backgroundColor: colors.background3, color: colors.textColor }}>
                        {selectedConvo?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 
                        className="font-semibold"
                        style={{ color: colors.textColor }}
                      >
                        {selectedConvo?.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <p 
                          className="text-xs"
                          style={{ color: colors.textColorSecondary }}
                        >
                          Patient ID: {selectedConvo?.patientId}
                        </p>
                        {selectedConvo?.online ? (
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span 
                              className="text-xs"
                              style={{ color: colors.textColorSecondary }}
                            >
                              Online
                            </span>
                          </div>
                        ) : (
                          <p 
                            className="text-xs"
                            style={{ color: colors.textColorSecondary }}
                          >
                            Last online: {selectedConvo?.lastOnline}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <MoreVertical className="h-5 w-5" style={{ color: colors.textColor }} />
                    </Button>
                    
                    <AnimatePresence>
                      {isMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white border z-10"
                          style={{ backgroundColor: colors.background1 }}
                        >
                          <div className="py-1">
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" style={{ color: colors.textColor }}>
                              View Patient Profile
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" style={{ color: colors.textColor }}>
                              Medical History
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" style={{ color: colors.textColor }}>
                              Schedule Appointment
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" style={{ color: colors.textColor }}>
                              Clear Conversation
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Patient Info Bar */}
                <div 
                  className="p-3 border-b flex items-center justify-between text-xs"
                  style={{ backgroundColor: colors.background3 }}
                >
                  <div className="flex items-center gap-4">
                    <span style={{ color: colors.textColorSecondary }}>
                      <span style={{ color: colors.textColor, fontWeight: 500 }}>Age:</span> {patientInfo.age}
                    </span>
                    <span style={{ color: colors.textColorSecondary }}>
                      <span style={{ color: colors.textColor, fontWeight: 500 }}>Gender:</span> {patientInfo.gender}
                    </span>
                    <span style={{ color: colors.textColorSecondary }}>
                      <span style={{ color: colors.textColor, fontWeight: 500 }}>Last Visit:</span> {patientInfo.lastAppointment}
                    </span>
                    {patientInfo.nextAppointment && (
                      <span style={{ color: colors.textColorSecondary }}>
                        <span style={{ color: colors.textColor, fontWeight: 500 }}>Next Visit:</span> {patientInfo.nextAppointment}
                      </span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    className="rounded-full"
                    style={{ 
                      backgroundColor: colors.primaryBtn,
                      color: colors.textColor
                    }}
                  >
                    View Records
                  </Button>
                </div>
                
                <ScrollArea className="flex-1 p-4" style={{ backgroundColor: colors.background1 }}>
                  <div className="space-y-6 pb-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'radiologist' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="max-w-[85%]">
                          <div className="flex items-end gap-2">
                            {message.sender === 'patient' && (
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {selectedConvo?.name[0]}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={cn(
                                "rounded-2xl p-4",
                                message.sender === 'radiologist'
                                  ? 'rounded-br-none'
                                  : 'rounded-bl-none',
                                message.sender === 'radiologist'
                                  ? 'bg-[#00FF9C]'
                                  : 'bg-white border'
                              )}
                            >
                              <p 
                                className={cn(
                                  "text-sm",
                                  message.sender === 'radiologist' 
                                    ? 'text-[#26355D]' 
                                    : 'text-[#26355D]'
                                )}
                              >
                                {message.text}
                                {message.isEdited && (
                                  <span 
                                    className="ml-1 text-xs italic"
                                    style={{ color: colors.textColorSecondary }}
                                  >
                                    (edited)
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div 
                            className={`flex items-center mt-1 text-xs ${message.sender === 'radiologist' ? 'justify-end' : 'justify-start ml-8'}`}
                            style={{ color: colors.textColorSecondary }}
                          >
                            <span>{message.timestamp}</span>
                            {message.sender === 'radiologist' && message.status && (
                              <span className="ml-2">
                                {message.status === 'sent' && '✓'}
                                {message.status === 'delivered' && '✓✓'}
                                {message.status === 'read' && '✓✓ (Read)'}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-end gap-2 max-w-[85%]">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {selectedConvo?.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-white border rounded-2xl rounded-bl-none p-4">
                            <div className="flex space-x-1">
                              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <div 
                  className="p-4 border-t"
                  style={{ backgroundColor: colors.background2 }}
                >
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="rounded-full"
                      style={{ backgroundColor: colors.background1 }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="rounded-full"
                      style={{ 
                        backgroundColor: colors.primaryBtn,
                        color: colors.textColor
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div 
                className="flex-1 flex flex-col items-center justify-center text-center p-8"
                style={{ backgroundColor: colors.background1 }}
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8" style={{ color: colors.textColorSecondary }} />
                </div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: colors.textColor }}
                >
                  No conversation selected
                </h3>
                <p 
                  className="max-w-md"
                  style={{ color: colors.textColorSecondary }}
                >
                  Select a conversation from the list to view messages, or start a new conversation with a patient.
                </p>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}