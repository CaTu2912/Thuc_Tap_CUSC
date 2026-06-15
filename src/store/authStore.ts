import { create } from 'zustand';
import { User } from '../types/User';
import { mockUsers } from '../mocks/student.mock';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  initialize: () => void;
  login: (username: string, password?: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  initialize: () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('ctu_user');
      const token = localStorage.getItem('ctu_token');
      if (storedUser && token) {
        try {
          set({
            user: JSON.parse(storedUser),
            isAuthenticated: true,
            isInitialized: true,
          });
          return;
        } catch (e) {
          localStorage.removeItem('ctu_user');
          localStorage.removeItem('ctu_token');
        }
      }
      set({ isInitialized: true });
    }
  },
  login: async (username, password) => {
    // Simulating authentication matching mockUsers
    // Allow login if user is active and exists
    const foundUser = mockUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );
    if (foundUser && foundUser.status === 'ACTIVE') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('ctu_user', JSON.stringify(foundUser));
        localStorage.setItem('ctu_token', 'mock-jwt-token-xyz');
      }
      set({ user: foundUser, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ctu_user');
      localStorage.removeItem('ctu_token');
    }
    set({ user: null, isAuthenticated: false });
  },
}));
