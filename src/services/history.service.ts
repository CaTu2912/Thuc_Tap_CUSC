import { simulateDelay } from '../lib/axios';
import { AccessHistory } from '../types/History';
import { mockAccessHistories } from '../mocks/history.mock';
import dayjs from 'dayjs';

// Global mock list to persist changes during session.
let localAccessHistories = [...mockAccessHistories];

export const historyService = {
  getHistories: async (filters?: {
    fromDate?: string;
    toDate?: string;
    mssv?: string;
    fullName?: string;
    dormitoryId?: string;
    type?: 'IN' | 'OUT' | 'ALL';
  }): Promise<AccessHistory[]> => {
    await simulateDelay(400);
    let result = [...localAccessHistories];

    if (filters) {
      const { fromDate, toDate, mssv, fullName, dormitoryId, type } = filters;

      if (fromDate) {
        result = result.filter(h => dayjs(h.timestamp).isAfter(dayjs(fromDate).startOf('day')));
      }
      if (toDate) {
        result = result.filter(h => dayjs(h.timestamp).isBefore(dayjs(toDate).endOf('day')));
      }
      if (mssv) {
        result = result.filter(h => h.mssv.toLowerCase().includes(mssv.toLowerCase()));
      }
      if (fullName) {
        result = result.filter(h => h.fullName.toLowerCase().includes(fullName.toLowerCase()));
      }
      if (dormitoryId) {
        result = result.filter(h => h.dormitoryId === dormitoryId);
      }
      if (type && type !== 'ALL') {
        result = result.filter(h => h.type === type);
      }
    }

    // Sort by timestamp desc.
    return result.sort((a, b) => dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix());
  },

  createHistory: async (historyData: Omit<AccessHistory, 'id' | 'timestamp'>): Promise<AccessHistory> => {
    await simulateDelay(300);
    const newHistory: AccessHistory = {
      ...historyData,
      id: `H${String(localAccessHistories.length + 1).padStart(3, '0')}`,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    localAccessHistories = [newHistory, ...localAccessHistories];
    return newHistory;
  },

  deleteHistory: async (id: string): Promise<boolean> => {
    await simulateDelay(200);
    localAccessHistories = localAccessHistories.filter(h => h.id !== id);
    return true;
  }
};
