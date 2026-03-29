import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '@/types/api';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { formatTime } from '@/utils/dateUtils';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

function StatusIcon({ status }: { status: Message['status'] }) {
  switch (status) {
    case 'read':
      return <Text style={styles.statusIconRead}>✓✓</Text>;
    case 'delivered':
      return <Text style={styles.statusIcon}>✓✓</Text>;
    case 'sent':
      return <Text style={styles.statusIcon}>✓</Text>;
    default:
      return null;
  }
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const timeStr = formatTime(message.sentAt);

  return (
    <View style={[styles.wrapper, isOwn ? styles.wrapperOwn : styles.wrapperOther]}>
      <View
        style={[
          styles.bubble,
          isOwn ? styles.bubbleOwn : styles.bubbleOther,
        ]}
      >
        <Text style={[styles.content, isOwn ? styles.contentOwn : styles.contentOther]}>
          {message.content}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.time, isOwn ? styles.timeOwn : styles.timeOther]}>
            {timeStr}
          </Text>
          {isOwn && <StatusIcon status={message.status} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 2,
    paddingHorizontal: spacing.md,
    maxWidth: '80%',
  },
  wrapperOwn: {
    alignSelf: 'flex-end',
  },
  wrapperOther: {
    alignSelf: 'flex-start',
  },
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: '100%',
  },
  bubbleOwn: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    fontSize: 15,
    lineHeight: 21,
  },
  contentOwn: {
    color: colors.text.inverse,
  },
  contentOther: {
    color: colors.text.primary,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 3,
  },
  time: {
    fontSize: 11,
  },
  timeOwn: {
    color: 'rgba(255,255,255,0.7)',
  },
  timeOther: {
    color: colors.text.secondary,
  },
  statusIcon: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  statusIconRead: {
    fontSize: 11,
    color: '#93C5FD',
  },
});
