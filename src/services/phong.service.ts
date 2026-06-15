import { moPhongDoTre } from '../lib/axios';
import { Phong } from '../types/Phong';
import { duLieuGiaLapPhong } from '../mocks/student.mock';

// Bản lưu trữ cục bộ danh sách phòng ở ký túc xá trong phiên làm việc
let danhSachPhongCucBo = [...duLieuGiaLapPhong];

/**
 * Đối tượng cung cấp các dịch vụ liên quan đến quản lý phòng ở ký túc xá.
 * Chức năng: Tìm kiếm danh sách phòng, tạo mới, chỉnh sửa thông tin và xóa phòng.
 */
export const dichVuPhong = {
  /**
   * Hàm lấy danh sách phòng ở ký túc xá.
   * Chức năng: Lọc danh sách theo từ khóa tìm kiếm (tên/mã phòng) và mã dãy nhà ký túc xá.
   * @param boLoc Bộ lọc tìm kiếm phòng ở (tùy chọn)
   */
  layDanhSachPhong: async (boLoc?: { timKiem?: string; maKtx?: string }): Promise<Phong[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 250ms
    await moPhongDoTre(250);

    let ketQua = [...danhSachPhongCucBo];

    // Bước 2: Lọc danh sách theo các điều kiện lọc nếu được cung cấp
    if (boLoc) {
      const { timKiem, maKtx } = boLoc;
      
      // Lọc theo từ khóa tìm kiếm (mã phòng hoặc tên phòng)
      if (timKiem) {
        const tuKhoa = timKiem.toLowerCase();
        ketQua = ketQua.filter((r) => 
          r.tenPhong.toLowerCase().includes(tuKhoa) || 
          r.id.toLowerCase().includes(tuKhoa)
        );
      }
      
      // Lọc theo mã dãy nhà
      if (maKtx) {
        ketQua = ketQua.filter((r) => r.maKtx === maKtx);
      }
    }
    return ketQua;
  },

  /**
   * Hàm thêm mới một phòng ở vào danh sách.
   * Chức năng: Lưu trữ thông tin một phòng mới vào mảng cục bộ.
   * @param phong Đối tượng phòng ở mới
   */
  taoPhong: async (phong: Phong): Promise<Phong> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 250ms
    await moPhongDoTre(250);

    // Bước 2: Lưu phòng mới vào mảng cục bộ
    danhSachPhongCucBo.push(phong);
    return phong;
  },

  /**
   * Hàm cập nhật thông tin phòng ở ký túc xá.
   * Chức năng: Chỉnh sửa các trường thông tin của phòng theo mã ID.
   * @param id Mã phòng cần cập nhật
   * @param duLieuPhong Dữ liệu cập nhật một phần của phòng
   */
  capNhatPhong: async (id: string, duLieuPhong: Partial<Phong>): Promise<Phong> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 250ms
    await moPhongDoTre(250);

    // Bước 2: Tìm kiếm và gán dữ liệu cập nhật mới
    danhSachPhongCucBo = danhSachPhongCucBo.map((r) => 
      r.id === id ? { ...r, ...duLieuPhong } : r
    );

    // Bước 3: Truy vấn lại đối tượng vừa cập nhật để trả về kết quả
    const phongDaCapNhat = danhSachPhongCucBo.find((r) => r.id === id);
    if (! phongDaCapNhat) {
      throw new Error('Room not found');
    }
    return phongDaCapNhat;
  },

  /**
   * Hàm xóa phòng ở khỏi hệ thống.
   * Chức năng: Loại bỏ phòng ở khỏi mảng cục bộ dựa trên mã ID.
   * @param id Mã phòng cần xóa
   */
  xoaPhong: async (id: string): Promise<boolean> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 150ms
    await moPhongDoTre(150);

    // Bước 2: Lọc bỏ phòng ra khỏi mảng cục bộ
    danhSachPhongCucBo = danhSachPhongCucBo.filter((r) => r.id !== id);
    return true;
  }
};
