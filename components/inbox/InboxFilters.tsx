import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  InboxFilters as InboxFiltersType,
  ConversationStatus,
  ConversationChannel,
} from '@/types/api';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface InboxFiltersProps {
  filters: InboxFiltersType;
  onChange: (f: InboxFiltersType) => void;
}

interface FilterChip {
  label: string;
  value: string | undefined;
  field: 'status' | 'channel';
}

const statusChips: FilterChip[] = [
  { label: 'Todas', value: undefined, field: 'status' },
  { label: 'Abertas', value: 'open', field: 'status' },
  { label: 'Pendentes', value: 'pending', field: 'status' },
  { label: 'Resolvidas', value: 'resolved', field: 'status' },
  { label: 'Transferidas', value: 'transferred', field: 'status' },
];

const channelChips: FilterChip[] = [
  { label: 'Todos canais', value: undefined, field: 'channel' },
  { label: '💬 WhatsApp', value: 'whatsapp', field: 'channel' },
  { label: '✈️ Telegram', value: 'telegram', field: 'channel' },
  { label: '📷 Instagram', value: 'instagram', field: 'channel' },
  { label: '✉️ E-mail', value: 'email', field: 'channel' },
  { label: '🌐 Webchat', value: 'webchat', field: 'channel' },
];

function Chip({
  label,
  active,
  onPress,
  accentColor,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  accentColor?: string;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        active && { backgroundColor: accentColor ?? colors.primary, borderColor: accentColor ?? colors.primary },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function InboxFilters({ filters, onChange }: InboxFiltersProps) {
  const handleStatusChange = (value: string | undefined) => {
    onChange({ ...filters, status: value as ConversationStatus | undefined });
  };

  const handleChannelChange = (value: string | undefined) => {
    onChange({ ...filters, channel: value as ConversationChannel | undefined });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {statusChips.map((chip) => (
          <Chip
            key={chip.label}
            label={chip.label}
            active={filters.status === chip.value}
            onPress={() => handleStatusChange(chip.value)}
          />
        ))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {channelChips.map((chip) => (
          <Chip
            key={chip.label}
            label={chip.label}
            active={filters.channel === chip.value}
            onPress={() => handleChannelChange(chip.value)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    alignItems: 'center',
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipText: {
    fontSize: 13,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  chipTextActive: {
    color: colors.text.inverse,
  },
});
