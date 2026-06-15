export interface AccessStatsByTime {
  label: string; // Date, month or year
  inCount: number;
  outCount: number;
}

export interface AccessStatsByDormitory {
  dormitoryName: string;
  inCount: number;
  outCount: number;
  totalAccess: number;
}

export interface TopAccessStudent {
  mssv: string;
  fullName: string;
  dormitoryName: string;
  roomName: string;
  accessCount: number;
}

export interface LongAbsentStudent {
  mssv: string;
  fullName: string;
  dormitoryName: string;
  roomName: string;
  lastAccessTime: string;
  daysAbsent: number;
}

export interface StrangerDetectionStats {
  date: string;
  count: number;
  locations: { name: string; count: number }[];
}

export interface BannedStudentStats {
  mssv: string;
  fullName: string;
  reason: string;
  bannedDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED';
}
