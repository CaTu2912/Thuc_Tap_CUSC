import { create } from 'zustand';

// Định nghĩa các loại khung thời gian thống kê (Ngày, Tháng, Năm, Dãy nhà)
export type KieuKhungThoiGian = 'DAY' | 'MONTH' | 'YEAR' | 'DORMITORY';

// Định nghĩa giao diện quản lý trạng thái thống kê báo cáo
interface TrangThaiThongKe {
  // Khung thời gian thống kê đang được kích hoạt hiển thị
  khungThoiGian: KieuKhungThoiGian;

  // Hàm thiết lập khung thời gian hiển thị mới
  datKhungThoiGian: (khungThoiGianMoi: KieuKhungThoiGian) => void;
}

/**
 * Kho lưu trữ quản lý trạng thái hiển thị thống kê báo cáo.
 * Chức năng: Lưu trữ loại khung thời gian đang được chọn trên giao diện phân tích.
 */
export const dungKhoThongKe = create<TrangThaiThongKe>((set) => ({
  khungThoiGian: 'DAY',
  
  datKhungThoiGian: (khungThoiGianMoi) => {
    return set({ khungThoiGian: khungThoiGianMoi });
  },
}));
