// components/messaging/radiologist/TypingIndicator.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { colors } from "../types";

interface TypingIndicatorProps {
  conversationName: string;
}

export default function TypingIndicator({ conversationName }: TypingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-start"
    >
      <div className="flex items-end gap-2 max-w-[85%]">
        <Avatar className="h-6 w-6">
          <AvatarFallback className="text-xs">
            {conversationName[0]}
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
  );
}