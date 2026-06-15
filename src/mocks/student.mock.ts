import { Student } from '../types/Student';
import { Dormitory } from '../types/Dormitory';
import { Room } from '../types/Room';
import { User } from '../types/User';

export const mockDormitories: Dormitory[] = [
  { id: 'KTXA', name: 'Khu A', numberOfRooms: 20, capacity: 160, status: 'ACTIVE' },
  { id: 'KTXB', name: 'Khu B', numberOfRooms: 25, capacity: 200, status: 'ACTIVE' },
  { id: 'KTXC', name: 'Khu C', numberOfRooms: 30, capacity: 240, status: 'ACTIVE' },
  { id: 'KTXD', name: 'Khu D', numberOfRooms: 15, capacity: 120, status: 'ACTIVE' },
];

export const mockRooms: Room[] = [
  { id: 'A101', name: 'Phòng A101', dormitoryId: 'KTXA', dormitoryName: 'Khu A', floor: 1, capacity: 8, currentOccupants: 6, status: 'AVAILABLE' },
  { id: 'A102', name: 'Phòng A102', dormitoryId: 'KTXA', dormitoryName: 'Khu A', floor: 1, capacity: 8, currentOccupants: 8, status: 'FULL' },
  { id: 'A201', name: 'Phòng A201', dormitoryId: 'KTXA', dormitoryName: 'Khu A', floor: 2, capacity: 8, currentOccupants: 4, status: 'AVAILABLE' },
  { id: 'B101', name: 'Phòng B101', dormitoryId: 'KTXB', dormitoryName: 'Khu B', floor: 1, capacity: 8, currentOccupants: 7, status: 'AVAILABLE' },
  { id: 'B102', name: 'Phòng B102', dormitoryId: 'KTXB', dormitoryName: 'Khu B', floor: 1, capacity: 8, currentOccupants: 5, status: 'AVAILABLE' },
  { id: 'C101', name: 'Phòng C101', dormitoryId: 'KTXC', dormitoryName: 'Khu C', floor: 1, capacity: 8, currentOccupants: 8, status: 'FULL' },
  { id: 'C102', name: 'Phòng C102', dormitoryId: 'KTXC', dormitoryName: 'Khu C', floor: 1, capacity: 8, currentOccupants: 0, status: 'MAINTENANCE' },
  { id: 'D101', name: 'Phòng D101', dormitoryId: 'KTXD', dormitoryName: 'Khu D', floor: 1, capacity: 8, currentOccupants: 6, status: 'AVAILABLE' },
];

export const mockStudents: Student[] = [
  {
    mssv: 'B2003789',
    fullName: 'Nguyễn Văn Nam',
    dateOfBirth: '2002-04-12',
    gender: 'Nam',
    dormitoryId: 'KTXA',
    dormitoryName: 'Khu A',
    roomId: 'A101',
    roomName: 'Phòng A101',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    feeDebt: 0,
    present: true,
    lastAccessTime: '2026-06-13 22:15:30'
  },
  {
    mssv: 'B2003790',
    fullName: 'Trần Thị Hoa',
    dateOfBirth: '2002-08-22',
    gender: 'Nữ',
    dormitoryId: 'KTXA',
    dormitoryName: 'Khu A',
    roomId: 'A102',
    roomName: 'Phòng A102',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    feeDebt: 1200000,
    present: false,
    lastAccessTime: '2026-06-13 18:24:00'
  },
  {
    mssv: 'B2003791',
    fullName: 'Lê Minh Hải',
    dateOfBirth: '2002-11-05',
    gender: 'Nam',
    dormitoryId: 'KTXB',
    dormitoryName: 'Khu B',
    roomId: 'B101',
    roomName: 'Phòng B101',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    feeDebt: 0,
    present: true,
    lastAccessTime: '2026-06-13 21:45:00'
  },
  {
    mssv: 'B2003792',
    fullName: 'Phạm Thanh Bình',
    dateOfBirth: '2002-01-30',
    gender: 'Nam',
    dormitoryId: 'KTXA',
    dormitoryName: 'Khu A',
    roomId: 'A101',
    roomName: 'Phòng A101',
    status: 'BANNED',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    feeDebt: 500000,
    present: false,
    lastAccessTime: '2026-06-10 11:30:20'
  },
  {
    mssv: 'B2104567',
    fullName: 'Hoàng Ngọc Ánh',
    dateOfBirth: '2003-05-15',
    gender: 'Nữ',
    dormitoryId: 'KTXC',
    dormitoryName: 'Khu C',
    roomId: 'C101',
    roomName: 'Phòng C101',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    feeDebt: 0,
    present: true,
    lastAccessTime: '2026-06-13 22:30:00'
  },
  {
    mssv: 'B2104568',
    fullName: 'Vũ Quốc Khánh',
    dateOfBirth: '2003-10-09',
    gender: 'Nam',
    dormitoryId: 'KTXD',
    dormitoryName: 'Khu D',
    roomId: 'D101',
    roomName: 'Phòng D101',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    feeDebt: 0,
    present: false,
    lastAccessTime: '2026-06-13 12:05:00'
  },
  {
    mssv: 'B2104569',
    fullName: 'Đặng Thùy Linh',
    dateOfBirth: '2003-12-25',
    gender: 'Nữ',
    dormitoryId: 'KTXB',
    dormitoryName: 'Khu B',
    roomId: 'B102',
    roomName: 'Phòng B102',
    status: 'INACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    feeDebt: 1500000,
    present: false,
    lastAccessTime: '2026-06-11 15:40:00'
  }
];

export const mockUsers: User[] = [
  {
    id: 'U001',
    username: 'admin',
    fullName: 'Nguyễn Văn Trỗi',
    email: 'troib2003789@student.ctu.edu.vn',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2025-01-15'
  },
  {
    id: 'U002',
    username: 'manager_a',
    fullName: 'Lê Văn Tám',
    email: 'tammanager@ctu.edu.vn',
    role: 'MANAGER',
    status: 'ACTIVE',
    createdAt: '2025-02-10'
  },
  {
    id: 'U003',
    username: 'operator_1',
    fullName: 'Phạm Thị Sáu',
    email: 'sauoperator@ctu.edu.vn',
    role: 'OPERATOR',
    status: 'ACTIVE',
    createdAt: '2025-03-01'
  },
  {
    id: 'U004',
    username: 'operator_2',
    fullName: 'Trần Quốc Toản',
    email: 'toanoperator@ctu.edu.vn',
    role: 'OPERATOR',
    status: 'INACTIVE',
    createdAt: '2025-03-05'
  },
  {
    id: 'U005',
    username: 'test',
    fullName: 'Người dùng Thử nghiệm',
    email: 'test@ctu.edu.vn',
    role: 'MANAGER',
    status: 'ACTIVE',
    createdAt: '2026-06-14'
  }
];
