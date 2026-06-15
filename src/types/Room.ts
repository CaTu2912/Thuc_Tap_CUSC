export interface Room {
  id: string;
  name: string;
  dormitoryId: string;
  dormitoryName: string;
  floor: number;
  capacity: number;
  currentOccupants: number;
  status: 'AVAILABLE' | 'FULL' | 'MAINTENANCE';
}
