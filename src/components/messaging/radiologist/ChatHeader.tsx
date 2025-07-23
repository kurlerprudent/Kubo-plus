// components/messaging/radiologist/ChatHeader.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Conversation } from "../types";
import { colors } from "../types";

interface ChatHeaderProps {
  conversation: Conversation;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function ChatHeader({ 
  conversation, 
  isMenuOpen,
  setIsMenuOpen
}: ChatHeaderProps) {
  return (
    <div 
      className="p-4 border-b flex items-center justify-between"
      style={{ backgroundColor: colors.background2 }}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={conversation.avatar} />
          <AvatarFallback className="text-sm" style={{ backgroundColor: colors.background3, color: colors.textColor }}>
            {conversation.name
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
            {conversation.name}
          </h2>
          <div className="flex items-center gap-2">
            <p 
              className="text-xs"
              style={{ color: colors.textColorSecondary }}
            >
              Patient ID: {conversation.patientId}
            </p>
            {conversation.online ? (
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
                Last online: {conversation.lastOnline}
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
  );
}