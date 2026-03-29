import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface BadgeProps {
  count: number;
  max?: number;
}

export function Badge({ count, max = 99 }: BadgeProps) {
  if (count === 0) return null;

  const displayText = count > max ? `${max}+` : String(count);
  const isLarge = displayText.length > 2;

  return (
    <View style={[styles.badge, isLarge && styles.badgeLarge]}>
      <Text style={styles.text}>{displayText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeLarge: {
    minWidth: 28,
    borderRadius: 12,
  },
  text: {
    color: colors.text.inverse,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 13,
  },
});
