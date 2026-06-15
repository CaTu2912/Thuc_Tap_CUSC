import { moPhongDoTre } from '../lib/axios';
import { NguoiDung } from '../types/NguoiDung';
import { duLieuGiaLapNguoiDung } from '../mocks/student.mock';

/**
 * Đối tượng cung cấp các dịch vụ liên quan đến xác thực người dùng.
 * Chức năng: Xử lý đăng nhập và truy vấn thông tin tài khoản hiện tại.
 */
export const dichVuXacThuc = {
  /**
   * Hàm xử lý đăng nhập hệ thống.
   * Chức năng: Xác thực tên tài khoản và trả về thông tin người dùng kèm mã thông báo (token).
   * @param tenDangNhap Tên đăng nhập của tài khoản
   * @param matKhau Mật khẩu của tài khoản (tùy chọn trong bản giả lập)
   */
  dangNhap: async (
    tenDangNhap: string,
    matKhau?: string
  ): Promise<{ maXacThuc: string; nguoiDung: NguoiDung }> => {
    // Bước 1: Giả lập thời gian trễ kết nối mạng 500ms
    await moPhongDoTre(500);

    // Bước 2: Tìm kiếm người dùng trong danh sách giả lập theo tên đăng nhập
    const nguoiDung = duLieuGiaLapNguoiDung.find((u) => u.tenDangNhap === tenDangNhap) || duLieuGiaLapNguoiDung[0];

    // Bước 3: Trả về kết quả xác thực thành công kèm token giả lập
    return {
      maXacThuc: 'mock-jwt-token-xyz',
      nguoiDung,
    };
  },

  /**
   * Hàm lấy thông tin người dùng hiện tại đang đăng nhập.
   * Chức năng: Lấy thông tin tài khoản đang hoạt động dựa trên phiên làm việc hiện tại.
   */
  layNguoiDungHienTai: async (): Promise<NguoiDung> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 200ms
    await moPhongDoTre(200);

    // Bước 2: Trả về tài khoản mặc định đầu tiên trong danh sách giả lập
    return duLieuGiaLapNguoiDung[0];
  }
};
