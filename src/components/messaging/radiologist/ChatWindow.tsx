// components/messaging/radiologist/ChatWindow.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { colors, Message } from "../types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatHeader from "./ChatHeader";
import PatientInfoBar from "./PatientInfoBar";
import MessageInput from "./MessageInput";
import { Conversation, PatientInfo } from "../types";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface ChatWindowProps {
  conversation: Conversation | undefined;
  patientInfo: PatientInfo;
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSend: () => void;
  onAudioRecord: () => void;
  onFileUpload: (file: File) => void;
  isRecording: boolean;
  isTyping: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function ChatWindow({
  conversation,
  patientInfo,
  messages,
  newMessage,
  setNewMessage,
  onSend,
  onAudioRecord,
  onFileUpload,
  isRecording,
  isTyping,
  isMenuOpen,
  setIsMenuOpen
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  if (!conversation) {
    return (
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
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader 
        conversation={conversation} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      <PatientInfoBar patientInfo={patientInfo} />
      
      <ScrollArea className="flex-1 p-4" style={{ backgroundColor: colors.background1 }}>
        <div className="space-y-6 pb-4">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id}
              message={message}
              conversationName={conversation.name}
            />
          ))}
          
          {isTyping && (
            <TypingIndicator conversationName={conversation.name} />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <MessageInput 
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSend={onSend}
        onAudioRecord={onAudioRecord}
        onFileUpload={onFileUpload}
        isRecording={isRecording}
      />
    </div>
  );
}