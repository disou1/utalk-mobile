import { create } from 'zustand';
import { InboxFilters } from '@/types/api';
import { saveInboxFilters } from '@/services/storage/asyncStorage';

const defaultFilters: InboxFilters = {};

interface InboxStore {
  filters: InboxFilters;
  setFilters: (filters: Partial<InboxFilters>) => void;
  resetFilters: () => void;
  selectedConversationId: string | null;
  setSelectedConversation: (id: string | null) => void;
}

export const useInboxStore = create<InboxStore>((set, get) => ({
  filters: defaultFilters,
  selectedConversationId: null,

  setFilters: (newFilters: Partial<InboxFilters>) => {
    const merged = { ...get().filters, ...newFilters };
    set({ filters: merged });
    saveInboxFilters(merged).catch(() => {});
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
    saveInboxFilters(defaultFilters).catch(() => {});
  },

  setSelectedConversation: (id: string | null) => {
    set({ selectedConversationId: id });
  },
}));
