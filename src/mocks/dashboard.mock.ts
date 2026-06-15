import { DashboardKPIs, AccessChartData, DormitoryPieChartData, StrangerChartData, DashboardData } from '../types/Dashboard';
import { mockAccessHistories } from './history.mock';
import { mockStudents } from './student.mock';
import { Alert } from '../types/Alert';
import { Feedback } from '../types/Feedback';

export const mockDashboardKPIs: DashboardKPIs = {
  totalStudents: 1540,
  presentStudents: 1120,
  absentStudents: 420,
  feeDebtStudents: 45,
  bannedStudents: 12,
  strangersDetectedToday: 3,
};

export const mockAccessChartData: AccessChartData[] = [
  { time: '06:00', inCount: 12, outCount: 45 },
  { time: '08:00', inCount: 34, outCount: 88 },
  { time: '10:00', inCount: 56, outCount: 65 },
  { time: '12:00', inCount: 92, outCount: 78 },
  { time: '14:00', inCount: 48, outCount: 52 },
  { time: '16:00', inCount: 85, outCount: 40 },
  { time: '18:00', inCount: 150, outCount: 30 },
  { time: '20:00', inCount: 180, outCount: 20 },
  { time: '22:00', inCount: 220, outCount: 15 },
  { time: '23:00', inCount: 40, outCount: 5 },
];

export const mockDormitoryPieData: DormitoryPieChartData[] = [
  { name: 'Khu A', value: 450 },
  { name: 'Khu B', value: 380 },
  { name: 'Khu C', value: 420 },
  { name: 'Khu D', value: 290 },
];

export const mockStrangerChartData: StrangerChartData[] = [
  { date: '07/06', count: 1 },
  { date: '08/06', count: 4 },
  { date: '09/06', count: 2 },
  { date: '10/06', count: 5 },
  { date: '11/06', count: 3 },
  { date: '12/06', count: 6 },
  { date: '13/06', count: 3 },
];

export const mockAlerts: Alert[] = [
  {
    id: 'A001',
    message: 'Phát hiện đối tượng lạ lảng vảng tại khu vực cửa sau Khu B',
    timestamp: '2026-06-13 22:45:00',
    severity: 'WARNING',
    resolved: false,
    type: 'STRANGER',
    location: 'Cửa sau Khu B',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 'A002',
    message: 'Sinh viên B2003792 (Phạm Thanh Bình) đang bị cấm cố gắng quét thẻ vào Khu A',
    timestamp: '2026-06-13 22:12:00',
    severity: 'CRITICAL',
    resolved: false,
    type: 'FORBIDDEN',
    location: 'Cổng chính Khu A',
  },
  {
    id: 'A003',
    message: 'Thiết bị camera phụ trách cổng chính Khu D mất kết nối mạng',
    timestamp: '2026-06-13 21:00:00',
    severity: 'CRITICAL',
    resolved: true,
    type: 'DEVICE_OFFLINE',
    location: 'Cổng chính Khu D'
  }
];

export const mockFeedbacks: Feedback[] = [
  {
    id: 'F001',
    mssv: 'B2003790',
    fullName: 'Trần Thị Hoa',
    content: 'Em quét thẻ ra ngoài lúc 18:24 nhưng hệ thống ghi nhận lúc 18:50 làm ảnh hưởng điểm rèn luyện.',
    timestamp: '2026-06-13 19:30:00',
    status: 'PENDING'
  },
  {
    id: 'F002',
    mssv: 'B2104568',
    fullName: 'Vũ Quốc Khánh',
    content: 'Em không đi ra ngoài vào sáng ngày 12/06 nhưng lịch sử hiển thị có đi ra.',
    timestamp: '2026-06-13 14:15:00',
    status: 'RESOLVED',
    resolvedBy: 'Nguyễn Văn Trỗi',
    resolvedAt: '2026-06-13 16:00:00'
  }
];

export const mockDashboardData: DashboardData = {
  kpis: mockDashboardKPIs,
  latestHistory: mockAccessHistories.slice(0, 5),
  latestAlerts: mockAlerts,
  absentStudents: mockStudents.filter(s => !s.present),
  presentStudents: mockStudents.filter(s => s.present),
  latestFeedbacks: mockFeedbacks,
};
