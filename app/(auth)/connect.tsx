import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { validateCredentials } from '@/services/api/authService';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function ConnectScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [apiKey, setApiKey] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    if (!apiKey.trim() || !organizationId.trim()) {
      setError('Preencha todos os campos para continuar.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const creds = { apiKey: apiKey.trim(), organizationId: organizationId.trim() };
      const valid = await validateCredentials(creds);

      if (!valid) {
        setError('Credenciais inválidas. Verifique sua API Key e Organization ID.');
        setLoading(false);
        return;
      }

      await login(creds);
      router.replace('/(app)/inbox');
    } catch {
      setError('Não foi possível conectar. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoEmoji}>💬</Text>
            </View>
            <Text style={styles.logoText}>Umbler Talk</Text>
            <Text style={styles.logoSubtext}>Atendimento ao cliente</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Conectar ao Umbler Talk</Text>
            <Text style={styles.cardSubtitle}>
              Insira suas credenciais de acesso para continuar
            </Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>API Key</Text>
              <TextInput
                style={styles.input}
                value={apiKey}
                onChangeText={setApiKey}
                placeholder="umb_xxxxxxxxxxxxxxxxxxxxx"
                placeholderTextColor={colors.text.disabled}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}
                editable={!loading}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Organization ID</Text>
              <TextInput
                style={styles.input}
                value={organizationId}
                onChangeText={setOrganizationId}
                placeholder="org_xxxxxxxxxxxxxxxxxxxxx"
                placeholderTextColor={colors.text.disabled}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonLoading]}
              onPress={handleConnect}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={colors.text.inverse} />
              ) : (
                <Text style={styles.buttonText}>Conectar</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>
            As credenciais são armazenadas com segurança no dispositivo.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoEmoji: {
    fontSize: 36,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  logoSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: spacing.md,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: -spacing.sm,
  },
  fieldContainer: {
    gap: spacing.xs,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    color: colors.text.primary,
    backgroundColor: colors.background,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    fontSize: 13,
    color: colors.error,
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  buttonLoading: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.inverse,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.text.disabled,
    marginTop: spacing.lg,
    lineHeight: 18,
  },
});
