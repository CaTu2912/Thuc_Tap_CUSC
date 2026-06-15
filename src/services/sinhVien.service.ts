import { moPhongDoTre } from '../lib/axios';
import { SinhVien } from '../types/SinhVien';
import { duLieuGiaLapSinhVien } from '../mocks/student.mock';

// Mảng cục bộ lưu trữ danh sách sinh viên nội trú trong phiên làm việc
let danhSachSinhVienCucBo = [...duLieuGiaLapSinhVien];

/**
 * Đối tượng cung cấp các dịch vụ liên quan đến quản lý sinh viên nội trú.
 * Chức năng: Tìm kiếm sinh viên, truy vấn theo mssv, thêm mới, sửa đổi thông tin và xóa sinh viên.
 */
export const dichVuSinhVien = {
  /**
   * Hàm lấy danh sách sinh viên nội trú.
   * Chức năng: Hỗ trợ tìm kiếm theo từ khóa (họ tên/mssv), lọc theo dãy nhà và lọc theo trạng thái hoạt động.
   * @param boLoc Bộ lọc sinh viên (tùy chọn)
   */
  layDanhSachSinhVien: async (boLoc?: {
    timKiem?: string;
    maKtx?: string;
    trangThai?: string;
  }): Promise<SinhVien[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 350ms
    await moPhongDoTre(350);

    let ketQua = [...danhSachSinhVienCucBo];

    // Bước 2: Thực hiện lọc dữ liệu nếu bộ lọc được định nghĩa
    if (boLoc) {
      const { timKiem, maKtx, trangThai } = boLoc;
      
      // Lọc theo từ khóa tìm kiếm (mssv hoặc họ và tên)
      if (timKiem) {
        const tuKhoa = timKiem.toLowerCase();
        ketQua = ketQua.filter(
          (s) => s.mssv.toLowerCase().includes(tuKhoa) ||
                 s.hoVaTen.toLowerCase().includes(tuKhoa)
        );
      }
      
      // Lọc theo mã dãy nhà
      if (maKtx) {
        ketQua = ketQua.filter((s) => s.maKtx === maKtx);
      }
      
      // Lọc theo trạng thái hoạt động của sinh viên
      if (trangThai) {
        ketQua = ketQua.filter((s) => s.trangThai === trangThai);
      }
    }
    return ketQua;
  },

  /**
   * Hàm lấy thông tin một sinh viên dựa theo Mã số sinh viên (mssv).
   * Chức năng: Tìm kiếm chính xác sinh viên trong danh sách.
   * @param mssv Mã số sinh viên cần truy vấn
   */
  laySinhVienTheoMssv: async (mssv: string): Promise<SinhVien | undefined> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 150ms
    await moPhongDoTre(150);

    // Bước 2: Tìm kiếm sinh viên theo mssv trong mảng cục bộ
    return danhSachSinhVienCucBo.find((s) => s.mssv === mssv);
  },

  /**
   * Hàm thêm mới một sinh viên nội trú vào hệ thống.
   * Chức năng: Lưu trữ thông tin sinh viên mới vào mảng quản lý.
   * @param sinhVien Đối tượng sinh viên mới cần thêm
   */
  taoSinhVien: async (sinhVien: SinhVien): Promise<SinhVien> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 300ms
    await moPhongDoTre(300);

    // Bước 2: Lưu sinh viên mới vào mảng cục bộ
    danhSachSinhVienCucBo.push(sinhVien);
    return sinhVien;
  },

  /**
   * Hàm cập nhật thông tin sinh viên nội trú.
   * Chức năng: Cập nhật các trường thông tin của sinh viên theo mssv.
   * @param mssv Mã số sinh viên cần cập nhật thông tin
   * @param duLieuSinhVien Dữ liệu cập nhật một phần của sinh viên
   */
  capNhatSinhVien: async (mssv: string, duLieuSinhVien: Partial<SinhVien>): Promise<SinhVien> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 300ms
    await moPhongDoTre(300);

    // Bước 2: Duyệt danh sách và gán dữ liệu cập nhật mới
    danhSachSinhVienCucBo = danhSachSinhVienCucBo.map((s) => 
      s.mssv === mssv ? { ...s, ...duLieuSinhVien } : s
    );

    // Bước 3: Tìm sinh viên vừa cập nhật để phản hồi về Client
    const sinhVienDaCapNhat = danhSachSinhVienCucBo.find((s) => s.mssv === mssv);
    if (! sinhVienDaCapNhat) {
      throw new Error('Student not found');
    }
    return sinhVienDaCapNhat;
  },

  /**
   * Hàm xóa thông tin sinh viên khỏi ký túc xá.
   * Chức năng: Loại bỏ sinh viên ra khỏi danh sách quản lý theo mssv.
   * @param mssv Mã số sinh viên cần xóa
   */
  xoaSinhVien: async (mssv: string): Promise<boolean> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 200ms
    await moPhongDoTre(200);

    // Bước 2: Lọc bỏ sinh viên đó khỏi mảng cục bộ
    danhSachSinhVienCucBo = danhSachSinhVienCucBo.filter((s) => s.mssv !== mssv);
    return true;
  }
};
