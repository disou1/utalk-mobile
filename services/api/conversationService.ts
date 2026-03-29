import {
  Conversation,
  ConversationStatus,
  InboxFilters,
  PaginatedResponse,
} from '@/types/api';
import apiClient from './apiClient';

export async function listConversations(
  filters: InboxFilters,
  page: number,
): Promise<PaginatedResponse<Conversation>> {
  const params: Record<string, unknown> = { page, pageSize: 20 };

  if (filters.status) params.status = filters.status;
  if (filters.channel) params.channel = filters.channel;
  if (filters.assignedToMe) params.assignedToMe = filters.assignedToMe;
  if (filters.search) params.search = filters.search;

  const response = await apiClient.get<PaginatedResponse<Conversation>>(
    '/conversations',
    { params },
  );
  return response.data;
}

export async function getConversation(id: string): Promise<Conversation> {
  const response = await apiClient.get<Conversation>(`/conversations/${id}`);
  return response.data;
}

export async function updateStatus(
  id: string,
  status: ConversationStatus,
): Promise<Conversation> {
  const response = await apiClient.patch<Conversation>(
    `/conversations/${id}/status`,
    { status },
  );
  return response.data;
}

export async function transferConversation(
  id: string,
  agentId: string,
): Promise<Conversation> {
  const response = await apiClient.post<Conversation>(
    `/conversations/${id}/transfer`,
    { agentId },
  );
  return response.data;
}
