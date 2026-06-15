import { moPhongDoTre } from '../lib/axios';
import { DuLieuBangDieuKhien, DuLieuBieuDoRaVao, DuLieuBieuDoTronKtx, DuLieuBieuDoNguoiLa } from '../types/BangDieuKhien';
import { duLieuGiaLapBangDieuKhien, duLieuGiaLapBieuDoRaVao, duLieuGiaLapBieuDoTronKtx, duLieuGiaLapBieuDoNguoiLa } from '../mocks/dashboard.mock';

/**
 * Đối tượng cung cấp các dịch vụ liên quan đến dữ liệu hiển thị tại trang chủ.
 * Chức năng: Truy xuất thông tin tóm tắt và dữ liệu biểu đồ phân tích.
 */
export const dichVuBangDieuKhien = {
  /**
   * Hàm lấy dữ liệu tổng hợp của bảng điều khiển chính.
   * Chức năng: Trả về KPI, danh sách lịch sử, cảnh báo và phản hồi mới nhất.
   */
  layDuLieuBangDieuKhien: async (): Promise<DuLieuBangDieuKhien> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 400ms
    await moPhongDoTre(400);

    // Bước 2: Trả về bản sao dữ liệu trang chủ giả lập
    return { ...duLieuGiaLapBangDieuKhien };
  },

  /**
   * Hàm lấy dữ liệu cho biểu đồ ra vào.
   * Chức năng: Trả về danh sách lượt ra vào theo khung giờ đã thống kê.
   */
  layDuLieuBieuDoRaVao: async (): Promise<DuLieuBieuDoRaVao[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 200ms
    await moPhongDoTre(200);

    // Bước 2: Trả về dữ liệu biểu đồ cột ra vào giả lập
    return [...duLieuGiaLapBieuDoRaVao];
  },

  /**
   * Hàm lấy dữ liệu cho biểu đồ tròn tỷ lệ sinh viên theo dãy nhà.
   * Chức năng: Trả về danh sách tên dãy nhà kèm số lượng sinh viên nội trú.
   */
  layDuLieuBieuDoTronKtx: async (): Promise<DuLieuBieuDoTronKtx[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 200ms
    await moPhongDoTre(200);

    // Bước 2: Trả về dữ liệu biểu đồ tròn tỷ lệ dãy nhà giả lập
    return [...duLieuGiaLapBieuDoTronKtx];
  },

  /**
   * Hàm lấy dữ liệu biểu đồ số lượng người lạ phát hiện đột nhập.
   * Chức năng: Trả về danh sách số lượng người lạ theo từng ngày.
   */
  layDuLieuBieuDoNguoiLa: async (): Promise<DuLieuBieuDoNguoiLa[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 200ms
    await moPhongDoTre(200);

    // Bước 2: Trả về dữ liệu biểu đồ người lạ giả lập
    return [...duLieuGiaLapBieuDoNguoiLa];
  }
};
