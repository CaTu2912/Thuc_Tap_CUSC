import { create } from 'zustand';
import { NguoiDung } from '../types/NguoiDung';
import { duLieuGiaLapNguoiDung } from '../mocks/student.mock';

// Định nghĩa giao diện quản lý trạng thái xác thực
interface TrangThaiXacThuc {
  // Thông tin người dùng hiện tại (null nếu chưa đăng nhập)
  nguoiDung: NguoiDung | null;

  // Xác định trạng thái đã đăng nhập thành công hay chưa
  daXacThuc: boolean;

  // Xác định kho lưu trữ đã hoàn tất khởi tạo (đọc dữ liệu từ bộ nhớ)
  daKhoiTao: boolean;

  // Hàm khởi tạo trạng thái từ bộ nhớ trình duyệt (localStorage)
  khoiTao: () => void;

  // Hàm xử lý đăng nhập hệ thống bất đồng bộ
  dangNhap: (tenDangNhap: string, matKhau?: string) => Promise<boolean>;

  // Hàm xử lý đăng xuất khỏi hệ thống
  dangXuat: () => void;
}

/**
 * Kho lưu trữ quản lý trạng thái xác thực người dùng.
 * Chức năng: Lưu trữ thông tin đăng nhập, duy trì phiên làm việc và đăng xuất.
 */
export const dungKhoXacThuc = create<TrangThaiXacThuc>((set) => ({
  nguoiDung: null,
  daXacThuc: false,
  daKhoiTao: false,

  khoiTao: () => {
    // Bước 1: Kiểm tra xem có đang chạy trong môi trường trình duyệt hay không
    if (typeof window !== 'undefined') {
      const nguoiDungDaLuu = localStorage.getItem('ctu_user');
      const maXacThuc = localStorage.getItem('ctu_token');

      // Bước 2: Nếu tồn tại thông tin trong bộ nhớ, phân tích cú pháp và gán lại trạng thái
      if (nguoiDungDaLuu && maXacThuc) {
        try {
          set({
            nguoiDung: JSON.parse(nguoiDungDaLuu),
            daXacThuc: true,
            daKhoiTao: true,
          });
          return;
        } catch (e) {
          // Xóa thông tin lỗi trong bộ nhớ nếu phân tích cú pháp JSON thất bại
          localStorage.removeItem('ctu_user');
          localStorage.removeItem('ctu_token');
        }
      }
      set({ daKhoiTao: true });
    }
  },

  dangNhap: async (tenDangNhap, matKhau) => {
    // Bước 1: Tìm kiếm tài khoản trong danh sách giả lập người dùng
    const nguoiDungTimThay = duLieuGiaLapNguoiDung.find(
      (u) => u.tenDangNhap.toLowerCase() === tenDangNhap.toLowerCase()
    );

    // Bước 2: Nếu tìm thấy và tài khoản ở trạng thái hoạt động (ACTIVE)
    if (nguoiDungTimThay && nguoiDungTimThay.trangThai === 'ACTIVE') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('ctu_user', JSON.stringify(nguoiDungTimThay));
        localStorage.setItem('ctu_token', 'mock-jwt-token-xyz');
      }
      set({ nguoiDung: nguoiDungTimThay, daXacThuc: true });
      return true;
    }
    return false;
  },

  dangXuat: () => {
    // Bước 1: Loại bỏ thông tin lưu trữ khỏi bộ nhớ trình duyệt
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ctu_user');
      localStorage.removeItem('ctu_token');
    }

    // Bước 2: Thiết lập lại trạng thái rỗng
    set({ nguoiDung: null, daXacThuc: false });
  },
}));
