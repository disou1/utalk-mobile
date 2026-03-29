export interface ApiCredentials {
  apiKey: string;
  organizationId: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  tags?: string[];
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type ConversationStatus = 'open' | 'pending' | 'resolved' | 'transferred';

export type ConversationChannel =
  | 'whatsapp'
  | 'telegram'
  | 'instagram'
  | 'email'
  | 'webchat';

export type MessageType = 'text' | 'image' | 'audio' | 'document';
export type MessageSender = 'contact' | 'agent' | 'bot';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  type: MessageType;
  sender: MessageSender;
  sentAt: string;
  status: MessageStatus;
}

export interface Conversation {
  id: string;
  contact: Contact;
  lastMessage?: Message;
  unreadCount: number;
  status: ConversationStatus;
  channel: ConversationChannel;
  assignedAgent?: Agent;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface InboxFilters {
  status?: ConversationStatus;
  channel?: ConversationChannel;
  assignedToMe?: boolean;
  search?: string;
}
