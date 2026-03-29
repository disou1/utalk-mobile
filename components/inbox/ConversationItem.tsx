import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Conversation, ConversationChannel } from '@/types/api';
import { Avatar } from '@/components/common/Avatar';
import { Badge } from '@/components/common/Badge';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { formatRelativeTime } from '@/utils/dateUtils';

interface ConversationItemProps {
  conversation: Conversation;
  onPress: () => void;
}

const channelEmoji: Record<ConversationChannel, string> = {
  whatsapp: '💬',
  telegram: '✈️',
  instagram: '📷',
  email: '✉️',
  webchat: '🌐',
};

export function ConversationItem({ conversation, onPress }: ConversationItemProps) {
  const { contact, lastMessage, unreadCount, status, channel, updatedAt } =
    conversation;

  const timeStr = lastMessage
    ? formatRelativeTime(lastMessage.sentAt)
    : formatRelativeTime(updatedAt);

  const preview = lastMessage
    ? lastMessage.content.length > 60
      ? lastMessage.content.slice(0, 57) + '...'
      : lastMessage.content
    : 'Sem mensagens';

  const statusColor = colors.status[status];

  return (
    <TouchableOpacity
      style={[styles.container, unreadCount > 0 && styles.unread]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Avatar
          name={contact.name}
          uri={contact.avatar}
          size={50}
          showStatus
          status={status === 'open' ? 'online' : 'offline'}
        />
        <View style={styles.channelBadge}>
          <Text style={styles.channelEmoji}>{channelEmoji[channel]}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.topRow}>
          <Text
            style={[styles.name, unreadCount > 0 && styles.nameUnread]}
            numberOfLines={1}
          >
            {contact.name}
          </Text>
          <Text style={styles.time}>{timeStr}</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text
            style={[styles.preview, unreadCount > 0 && styles.previewUnread]}
            numberOfLines={1}
          >
            {preview}
          </Text>
          <View style={styles.rightMeta}>
            {unreadCount > 0 && <Badge count={unreadCount} />}
          </View>
        </View>

        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusLabel, { color: statusColor }]}>
            {statusLabels[status]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const statusLabels: Record<string, string> = {
  open: 'Aberta',
  pending: 'Pendente',
  resolved: 'Resolvida',
  transferred: 'Transferida',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm + 4,
  },
  unread: {
    backgroundColor: '#F5F3FF',
  },
  avatarContainer: {
    position: 'relative',
  },
  channelBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.surface,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  channelEmoji: {
    fontSize: 11,
  },
  body: {
    flex: 1,
    gap: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.sm,
  },
  nameUnread: {
    fontWeight: '700',
  },
  time: {
    fontSize: 12,
    color: colors.text.secondary,
    flexShrink: 0,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preview: {
    fontSize: 13,
    color: colors.text.secondary,
    flex: 1,
    marginRight: spacing.sm,
  },
  previewUnread: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  rightMeta: {
    flexShrink: 0,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});
