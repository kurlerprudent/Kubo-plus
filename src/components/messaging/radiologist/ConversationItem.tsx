// components/messaging/radiologist/ConversationItem.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { colors, Conversation } from "../types";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ConversationItem({ 
  conversation, 
  isSelected,
  onSelect
}: ConversationItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onSelect}
      className={cn(
        "flex items-center gap-4 p-4 border-b cursor-pointer transition-all duration-200",
        isSelected 
          ? "bg-white shadow-sm" 
          : "hover:bg-gray-50"
      )}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={conversation.avatar} />
          <AvatarFallback className="text-sm" style={{ backgroundColor: colors.background3, color: colors.textColor }}>
            {conversation.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        {conversation.online && (
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
            {conversation.name}
          </h3>
          <span 
            className="text-xs"
            style={{ color: colors.textColorSecondary }}
          >
            {conversation.timestamp}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          {conversation.isTyping ? (
            <div className="flex items-center gap-1">
              <div className="text-xs italic" style={{ color: colors.accentBlue }}>
                Typing...
              </div>
              <div className="flex space-x-1">
                <div className="h-1 w-1 rounded-full bg-blue-500 animate-bounce"></div>
                <div className="h-1 w-1 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="h-1 w-1 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          ) : (
            <p 
              className="text-xs truncate"
              style={{ color: colors.textColorSecondary }}
            >
              {conversation.lastMessage}
            </p>
          )}
          {conversation.unread > 0 && (
            <span 
              className="flex-shrink-0 rounded-full px-1.5 py-0.5 text-xs font-medium"
              style={{ backgroundColor: colors.accentBlue, color: "white" }}
            >
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
      <ChevronRight className="h-4 w-4" style={{ color: colors.textColorSecondary }} />
    </motion.div>
  );
}