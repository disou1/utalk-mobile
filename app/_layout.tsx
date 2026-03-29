import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
    },
  },
});

export default function RootLayout() {
  const loadStoredCredentials = useAuthStore((s) => s.loadStoredCredentials);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    loadStoredCredentials().catch(() => {});
  }, [loadStoredCredentials]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
        <Stack.Screen
          name="conversation/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="contact/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="transfer/[id]"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
