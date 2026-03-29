import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { Message, PaginatedResponse } from '@/types/api';
import { getConversation } from '@/services/api/conversationService';
import { listMessages, sendMessage } from '@/services/api/messageService';

export function useConversation(id: string) {
  return useQuery({
    queryKey: ['conversation', id],
    queryFn: () => getConversation(id),
    enabled: Boolean(id),
    staleTime: 15_000,
  });
}

export function useMessages(conversationId: string) {
  return useInfiniteQuery({
    queryKey: ['messages', conversationId],
    queryFn: ({ pageParam = 1 }) =>
      listMessages(conversationId, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageSize, total } = lastPage;
      const totalPages = Math.ceil(total / pageSize);
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 5_000,
  });
}

export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => sendMessage(conversationId, content),
    onMutate: async (content: string) => {
      await queryClient.cancelQueries({ queryKey: ['messages', conversationId] });

      const previousData = queryClient.getQueryData<
        InfiniteData<PaginatedResponse<Message>>
      >(['messages', conversationId]);

      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        conversationId,
        content,
        type: 'text',
        sender: 'agent',
        sentAt: new Date().toISOString(),
        status: 'sent',
      };

      queryClient.setQueryData<InfiniteData<PaginatedResponse<Message>>>(
        ['messages', conversationId],
        (old) => {
          if (!old) return old;
          const pages = [...old.pages];
          if (pages.length > 0) {
            pages[0] = {
              ...pages[0],
              data: [optimisticMessage, ...pages[0].data],
            };
          }
          return { ...old, pages };
        },
      );

      return { previousData };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['messages', conversationId],
          context.previousData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}
