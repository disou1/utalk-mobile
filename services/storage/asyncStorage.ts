import AsyncStorage from '@react-native-async-storage/async-storage';
import { InboxFilters } from '@/types/api';

const INBOX_FILTERS_KEY = '@umbler_talk/inbox_filters';

export async function saveInboxFilters(filters: InboxFilters): Promise<void> {
  await AsyncStorage.setItem(INBOX_FILTERS_KEY, JSON.stringify(filters));
}

export async function getInboxFilters(): Promise<InboxFilters | null> {
  try {
    const value = await AsyncStorage.getItem(INBOX_FILTERS_KEY);
    if (!value) return null;
    return JSON.parse(value) as InboxFilters;
  } catch {
    return null;
  }
}

export async function clearAll(): Promise<void> {
  await AsyncStorage.clear();
}
