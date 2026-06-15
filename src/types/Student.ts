export interface Student {
  mssv: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'Nam' | 'Nữ';
  dormitoryId: string;
  dormitoryName?: string;
  roomId: string;
  roomName?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  avatarUrl?: string;
  feeDebt?: number; // Nợ phí
  lastAccessTime?: string;
  present?: boolean; // Đang có mặt tại KTX hay đang ở ngoài
}
