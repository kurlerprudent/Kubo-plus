// components/appointments/doctor/VideoCallLink.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

interface VideoCallLinkProps {
  meetingUrl: string;
}

export function VideoCallLink({ meetingUrl }: VideoCallLinkProps) {
  const handleJoinCall = () => {
    window.open(meetingUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4"
    >
      <Button 
        variant="default" 
        className="bg-blue-600 hover:bg-blue-700 w-full"
        onClick={handleJoinCall}
      >
        <Video className="h-4 w-4 mr-2" />
        Join Video Call
      </Button>
      
      <div className="mt-2 text-xs text-muted-foreground">
        <p>Meeting URL: <span className="font-mono text-xs break-all">{meetingUrl}</span></p>
      </div>
    </motion.div>
  );
}