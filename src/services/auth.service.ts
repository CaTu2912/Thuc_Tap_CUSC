import { simulateDelay } from '../lib/axios';
import { User } from '../types/User';
import { mockUsers } from '../mocks/student.mock';

export const authService = {
  login: async (username: string, password?: string): Promise<{ token: string; user: User }> => {
    await simulateDelay(500);
    const user = mockUsers.find(u => u.username === username) || mockUsers[0];
    return {
      token: 'mock-jwt-token-xyz',
      user,
    };
  },

  getCurrentUser: async (): Promise<User> => {
    await simulateDelay(200);
    return mockUsers[0];
  }
};
