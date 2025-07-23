// components/messaging/types.ts


export type MessageType = "text" | "audio" | "file";

export interface BaseMessage {
  id: number;
  type: MessageType;
  sender: "patient" | "radiologist";
  timestamp: string;
  status?: MessageStatus;
  isEdited?: boolean;
}

export interface TextMessage extends BaseMessage {
  type: "text";
  text: string;
}

export interface AudioMessage extends BaseMessage {
  type: "audio";
  audioUrl: string;
  duration?: number; // Optional duration in seconds
}

export interface FileMessage extends BaseMessage {
  type: "file";
  file: {
    url: string;
    name: string;
    type: string; // MIME type or simplified 'image' | 'document'
  };
}

export type Message = TextMessage | AudioMessage | FileMessage;

// Rest of the types remain the same...
export type MessageStatus = "sent" | "delivered" | "read";

export interface Conversation {
  id: number;
  patientId: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
  lastOnline?: string;
  isTyping?: boolean;
}

export interface Conversation {
  id: number;
  patientId: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
  lastOnline?: string;
  isTyping?: boolean;
}

export interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  lastAppointment: string;
  nextAppointment?: string;
  medicalNotes: string;
}

export const colors = {
  primaryBtn: "#00FF9C",
  primaryBtnHover: "#B6FFA1",
  textColor: "#26355D",
  textColorSecondary: "#6B7280",
  background1: "#F2F2F2",
  background2: "#F5F5F5",
  background3: "#F2EFE7",
  accentBlue: "#3B82F6",
  accentRed: "#EF4444",
};