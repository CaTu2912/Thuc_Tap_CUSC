import { create } from 'zustand';
import { AccessHistory } from '../types/History';

interface HistoryFilters {
  fromDate?: string;
  toDate?: string;
  mssv?: string;
  fullName?: string;
  dormitoryId?: string;
  roomId?: string;
  type?: 'IN' | 'OUT' | 'ALL';
}

interface HistoryState {
  filters: HistoryFilters;
  selectedHistory: AccessHistory | null;
  detailDrawerOpen: boolean;
  formDrawerOpen: boolean;
  setFilters: (filters: HistoryFilters) => void;
  resetFilters: () => void;
  setSelectedHistory: (history: AccessHistory | null) => void;
  setDetailDrawerOpen: (open: boolean) => void;
  setFormDrawerOpen: (open: boolean) => void;
}

const initialFilters: HistoryFilters = {
  fromDate: '',
  toDate: '',
  mssv: '',
  fullName: '',
  dormitoryId: '',
  roomId: '',
  type: 'ALL',
};

export const useHistoryStore = create<HistoryState>((set) => ({
  filters: initialFilters,
  selectedHistory: null,
  detailDrawerOpen: false,
  formDrawerOpen: false,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: initialFilters }),
  setSelectedHistory: (history) => set({ selectedHistory: history }),
  setDetailDrawerOpen: (open) => set({ detailDrawerOpen: open }),
  setFormDrawerOpen: (open) => set({ formDrawerOpen: open }),
}));
