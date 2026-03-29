import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EmptyStateProps } from '@/types/ui';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { Button } from './Button';

export function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {action && (
        <View style={styles.actionContainer}>
          <Button
            title={action.label}
            onPress={action.onPress}
            variant="outline"
            size="md"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  icon: {
    fontSize: 56,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  actionContainer: {
    marginTop: spacing.lg,
  },
});
