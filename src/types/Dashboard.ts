import { AccessHistory } from './History';
import { Feedback } from './Feedback';
import { Student } from './Student';
import { Alert } from './Alert';

export interface DashboardKPIs {
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  feeDebtStudents: number;
  bannedStudents: number;
  strangersDetectedToday: number;
}

export interface AccessChartData {
  time: string; // e.g. "08:00", "09:00", etc. or Date
  inCount: number;
  outCount: number;
}

export interface DormitoryPieChartData {
  name: string; // Dormitory name
  value: number; // Student count
}

export interface StrangerChartData {
  date: string;
  count: number;
}

export interface DashboardData {
  kpis: DashboardKPIs;
  latestHistory: AccessHistory[];
  latestAlerts: Alert[];
  absentStudents: Student[];
  presentStudents: Student[];
  latestFeedbacks: Feedback[];
}
