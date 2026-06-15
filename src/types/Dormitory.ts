export interface Dormitory {
  id: string;
  name: string;
  numberOfRooms: number;
  capacity: number;
  status: 'ACTIVE' | 'INACTIVE';
}
