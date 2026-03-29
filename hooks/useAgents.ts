import { useQuery } from '@tanstack/react-query';
import { listAgents } from '@/services/api/agentService';

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: listAgents,
    staleTime: 5 * 60_000,
  });
}
