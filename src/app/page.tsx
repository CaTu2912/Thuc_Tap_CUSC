import { redirect } from 'next/navigation';
import { DUONG_DAN } from '@/constants';

/**
 * Component Trang chủ mặc định của ứng dụng.
 * Chức năng: Tự động chuyển hướng người dùng truy cập trang chủ sang trang Bảng điều khiển (Dashboard).
 */
export default function Home() {
  redirect(DUONG_DAN.DASHBOARD);
}
