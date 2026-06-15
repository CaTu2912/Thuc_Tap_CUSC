import { moPhongDoTre } from '../lib/axios';
import {
  ThongKeRaVaoTheoThoiGian,
  ThongKeRaVaoTheoKtx,
  SinhVienRaVaoNhieuNhat,
  SinhVienVangMatLauNgay,
  ThongKePhatHienNguoiLa,
  ThongKeSinhVienBiHanChe
} from '../types/ThongKe';
import {
  duLieuGiaLapThongKeTheoNgay,
  duLieuGiaLapThongKeTheoThang,
  duLieuGiaLapThongKeTheoNam,
  duLieuGiaLapThongKeTheoKtx,
  duLieuGiaLapSinhVienRaVaoNhieuNhat,
  duLieuGiaLapSinhVienVangMatLauNgay,
  duLieuGiaLapThongKeNguoiLa,
  duLieuGiaLapThongKeSinhVienBiHanChe
} from '../mocks/statistics.mock';

/**
 * Đối tượng cung cấp các dịch vụ liên quan đến phân tích báo cáo thống kê.
 * Chức năng: Truy vấn dữ liệu thống kê ra vào theo thời gian, theo dãy nhà, top sinh viên và cảnh báo.
 */
export const dichVuThongKe = {
  /**
   * Hàm lấy thống kê lượt ra vào theo thời gian (Ngày, Tháng hoặc Năm).
   * Chức năng: Trả về dữ liệu thống kê tương ứng theo cấu hình lựa chọn.
   * @param loai Loại thống kê thời gian ('DAY' | 'MONTH' | 'YEAR')
   */
  layThongKeTheoThoiGian: async (loai: 'DAY' | 'MONTH' | 'YEAR'): Promise<ThongKeRaVaoTheoThoiGian[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 300ms
    await moPhongDoTre(300);

    // Bước 2: Kiểm tra loại thống kê được chọn và trả về dữ liệu mẫu tương ứng
    if (loai === 'DAY') {
      return [...duLieuGiaLapThongKeTheoNgay];
    }
    if (loai === 'MONTH') {
      return [...duLieuGiaLapThongKeTheoThang];
    }
    return [...duLieuGiaLapThongKeTheoNam];
  },

  /**
   * Hàm lấy thống kê lượt ra vào của từng dãy nhà ký túc xá.
   * Chức năng: Trả về danh sách lượt ra vào và tổng số của từng dãy nhà.
   */
  layThongKeTheoKtx: async (): Promise<ThongKeRaVaoTheoKtx[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 200ms
    await moPhongDoTre(200);

    // Bước 2: Trả về danh sách thống kê ra vào từng khu nhà
    return [...duLieuGiaLapThongKeTheoKtx];
  },

  /**
   * Hàm lấy danh sách sinh viên có tần suất ra vào nhiều nhất.
   * Chức năng: Trả về thông tin chi tiết kèm số lượt ra vào của top sinh viên.
   */
  laySinhVienRaVaoNhieuNhat: async (): Promise<SinhVienRaVaoNhieuNhat[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 250ms
    await moPhongDoTre(250);

    // Bước 2: Trả về dữ liệu top sinh viên ra vào nhiều nhất
    return [...duLieuGiaLapSinhVienRaVaoNhieuNhat];
  },

  /**
   * Hàm lấy danh sách sinh viên vắng mặt dài ngày khỏi ký túc xá.
   * Chức năng: Trả về danh sách kèm số ngày vắng mặt liên tục.
   */
  laySinhVienVangMatLauNgay: async (): Promise<SinhVienVangMatLauNgay[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 250ms
    await moPhongDoTre(250);

    // Bước 2: Trả về danh sách sinh viên tự ý vắng mặt lâu ngày
    return [...duLieuGiaLapSinhVienVangMatLauNgay];
  },

  /**
   * Hàm lấy dữ liệu thống kê số lượt camera ghi nhận người lạ.
   * Chức năng: Trả về thông tin ngày giờ phát hiện kèm theo chi tiết vị trí.
   */
  layThongKeNguoiLa: async (): Promise<ThongKePhatHienNguoiLa[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 200ms
    await moPhongDoTre(200);

    // Bước 2: Trả về dữ liệu camera phát hiện người lạ đột nhập
    return [...duLieuGiaLapThongKeNguoiLa];
  },

  /**
   * Hàm lấy dữ liệu thống kê lệnh cấm/hạn chế của sinh viên.
   * Chức năng: Trả về danh sách các quyết định kỷ luật hạn chế ra vào.
   */
  layThongKeSinhVienBiHanChe: async (): Promise<ThongKeSinhVienBiHanChe[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 200ms
    await moPhongDoTre(200);

    // Bước 2: Trả về danh sách các sinh viên đang bị áp lệnh hạn chế
    return [...duLieuGiaLapThongKeSinhVienBiHanChe];
  }
};
