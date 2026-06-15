export interface AccessHistory {
  id: string;
  timestamp: string;
  mssv: string;
  fullName: string;
  avatarUrl?: string;
  captureUrl?: string;
  type: 'IN' | 'OUT';
  dormitoryId: string;
  dormitoryName: string;
  roomId: string;
  roomName: string;
  device: string;
  notes?: string;
}
