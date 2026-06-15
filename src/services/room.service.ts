import { simulateDelay } from '../lib/axios';
import { Room } from '../types/Room';
import { mockRooms } from '../mocks/student.mock';

let localRooms = [...mockRooms];

export const roomService = {
  getRooms: async (filters?: { search?: string; dormitoryId?: string }): Promise<Room[]> => {
    await simulateDelay(250);
    let result = [...localRooms];

    if (filters) {
      const { search, dormitoryId } = filters;
      if (search) {
        result = result.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()));
      }
      if (dormitoryId) {
        result = result.filter(r => r.dormitoryId === dormitoryId);
      }
    }
    return result;
  },

  createRoom: async (room: Room): Promise<Room> => {
    await simulateDelay(250);
    localRooms.push(room);
    return room;
  },

  updateRoom: async (id: string, roomData: Partial<Room>): Promise<Room> => {
    await simulateDelay(250);
    localRooms = localRooms.map(r => 
      r.id === id ? { ...r, ...roomData } : r
    );
    const updated = localRooms.find(r => r.id === id);
    if (!updated) throw new Error('Room not found');
    return updated;
  },

  deleteRoom: async (id: string): Promise<boolean> => {
    await simulateDelay(150);
    localRooms = localRooms.filter(r => r.id !== id);
    return true;
  }
};
