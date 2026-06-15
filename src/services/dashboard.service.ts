import { simulateDelay } from '../lib/axios';
import { DashboardData, AccessChartData, DormitoryPieChartData, StrangerChartData } from '../types/Dashboard';
import { mockDashboardData, mockAccessChartData, mockDormitoryPieData, mockStrangerChartData } from '../mocks/dashboard.mock';

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    await simulateDelay(400);
    return { ...mockDashboardData };
  },

  getAccessChartData: async (): Promise<AccessChartData[]> => {
    await simulateDelay(200);
    return [...mockAccessChartData];
  },

  getDormitoryPieData: async (): Promise<DormitoryPieChartData[]> => {
    await simulateDelay(200);
    return [...mockDormitoryPieData];
  },

  getStrangerChartData: async (): Promise<StrangerChartData[]> => {
    await simulateDelay(200);
    return [...mockStrangerChartData];
  }
};
