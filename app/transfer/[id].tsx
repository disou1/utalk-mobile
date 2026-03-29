import React from 'react';
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
import { Agent } from '@/types/api';
import { useAgents } from '@/hooks/useAgents';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transferConversation } from '@/services/api/conversationService';
import { Avatar } from '@/components/common/Avatar';
import { EmptyState } from '@/components/common/EmptyState';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function TransferScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: agents, isLoading } = useAgents();

  const transfer = useMutation({
    mutationFn: (agentId: string) => transferConversation(id, agentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversation', id] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      router.back();
    },
    onError: () => {
      Alert.alert('Erro', 'Não foi possível transferir a conversa. Tente novamente.');
    },
  });

  const handleSelectAgent = (agent: Agent) => {
    Alert.alert(
      'Transferir conversa',
      `Deseja transferir esta conversa para ${agent.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Transferir',
          onPress: () => transfer.mutate(agent.id),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* Handle bar (modal indicator) */}
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Transferir conversa</Text>
          <Text style={styles.headerSubtitle}>
            Selecione um agente para assumir esta conversa
          </Text>
        </View>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando agentes...</Text>
        </View>
      ) : (
        <FlatList
          data={agents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AgentRow
              agent={item}
              onPress={() => handleSelectAgent(item)}
              isTransferring={transfer.isPending}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              icon="👤"
              title="Nenhum agente disponível"
              subtitle="Não há agentes disponíveis para transferência no momento."
            />
          }
        />
      )}

      {transfer.isPending && (
        <View style={styles.transferringOverlay}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.transferringText}>Transferindo...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

interface AgentRowProps {
  agent: Agent;
  onPress: () => void;
  isTransferring: boolean;
}

function AgentRow({ agent, onPress, isTransferring }: AgentRowProps) {
  return (
    <TouchableOpacity
      style={styles.agentRow}
      onPress={onPress}
      disabled={isTransferring}
      activeOpacity={0.7}
    >
      <Avatar name={agent.name} uri={agent.avatar} size={44} showStatus status="online" />
      <View style={styles.agentInfo}>
        <Text style={styles.agentName}>{agent.name}</Text>
        <Text style={styles.agentEmail}>{agent.email}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 4,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  listContent: {
    paddingVertical: spacing.sm,
    flexGrow: 1,
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    gap: spacing.md,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
  },
  agentEmail: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: colors.text.disabled,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.md + 44 + spacing.md,
  },
  transferringOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  transferringText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
  },
});
