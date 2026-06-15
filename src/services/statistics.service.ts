import { simulateDelay } from '../lib/axios';
import {
  AccessStatsByTime,
  AccessStatsByDormitory,
  TopAccessStudent,
  LongAbsentStudent,
  StrangerDetectionStats,
  BannedStudentStats
} from '../types/Statistic';
import {
  mockStatsByDay,
  mockStatsByMonth,
  mockStatsByYear,
  mockStatsByDormitory,
  mockTopAccessStudents,
  mockLongAbsentStudents,
  mockStrangerStats,
  mockBannedStudentStats
} from '../mocks/statistics.mock';

export const statisticsService = {
  getStatsByTime: async (type: 'DAY' | 'MONTH' | 'YEAR'): Promise<AccessStatsByTime[]> => {
    await simulateDelay(300);
    if (type === 'DAY') return [...mockStatsByDay];
    if (type === 'MONTH') return [...mockStatsByMonth];
    return [...mockStatsByYear];
  },

  getStatsByDormitory: async (): Promise<AccessStatsByDormitory[]> => {
    await simulateDelay(200);
    return [...mockStatsByDormitory];
  },

  getTopAccessStudents: async (): Promise<TopAccessStudent[]> => {
    await simulateDelay(250);
    return [...mockTopAccessStudents];
  },

  getLongAbsentStudents: async (): Promise<LongAbsentStudent[]> => {
    await simulateDelay(250);
    return [...mockLongAbsentStudents];
  },

  getStrangerStats: async (): Promise<StrangerDetectionStats[]> => {
    await simulateDelay(200);
    return [...mockStrangerStats];
  },

  getBannedStudentStats: async (): Promise<BannedStudentStats[]> => {
    await simulateDelay(200);
    return [...mockBannedStudentStats];
  }
};
