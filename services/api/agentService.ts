import { Agent } from '@/types/api';
import apiClient from './apiClient';

export async function listAgents(): Promise<Agent[]> {
  const response = await apiClient.get<Agent[]>('/agents');
  return response.data;
}
