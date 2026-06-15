export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'OPERATOR';
  status: 'ACTIVE' | 'INACTIVE';
  avatarUrl?: string;
  createdAt: string;
}
