import { Conversation, PatientInfo, Message } from "@/components/messaging/types";

export const generateConversations = (): Conversation[] => [
  {
    id: 1,
    patientId: "PID-2345",
    name: "Sarah Johnson",
    lastMessage: "Thank you for the detailed report!",
    timestamp: "10:30 AM",
    unread: 0,
    avatar: "",
    online: true,
    lastOnline: "Just now",
  },
  {
    id: 2,
    patientId: "PID-6789",
    name: "Michael Chen",
    lastMessage: "I have some questions about my results...",
    timestamp: "9:45 AM",
    unread: 2,
    avatar: "",
    online: false,
    lastOnline: "2 hours ago",
    isTyping: true,
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 3,
    patientId: `PID-${1000 + i}`,
    name: `Patient ${i + 1}`,
    lastMessage: `Sample message ${i + 1}`,
    timestamp: `${8 + i % 12}:${i % 60} ${i < 12 ? 'AM' : 'PM'}`,
    unread: i % 4 === 0 ? 1 : 0,
    avatar: "",
    online: i % 3 === 0,
    lastOnline: i % 3 === 0 ? "Online" : `${i % 24} hours ago`,
  })),
];

export const initialMessages: Message[] = [
  {
    id: 1,
    type: "text",
    text: "Hello Dr. Smith, I have some questions about my X-ray results.",
    sender: "patient",
    timestamp: "9:45 AM",
    status: "read",
  },
  {
    id: 2,
    type: "text",
    text: "Good morning Michael, I'd be happy to clarify anything. What would you like to know?",
    sender: "radiologist",
    timestamp: "9:46 AM",
    status: "read",
  },
  {
    id: 3,
    type: "text",
    text: "I noticed a comment about a shadow on my left lung. Should I be concerned?",
    sender: "patient",
    timestamp: "9:48 AM",
    status: "read",
  },
  {
    id: 4,
    type: "text",
    text: "That's a common finding and likely benign. We'll monitor it in your next scan, but no immediate action is needed.",
    sender: "radiologist",
    timestamp: "9:50 AM",
    status: "read",
  },
  {
    id: 5,
    type: "text",
    text: "That's reassuring. When should I schedule my next appointment?",
    sender: "patient",
    timestamp: "9:51 AM",
    status: "delivered",
    isEdited: true,
  },
];

export const patientInfo: PatientInfo = {
  name: "Michael Chen",
  age: 42,
  gender: "Male",
  lastAppointment: "2023-10-15",
  nextAppointment: "2024-02-20",
  medicalNotes: "History of pneumonia. Recent chest X-ray showed minor scarring but no active disease.",
};

// Generate mock data for file uploads and audio messages
export const generateMockFile = (type: 'image' | 'document'): Message => {
  const id = Date.now();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  if (type === 'image') {
    return {
      id,
      type: "file",
      sender: "patient",
      timestamp,
      status: "delivered",
      file: {
        url: "/placeholder-image.jpg",
        name: "xray-result.jpg",
        type: "image/jpeg"
      }
    };
  }
  
  return {
    id,
    type: "file",
    sender: "patient",
    timestamp,
    status: "delivered",
    file: {
      url: "/medical-report.pdf",
      name: "medical-report.pdf",
      type: "application/pdf"
    }
  };
};

export const generateMockAudio = (): Message => {
  return {
    id: Date.now(),
    type: "audio",
    sender: "patient",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: "delivered",
    audioUrl: "/sample-audio.mp3"
  };
};