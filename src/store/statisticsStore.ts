import { create } from 'zustand';

export type TimeframeType = 'DAY' | 'MONTH' | 'YEAR' | 'DORMITORY';

interface StatisticsState {
  timeframe: TimeframeType;
  setTimeframe: (timeframe: TimeframeType) => void;
}

export const useStatisticsStore = create<StatisticsState>((set) => ({
  timeframe: 'DAY',
  setTimeframe: (timeframe) => set({ timeframe }),
}));
