import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { getInitials } from '@/utils/phoneUtils';

interface AvatarProps {
  name: string;
  uri?: string;
  size?: number;
  showStatus?: boolean;
  status?: 'online' | 'offline';
}

function stringToColor(str: string): string {
  const palette = [
    '#6C3CE1',
    '#10B981',
    '#3B82F6',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#EC4899',
    '#14B8A6',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}

export function Avatar({
  name,
  uri,
  size = 44,
  showStatus = false,
  status = 'offline',
}: AvatarProps) {
  const initials = getInitials(name);
  const bgColor = stringToColor(name);
  const fontSize = size * 0.38;
  const statusSize = size * 0.28;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: bgColor,
            },
          ]}
        >
          <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
        </View>
      )}
      {showStatus && (
        <View
          style={[
            styles.statusDot,
            {
              width: statusSize,
              height: statusSize,
              borderRadius: statusSize / 2,
              backgroundColor:
                status === 'online' ? colors.success : colors.text.disabled,
              bottom: 0,
              right: 0,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.text.inverse,
    fontWeight: '600',
  },
  statusDot: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.surface,
  },
});
