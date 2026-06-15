export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  HISTORY: '/history',
  ALERTS: '/alerts',
  STATISTICS: '/statistics',
  FEEDBACK: '/feedback',
  CATEGORIES: {
    STUDENTS: '/categories/students',
    DORMITORIES: '/categories/dormitories',
    ROOMS: '/categories/rooms',
    BANNED_STUDENTS: '/categories/banned-students',
    USERS: '/categories/users',
  },
} as const;
