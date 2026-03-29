import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Contact } from '@/types/api';
import { getContact, updateContact } from '@/services/api/contactService';

export function useContact(id: string) {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => getContact(id),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Contact> }) =>
      updateContact(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(['contact', updated.id], updated);
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}
