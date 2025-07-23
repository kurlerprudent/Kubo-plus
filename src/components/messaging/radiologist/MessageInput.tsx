// components/messaging/radiologist/MessageInput.tsx
import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Paperclip } from "lucide-react";
import { colors } from "../types";

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSend: () => void;
  onAudioRecord: (audioUrl: string) => void;
  onFileUpload: (file: File) => void;
  isRecording: boolean;
}

export default function MessageInput({ 
  newMessage, 
  setNewMessage, 
  onSend, 
  onAudioRecord,
  onFileUpload,
  isRecording
}: MessageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      className="p-4 border-t"
      style={{ backgroundColor: colors.background2 }}
    >
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" style={{ color: colors.textColor }} />
        </Button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,application/pdf"
        />
        
        <Button 
          variant={isRecording ? "destructive" : "ghost"} 
          size="icon"
          onClick={() => onAudioRecord("")}
        >
          <Mic className="h-5 w-5" />
        </Button>
        
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder="Type your message..."
          className="rounded-full flex-1"
          style={{ backgroundColor: colors.background1 }}
        />
        
        <Button 
          onClick={onSend}
          className="rounded-full"
          style={{ 
            backgroundColor: colors.primaryBtn,
            color: colors.textColor
          }}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {isRecording && (
        <div className="mt-2 text-center text-sm text-red-500">
          Recording... Click again to stop
        </div>
      )}
    </div>
  );
}