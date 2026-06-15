export interface Feedback {
  id: string;
  mssv: string;
  fullName: string;
  content: string;
  timestamp: string;
  status: 'PENDING' | 'RESOLVED';
  resolvedBy?: string;
  resolvedAt?: string;
}
