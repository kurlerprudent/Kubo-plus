// pages/radiologist/messages.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { RadiologistAppSidebar } from "@/components/app-sidebar-doctor";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import MessageHeader from "@/components/messaging/radiologist/MessageHeader";
import ConversationList from "@/components/messaging/radiologist/ConversationList";
import ChatWindow from "@/components/messaging/radiologist/ChatWindow";
import { generateConversations, initialMessages, patientInfo } from "@/lib/messaging-mocks";
import { colors, Conversation, Message, PatientInfo, TextMessage } from "@/components/messaging/types";

export default function MessagingPage() {
  const [conversations] = useState<Conversation[]>(generateConversations());
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  
  const selectedConvo = conversations.find(c => c.id === selectedConversation);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    const scrollToBottom = () => {
      const container = document.querySelector('[data-radix-scroll-area-viewport]');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    };
    
    scrollToBottom();
    
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
                type: "text",
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
      const newMsg: TextMessage = {
        id: messages.length + 1,
        type: "text",
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

  const handleAudioRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        audioChunks.current = [];
        
        recorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        
        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/mpeg' });
          const audioUrl = URL.createObjectURL(audioBlob);
          
          setMessages(prev => [
            ...prev,
            {
              id: prev.length + 1,
              type: "audio",
              audioUrl,
              sender: "radiologist",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: "sent"
            }
          ]);
          
          stream.getTracks().forEach(track => track.stop());
        };
        
        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert("Microphone access denied. Please allow microphone permissions.");
      }
    } else {
      mediaRecorder?.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileUrl = e.target?.result as string;
      
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          type: "file",
          sender: "radiologist",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "sent",
          file: {
            url: fileUrl,
            name: file.name,
            type: file.type
          }
        }
      ]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <SidebarProvider>
      <RadiologistAppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        <MessageHeader />
        
        <div 
          className="flex-1 flex"
          style={{ backgroundColor: colors.background1 }}
        >
          <ConversationList 
            conversations={conversations}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
          />
          
          <ChatWindow
            conversation={selectedConvo}
            patientInfo={patientInfo}
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSend={handleSendMessage}
            onAudioRecord={handleAudioRecord}
            onFileUpload={handleFileUpload}
            isRecording={isRecording}
            isTyping={isTyping}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}