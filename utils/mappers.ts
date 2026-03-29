import {
  Conversation,
  ConversationChannel,
  ConversationStatus,
} from '@/types/api';
import { formatRelativeTime } from './dateUtils';

export interface ConversationListItem {
  id: string;
  contactName: string;
  contactPhone: string;
  contactAvatar?: string;
  lastMessagePreview: string;
  lastMessageTime: string;
  unreadCount: number;
  status: ConversationStatus;
  channel: ConversationChannel;
  assignedAgentName?: string;
  tags: string[];
  isOnline: boolean;
}

export function mapConversationToListItem(
  conv: Conversation,
): ConversationListItem {
  return {
    id: conv.id,
    contactName: conv.contact.name,
    contactPhone: conv.contact.phone,
    contactAvatar: conv.contact.avatar,
    lastMessagePreview: conv.lastMessage?.content ?? 'Sem mensagens',
    lastMessageTime: conv.lastMessage
      ? formatRelativeTime(conv.lastMessage.sentAt)
      : formatRelativeTime(conv.createdAt),
    unreadCount: conv.unreadCount,
    status: conv.status,
    channel: conv.channel,
    assignedAgentName: conv.assignedAgent?.name,
    tags: conv.tags ?? [],
    isOnline: conv.status === 'open',
  };
}
