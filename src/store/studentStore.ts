import { create } from 'zustand';
import { Student } from '../types/Student';
import { Room } from '../types/Room';
import { Dormitory } from '../types/Dormitory';
import { User } from '../types/User';

interface StudentState {
  selectedStudent: Student | null;
  studentDrawerOpen: boolean;
  selectedRoom: Room | null;
  roomDrawerOpen: boolean;
  selectedDormitory: Dormitory | null;
  dormitoryDrawerOpen: boolean;
  selectedUser: User | null;
  userDrawerOpen: boolean;
  
  setSelectedStudent: (student: Student | null) => void;
  setStudentDrawerOpen: (open: boolean) => void;
  setSelectedRoom: (room: Room | null) => void;
  setRoomDrawerOpen: (open: boolean) => void;
  setSelectedDormitory: (dormitory: Dormitory | null) => void;
  setDormitoryDrawerOpen: (open: boolean) => void;
  setSelectedUser: (user: User | null) => void;
  setUserDrawerOpen: (open: boolean) => void;
}

export const useStudentStore = create<StudentState>((set) => ({
  selectedStudent: null,
  studentDrawerOpen: false,
  selectedRoom: null,
  roomDrawerOpen: false,
  selectedDormitory: null,
  dormitoryDrawerOpen: false,
  selectedUser: null,
  userDrawerOpen: false,

  setSelectedStudent: (student) => set({ selectedStudent: student }),
  setStudentDrawerOpen: (open) => set({ studentDrawerOpen: open }),
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  setRoomDrawerOpen: (open) => set({ roomDrawerOpen: open }),
  setSelectedDormitory: (dormitory) => set({ selectedDormitory: dormitory }),
  setDormitoryDrawerOpen: (open) => set({ dormitoryDrawerOpen: open }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setUserDrawerOpen: (open) => set({ userDrawerOpen: open }),
}));
