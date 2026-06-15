import { simulateDelay } from '../lib/axios';
import { Dormitory } from '../types/Dormitory';
import { mockDormitories } from '../mocks/student.mock';

let localDormitories = [...mockDormitories];

export const dormitoryService = {
  getDormitories: async (filters?: { search?: string }): Promise<Dormitory[]> => {
    await simulateDelay(200);
    let result = [...localDormitories];
    if (filters?.search) {
      result = result.filter(d => 
        d.id.toLowerCase().includes(filters.search!.toLowerCase()) ||
        d.name.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    return result;
  },

  createDormitory: async (dormitory: Dormitory): Promise<Dormitory> => {
    await simulateDelay(200);
    localDormitories.push(dormitory);
    return dormitory;
  },

  updateDormitory: async (id: string, dormitoryData: Partial<Dormitory>): Promise<Dormitory> => {
    await simulateDelay(200);
    localDormitories = localDormitories.map(d => 
      d.id === id ? { ...d, ...dormitoryData } : d
    );
    const updated = localDormitories.find(d => d.id === id);
    if (!updated) throw new Error('Dormitory not found');
    return updated;
  },

  deleteDormitory: async (id: string): Promise<boolean> => {
    await simulateDelay(150);
    localDormitories = localDormitories.filter(d => d.id !== id);
    return true;
  }
};
