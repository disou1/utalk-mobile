import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Message } from '@/types/api';
import {
  useConversation,
  useMessages,
  useSendMessage,
} from '@/hooks/useConversation';
import { useUpdateConversationStatus } from '@/hooks/useInbox';
import { MessageBubble } from '@/components/conversation/MessageBubble';
import { MessageComposer } from '@/components/conversation/MessageComposer';
import { Avatar } from '@/components/common/Avatar';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: conversation, isLoading: convLoading } = useConversation(id);
  const {
    data: messagesData,
    isLoading: msgsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useMessages(id);

  const sendMessage = useSendMessage(id);
  const updateStatus = useUpdateConversationStatus();

  const messages = useMemo(
    () => messagesData?.pages.flatMap((p) => p.data) ?? [],
    [messagesData],
  );

  const handleSend = useCallback(
    (text: string) => {
      sendMessage.mutate(text);
    },
    [sendMessage],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleStatusChange = () => {
    if (!conversation) return;
    const newStatus = conversation.status === 'open' ? 'resolved' : 'open';
    Alert.alert(
      'Alterar status',
      `Deseja ${newStatus === 'resolved' ? 'resolver' : 'reabrir'} esta conversa?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () =>
            updateStatus.mutate({ id, status: newStatus }),
        },
      ],
    );
  };

  const handleTransfer = () => {
    router.push(`/transfer/${id}`);
  };

  if (convLoading || msgsLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!conversation) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Conversa não encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  const statusColor = colors.status[conversation.status];
  const statusLabels: Record<string, string> = {
    open: 'Aberta',
    pending: 'Pendente',
    resolved: 'Resolvida',
    transferred: 'Transferida',
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactInfo}
          onPress={() => router.push(`/contact/${conversation.contact.id}`)}
          activeOpacity={0.7}
        >
          <Avatar
            name={conversation.contact.name}
            uri={conversation.contact.avatar}
            size={36}
          />
          <View style={styles.contactText}>
            <Text style={styles.contactName} numberOfLines={1}>
              {conversation.contact.name}
            </Text>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusLabel, { color: statusColor }]}>
                {statusLabels[conversation.status]}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleStatusChange}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>
              {conversation.status === 'resolved' ? '🔄' : '✅'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleTransfer}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>↗️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item: Message) => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            isOwn={item.sender === 'agent' || item.sender === 'bot'}
          />
        )}
        inverted
        contentContainerStyle={styles.messageList}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator color={colors.primary} size="small" />
            </View>
          ) : null
        }
      />

      {/* Composer */}
      <MessageComposer
        onSend={handleSend}
        disabled={
          sendMessage.isPending || conversation.status === 'resolved'
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: colors.primary,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  contactText: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 18,
  },
  messageList: {
    paddingVertical: spacing.sm,
    gap: 4,
  },
  footerLoader: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
});
