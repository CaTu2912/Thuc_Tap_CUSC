import { simulateDelay } from '../lib/axios';
import { BannedStudentStats } from '../types/Statistic';
import { mockBannedStudentStats } from '../mocks/statistics.mock';

let localBannedStudents = [...mockBannedStudentStats];

export const bannedService = {
  getBannedStudents: async (filters?: { search?: string }): Promise<BannedStudentStats[]> => {
    await simulateDelay(250);
    let result = [...localBannedStudents];
    if (filters?.search) {
      result = result.filter(b => 
        b.mssv.toLowerCase().includes(filters.search!.toLowerCase()) ||
        b.fullName.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    return result;
  },

  banStudent: async (bannedRecord: BannedStudentStats): Promise<BannedStudentStats> => {
    await simulateDelay(300);
    localBannedStudents = [bannedRecord, ...localBannedStudents];
    return bannedRecord;
  },

  liftBan: async (mssv: string): Promise<boolean> => {
    await simulateDelay(200);
    localBannedStudents = localBannedStudents.map(b => 
      b.mssv === mssv ? { ...b, status: 'EXPIRED' as const } : b
    );
    return true;
  },

  deleteBannedRecord: async (mssv: string): Promise<boolean> => {
    await simulateDelay(150);
    localBannedStudents = localBannedStudents.filter(b => b.mssv !== mssv);
    return true;
  }
};
