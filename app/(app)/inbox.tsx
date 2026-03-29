import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Conversation } from '@/types/api';
import { useConversations } from '@/hooks/useInbox';
import { useInboxStore } from '@/store/inboxStore';
import { ConversationItem } from '@/components/inbox/ConversationItem';
import { InboxFilters } from '@/components/inbox/InboxFilters';
import { EmptyState } from '@/components/common/EmptyState';
import { ConversationSkeleton } from '@/components/common/Skeleton';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function InboxScreen() {
  const router = useRouter();
  const filters = useInboxStore((s) => s.filters);
  const setFilters = useInboxStore((s) => s.setFilters);
  const setSelectedConversation = useInboxStore((s) => s.setSelectedConversation);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useConversations(filters);

  const conversations = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data],
  );

  const totalUnread = useMemo(
    () => conversations.reduce((acc, c) => acc + c.unreadCount, 0),
    [conversations],
  );

  const handlePressConversation = useCallback(
    (conv: Conversation) => {
      setSelectedConversation(conv.id);
      router.push(`/conversation/${conv.id}`);
    },
    [router, setSelectedConversation],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header totalUnread={0} />
        <InboxFilters filters={filters} onChange={setFilters} />
        {Array.from({ length: 8 }).map((_, i) => (
          <ConversationSkeleton key={i} />
        ))}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <Header totalUnread={totalUnread} />
      <InboxFilters filters={filters} onChange={setFilters} />
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationItem
            conversation={item}
            onPress={() => handlePressConversation(item)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyState
            icon="💬"
            title="Nenhuma conversa encontrada"
            subtitle="Tente ajustar os filtros ou aguarde novas mensagens chegarem."
            action={{
              label: 'Limpar filtros',
              onPress: () =>
                setFilters({ status: undefined, channel: undefined }),
            }}
          />
        }
        contentContainerStyle={
          conversations.length === 0 ? styles.emptyContainer : undefined
        }
      />
    </SafeAreaView>
  );
}

function Header({ totalUnread }: { totalUnread: number }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Caixa de Entrada</Text>
      {totalUnread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>
            {totalUnread > 99 ? '99+' : totalUnread}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text.primary,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text.inverse,
  },
  footerLoader: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
  },
});
