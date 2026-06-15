import { create } from 'zustand';
import { DashboardKPIs, DashboardData } from '../types/Dashboard';
import { mockDashboardData } from '../mocks/dashboard.mock';
import { Alert } from '../types/Alert';

interface DashboardState {
  kpis: DashboardKPIs;
  latestAlerts: Alert[];
  resolvedAlertsCount: number;
  resolveAlert: (id: string) => void;
  setKPIs: (kpis: DashboardKPIs) => void;
  setAlerts: (alerts: Alert[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  kpis: mockDashboardData.kpis,
  latestAlerts: mockDashboardData.latestAlerts,
  resolvedAlertsCount: mockDashboardData.latestAlerts.filter(a => a.resolved).length,
  resolveAlert: (id) => set((state) => {
    const updatedAlerts = state.latestAlerts.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    );
    return {
      latestAlerts: updatedAlerts,
      resolvedAlertsCount: updatedAlerts.filter(a => a.resolved).length
    };
  }),
  setKPIs: (kpis) => set({ kpis }),
  setAlerts: (alerts) => set({ latestAlerts: alerts }),
}));
