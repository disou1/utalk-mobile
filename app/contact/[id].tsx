import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useContact } from '@/hooks/useContact';
import { Avatar } from '@/components/common/Avatar';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { formatPhone } from '@/utils/phoneUtils';
import { formatDate } from '@/utils/dateUtils';

export default function ContactScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: contact, isLoading } = useContact(id);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!contact) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contato não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contato</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Contact Header */}
        <View style={styles.contactHeader}>
          <Avatar name={contact.name} uri={contact.avatar} size={80} />
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactPhone}>{formatPhone(contact.phone)}</Text>
          {contact.email && (
            <Text style={styles.contactEmail}>{contact.email}</Text>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações</Text>
          <View style={styles.card}>
            <InfoRow label="📱 Telefone" value={formatPhone(contact.phone)} />
            {contact.email && (
              <InfoRow label="✉️ E-mail" value={contact.email} />
            )}
            <InfoRow
              label="📅 Cadastrado em"
              value={formatDate(contact.createdAt)}
              isLast
            />
          </View>
        </View>

        {/* Tags */}
        {contact.tags && contact.tags.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {contact.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonText}>💬  Ver conversas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
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
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.primary,
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
  content: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
  },
  contactHeader: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  contactName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
  },
  contactPhone: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  contactEmail: {
    fontSize: 14,
    color: colors.primary,
  },
  section: {
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingLeft: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 13,
    gap: spacing.sm,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  rowValue: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: '#EDE9FE',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  tagText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  actionsSection: {
    marginTop: spacing.sm,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.inverse,
  },
});
