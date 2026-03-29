import { create } from 'zustand';
import { ApiCredentials } from '@/types/api';
import {
  saveCredentials,
  getCredentials,
  clearCredentials,
} from '@/services/storage/secureStorage';
import {
  setApiCredentials,
  clearApiCredentials,
} from '@/services/api/apiClient';

interface AuthStore {
  credentials: ApiCredentials | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (creds: ApiCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loadStoredCredentials: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  credentials: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (creds: ApiCredentials) => {
    await saveCredentials(creds);
    setApiCredentials(creds);
    set({ credentials: creds, isAuthenticated: true, isLoading: false });
  },

  logout: async () => {
    await clearCredentials();
    clearApiCredentials();
    set({ credentials: null, isAuthenticated: false, isLoading: false });
  },

  loadStoredCredentials: async () => {
    set({ isLoading: true });
    try {
      const creds = await getCredentials();
      if (creds) {
        setApiCredentials(creds);
        set({ credentials: creds, isAuthenticated: true, isLoading: false });
      } else {
        set({ credentials: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ credentials: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
