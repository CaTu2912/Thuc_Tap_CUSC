import { simulateDelay } from '../lib/axios';
import { Feedback } from '../types/Feedback';
import { mockFeedbacks } from '../mocks/feedback.mock';
import dayjs from 'dayjs';

let localFeedbacks = [...mockFeedbacks];

export const feedbackService = {
  getFeedbacks: async (filters?: { search?: string; status?: 'PENDING' | 'RESOLVED' }): Promise<Feedback[]> => {
    await simulateDelay(300);
    let result = [...localFeedbacks];
    
    if (filters) {
      const { search, status } = filters;
      if (search) {
        result = result.filter(f => 
          f.mssv.toLowerCase().includes(search.toLowerCase()) ||
          f.fullName.toLowerCase().includes(search.toLowerCase()) ||
          f.content.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (status) {
        result = result.filter(f => f.status === status);
      }
    }
    
    // Sort desc by timestamp
    return result.sort((a, b) => dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix());
  },

  resolveFeedback: async (id: string, adminName: string): Promise<Feedback> => {
    await simulateDelay(250);
    localFeedbacks = localFeedbacks.map(f => 
      f.id === id 
        ? { ...f, status: 'RESOLVED', resolvedBy: adminName, resolvedAt: dayjs().format('YYYY-MM-DD HH:mm:ss') }
        : f
    );
    const updated = localFeedbacks.find(f => f.id === id);
    if (!updated) throw new Error('Feedback not found');
    return updated;
  },

  deleteFeedback: async (id: string): Promise<boolean> => {
    await simulateDelay(200);
    localFeedbacks = localFeedbacks.filter(f => f.id !== id);
    return true;
  }
};
