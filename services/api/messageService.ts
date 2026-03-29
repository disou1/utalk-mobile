import { Message, MessageType, PaginatedResponse } from '@/types/api';
import apiClient from './apiClient';

export async function listMessages(
  conversationId: string,
  page: number,
): Promise<PaginatedResponse<Message>> {
  const response = await apiClient.get<PaginatedResponse<Message>>(
    `/conversations/${conversationId}/messages`,
    { params: { page, pageSize: 30 } },
  );
  return response.data;
}

export async function sendMessage(
  conversationId: string,
  content: string,
  type: MessageType = 'text',
): Promise<Message> {
  const response = await apiClient.post<Message>(
    `/conversations/${conversationId}/messages`,
    { content, type },
  );
  return response.data;
}
