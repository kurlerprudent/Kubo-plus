import React from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

interface MeetingButtonProps {
  meetLink: string;
  disabled?: boolean;
}

const MeetingButton: React.FC<MeetingButtonProps> = ({ 
  meetLink, 
  disabled = false 
}) => {
  const handleJoinMeeting = () => {
    if (!disabled && meetLink) {
      window.open(meetLink, "_blank", "noopener,noreferrer");
    }
  };

  if (disabled) {
    return (
      <Button
        variant="secondary"
        disabled
        className="bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
      >
        <Video className="h-4 w-4 mr-2" />
        Meeting not available
      </Button>
    );
  }

  return (
    <Button
      onClick={handleJoinMeeting}
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
    >
      <Video className="h-4 w-4 mr-2" />
      Join Google Meet
    </Button>
  );
};

export default MeetingButton;
