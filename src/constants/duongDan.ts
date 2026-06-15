/**
 * Các đường dẫn định tuyến trong ứng dụng.
 * Chức năng: Định nghĩa tập trung các URL của các trang trong hệ thống.
 */
export const DUONG_DAN = {
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
