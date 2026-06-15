import {
  AccessStatsByTime,
  AccessStatsByDormitory,
  TopAccessStudent,
  LongAbsentStudent,
  StrangerDetectionStats,
  BannedStudentStats
} from '../types/Statistic';

export const mockStatsByDay: AccessStatsByTime[] = [
  { label: 'Thứ 2', inCount: 420, outCount: 400 },
  { label: 'Thứ 3', inCount: 480, outCount: 490 },
  { label: 'Thứ 4', inCount: 510, outCount: 500 },
  { label: 'Thứ 5', inCount: 460, outCount: 470 },
  { label: 'Thứ 6', inCount: 650, outCount: 720 },
  { label: 'Thứ 7', inCount: 800, outCount: 850 },
  { label: 'Chủ Nhật', inCount: 750, outCount: 600 },
];

export const mockStatsByMonth: AccessStatsByTime[] = [
  { label: 'Tháng 1', inCount: 12000, outCount: 11800 },
  { label: 'Tháng 2', inCount: 9500, outCount: 9300 },
  { label: 'Tháng 3', inCount: 14000, outCount: 13900 },
  { label: 'Tháng 4', inCount: 13500, outCount: 13600 },
  { label: 'Tháng 5', inCount: 15000, outCount: 15200 },
  { label: 'Tháng 6', inCount: 8000, outCount: 8200 }, // Đến thời điểm hiện tại
];

export const mockStatsByYear: AccessStatsByTime[] = [
  { label: '2023', inCount: 145000, outCount: 143000 },
  { label: '2024', inCount: 168000, outCount: 167000 },
  { label: '2025', inCount: 180000, outCount: 179500 },
];

export const mockStatsByDormitory: AccessStatsByDormitory[] = [
  { dormitoryName: 'Khu A', inCount: 4500, outCount: 4400, totalAccess: 8900 },
  { dormitoryName: 'Khu B', inCount: 3800, outCount: 3750, totalAccess: 7550 },
  { dormitoryName: 'Khu C', inCount: 5200, outCount: 5100, totalAccess: 10300 },
  { dormitoryName: 'Khu D', inCount: 2900, outCount: 2950, totalAccess: 5850 },
];

export const mockTopAccessStudents: TopAccessStudent[] = [
  { mssv: 'B2003789', fullName: 'Nguyễn Văn Nam', dormitoryName: 'Khu A', roomName: 'Phòng A101', accessCount: 42 },
  { mssv: 'B2104567', fullName: 'Hoàng Ngọc Ánh', dormitoryName: 'Khu C', roomName: 'Phòng C101', accessCount: 38 },
  { mssv: 'B2003791', fullName: 'Lê Minh Hải', dormitoryName: 'Khu B', roomName: 'Phòng B101', accessCount: 35 },
  { mssv: 'B2104568', fullName: 'Vũ Quốc Khánh', dormitoryName: 'Khu D', roomName: 'Phòng D101', accessCount: 30 },
  { mssv: 'B2003790', fullName: 'Trần Thị Hoa', dormitoryName: 'Khu A', roomName: 'Phòng A102', accessCount: 28 },
];

export const mockLongAbsentStudents: LongAbsentStudent[] = [
  { mssv: 'B2003792', fullName: 'Phạm Thanh Bình', dormitoryName: 'Khu A', roomName: 'Phòng A101', lastAccessTime: '2026-06-10 11:30:20', daysAbsent: 3 },
  { mssv: 'B2104569', fullName: 'Đặng Thùy Linh', dormitoryName: 'Khu B', roomName: 'Phòng B102', lastAccessTime: '2026-06-08 15:40:00', daysAbsent: 5 },
  { mssv: 'B2003810', fullName: 'Nguyễn Văn Cường', dormitoryName: 'Khu C', roomName: 'Phòng C102', lastAccessTime: '2026-05-30 08:20:00', daysAbsent: 14 },
];

export const mockStrangerStats: StrangerDetectionStats[] = [
  {
    date: '2026-06-13',
    count: 3,
    locations: [{ name: 'Cửa sau Khu B', count: 2 }, { name: 'Cổng chính Khu A', count: 1 }]
  },
  {
    date: '2026-06-12',
    count: 6,
    locations: [{ name: 'Cửa sau Khu B', count: 3 }, { name: 'Hành lang Khu C', count: 2 }, { name: 'Cổng chính Khu D', count: 1 }]
  },
];

export const mockBannedStudentStats: BannedStudentStats[] = [
  {
    mssv: 'B2003792',
    fullName: 'Phạm Thanh Bình',
    reason: 'Vi phạm quy định giờ giới nghiêm nhiều lần (về muộn sau 23h)',
    bannedDate: '2026-06-11',
    expiryDate: '2026-06-25',
    status: 'ACTIVE'
  },
  {
    mssv: 'B2003999',
    fullName: 'Lê Văn Quyết',
    reason: 'Gây mất trật tự, đánh nhau trong khu vực ký túc xá',
    bannedDate: '2026-05-01',
    expiryDate: '2026-06-01',
    status: 'EXPIRED'
  }
];
