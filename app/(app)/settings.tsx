import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

function maskApiKey(apiKey: string): string {
  if (apiKey.length <= 8) return '••••••••';
  return apiKey.slice(0, 6) + '••••••••' + apiKey.slice(-4);
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

interface RowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

function Row({ label, value, isLast }: RowProps) {
  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

export default function SettingsScreen() {
  const credentials = useAuthStore((s) => s.credentials);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    Alert.alert(
      'Desconectar',
      'Tem certeza que deseja desconectar da conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Desconectar',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ],
    );
  };

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Section title="Credenciais">
          <Row
            label="API Key"
            value={credentials ? maskApiKey(credentials.apiKey) : '—'}
          />
          <Row
            label="Organization ID"
            value={credentials?.organizationId ?? '—'}
            isLast
          />
        </Section>

        <Section title="Sobre">
          <Row label="Versão do app" value={appVersion} />
          <Row label="Plataforma" value="Umbler Talk" isLast />
        </Section>

        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>🚪  Desconectar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Umbler Talk Mobile v{appVersion}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text.primary,
  },
  content: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  section: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingLeft: spacing.xs,
    marginBottom: 4,
  },
  sectionCard: {
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
    paddingVertical: 14,
    gap: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
    textAlign: 'right',
    fontFamily: 'monospace' as never,
  },
  logoutContainer: {
    marginTop: spacing.md,
  },
  logoutButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.error,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.text.disabled,
    marginTop: spacing.lg,
  },
});
