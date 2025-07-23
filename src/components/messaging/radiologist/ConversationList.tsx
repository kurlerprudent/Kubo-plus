// components/messaging/radiologist/ConversationList.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ConversationItem from "./ConversationItem";
import { colors, Conversation } from "../types";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: number | null;
  setSelectedConversation: (id: number) => void;
}

export default function ConversationList({ 
  conversations, 
  selectedConversation,
  setSelectedConversation
}: ConversationListProps) {
  return (
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
          <ConversationItem 
            key={convo.id}
            conversation={convo}
            isSelected={selectedConversation === convo.id}
            onSelect={() => setSelectedConversation(convo.id)}
          />
        ))}
      </ScrollArea>
    </div>
  );
}