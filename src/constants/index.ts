export const COLORS = {
  primary: '#1f5ca9',       // CTU Blue
  sidebarActive: '#00afef', // Vibrant sky blue
  success: '#52C41A',
  warning: '#FAAD14',
  danger: '#FF4D4F',
  background: '#F5F7FA',
  card: '#FFFFFF',
};

export const DORMITORY_OPTIONS = [
  { value: 'KTXA', label: 'Khu A' },
  { value: 'KTXB', label: 'Khu B' },
  { value: 'KTXC', label: 'Khu C' },
  { value: 'KTXD', label: 'Khu D' },
];

export const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Đang hoạt động' },
  { value: 'INACTIVE', label: 'Tạm khóa' },
  { value: 'BANNED', label: 'Bị cấm' },
];

export const ROLE_OPTIONS = [
  { value: 'ADMIN', label: 'Quản trị hệ thống' },
  { value: 'MANAGER', label: 'Điều phối viên' },
  { value: 'OPERATOR', label: 'Trực ban' },
];

export const GENDER_OPTIONS = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' },
];

export * from './routes';

