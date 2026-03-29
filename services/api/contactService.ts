import { Contact } from '@/types/api';
import apiClient from './apiClient';

export async function getContact(id: string): Promise<Contact> {
  const response = await apiClient.get<Contact>(`/contacts/${id}`);
  return response.data;
}

export async function updateContact(
  id: string,
  data: Partial<Contact>,
): Promise<Contact> {
  const response = await apiClient.patch<Contact>(`/contacts/${id}`, data);
  return response.data;
}
