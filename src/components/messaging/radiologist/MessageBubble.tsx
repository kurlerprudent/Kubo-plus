// components/messaging/radiologist/MessageBubble.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { colors, Message } from "../types";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  conversationName: string;
}

export default function MessageBubble({ message, conversationName }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.sender === 'radiologist' ? 'justify-end' : 'justify-start'}`}
    >
      <div className="max-w-[85%]">
        <div className="flex items-end gap-2">
          {message.sender === 'patient' && (
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {conversationName[0]}
              </AvatarFallback>
            </Avatar>
          )}
          
          {message.type === "audio" ? (
            <div
              className={cn(
                "rounded-2xl p-3",
                message.sender === 'radiologist'
                  ? 'rounded-br-none'
                  : 'rounded-bl-none',
                message.sender === 'radiologist'
                  ? 'bg-[#00FF9C]'
                  : 'bg-white border'
              )}
            >
              <audio controls className="w-48">
                <source src={message.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : message.type === "file" ? (
            <div
              className={cn(
                "rounded-2xl p-3",
                message.sender === 'radiologist'
                  ? 'rounded-br-none'
                  : 'rounded-bl-none',
                message.sender === 'radiologist'
                  ? 'bg-[#00FF9C]'
                  : 'bg-white border'
              )}
            >
              <div className="flex items-center gap-2">
                <div className="bg-gray-200 rounded-md p-2">
                  {message.file.type.startsWith('image') ? (
                    <img 
                      src={message.file.url} 
                      alt={message.file.name} 
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ) : (
                    <div className="bg-gray-100 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                      <span className="text-xs">📄</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{message.file.name}</p>
                  <p className="text-xs text-gray-500">{message.file.type}</p>
                </div>
              </div>
            </div>
          ) : (
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
                {"isEdited" in message && message.isEdited && (
                  <span 
                    className="ml-1 text-xs italic"
                    style={{ color: colors.textColorSecondary }}
                  >
                    (edited)
                  </span>
                )}
              </p>
            </div>
          )}
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
  );
}