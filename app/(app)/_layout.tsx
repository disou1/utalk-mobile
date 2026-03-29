import React from 'react';
import { Tabs } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={[styles.iconWrapper, focused && styles.iconFocused]}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
  );
}

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Caixa de Entrada',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="💬" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="⚙️" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 2,
    borderRadius: 8,
  },
  iconFocused: {
    backgroundColor: '#EDE9FE',
  },
  emoji: {
    fontSize: 22,
  },
});
