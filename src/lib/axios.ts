import axios from 'axios';

// Base Axios instance.
// Can point to process.env.NEXT_PUBLIC_API_URL in production.
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (for adding JWT tokens, etc.)
api.interceptors.request.use(
  (config) => {
    // In real app, get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error (e.g. unauthorized redirects)
    return Promise.reject(error);
  }
);

export default api;

// Helper to simulate API delay
export const simulateDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));
