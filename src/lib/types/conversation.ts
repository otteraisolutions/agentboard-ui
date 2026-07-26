export type ConversationStatus = "active" | "completed" | "expired" | "closed";

export interface ConversationSummary {
  conversationId: string;
  phoneNumber: string;
  status: ConversationStatus | string;
  messageCount: number | null;
  startedAt: string | null;
  lastMessageAt: string | null;
  topic: string | null;
  userId: string | null;
  userName: string | null;
}

export interface ChatMessage {
  messageId: string;
  sender: "user" | "bot" | string;
  text: string;
  channel: string | null;
  createdAt: string | null;
  threadId: string | null;
  requestId: string | null;
  conversationId: string | null;
  metadata: Record<string, string> | null;
}

export interface ConversationNote {
  id: number;
  conversationId: string;
  authorId: number;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface UserProfile {
  userId: string;
  phoneNumber: string | null;
  documentType: string | null;
  documentNumber: string | null;
  name: string | null;
  email: string | null;
  habeasDataAccepted: boolean | null;
  isIdentified: boolean | null;
  isRegistered: boolean | null;
  flowStep: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ConversationDetail {
  conversation: ConversationSummary;
  user: UserProfile | null;
  messages: ChatMessage[];
  messageSourceKeys: string[];
  notes: ConversationNote[];
}
