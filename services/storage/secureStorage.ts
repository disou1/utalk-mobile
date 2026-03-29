import * as SecureStore from 'expo-secure-store';
import { ApiCredentials } from '@/types/api';

const CREDENTIALS_KEY = 'umbler_talk_credentials';

export async function saveCredentials(creds: ApiCredentials): Promise<void> {
  await SecureStore.setItemAsync(CREDENTIALS_KEY, JSON.stringify(creds));
}

export async function getCredentials(): Promise<ApiCredentials | null> {
  try {
    const value = await SecureStore.getItemAsync(CREDENTIALS_KEY);
    if (!value) return null;
    return JSON.parse(value) as ApiCredentials;
  } catch {
    return null;
  }
}

export async function clearCredentials(): Promise<void> {
  await SecureStore.deleteItemAsync(CREDENTIALS_KEY);
}
