import { moPhongDoTre } from '../lib/axios';
import { Ktx } from '../types/Ktx';
import { duLieuGiaLapKtx } from '../mocks/student.mock';

// Bản lưu trữ cục bộ danh sách dãy nhà ký túc xá trong phiên làm việc
let danhSachKtxCucBo = [...duLieuGiaLapKtx];

/**
 * Đối tượng cung cấp các dịch vụ liên quan đến quản lý các khu nhà ký túc xá.
 * Chức năng: Tìm kiếm, tạo mới, chỉnh sửa thông tin và xóa khu nhà.
 */
export const dichVuKtx = {
  /**
   * Hàm lấy danh sách các khu nhà ký túc xá.
   * Chức năng: Tìm kiếm và trả về danh sách khu nhà dựa trên bộ lọc từ khóa.
   * @param boLoc Tham số lọc tìm kiếm (tùy chọn)
   */
  layDanhSachKtx: async (boLoc?: { timKiem?: string }): Promise<Ktx[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 200ms
    await moPhongDoTre(200);

    let ketQua = [...danhSachKtxCucBo];

    // Bước 2: Lọc danh sách theo mã hoặc tên khu nhà nếu có
    if (boLoc?.timKiem) {
      const tuKhoa = boLoc.timKiem.toLowerCase();
      ketQua = ketQua.filter((d) => 
        d.id.toLowerCase().includes(tuKhoa) ||
        d.tenKtx.toLowerCase().includes(tuKhoa)
      );
    }
    return ketQua;
  },

  /**
   * Hàm thêm mới một khu nhà ký túc xá.
   * Chức năng: Lưu trữ thông tin một khu nhà mới vào danh sách.
   * @param ktx Đối tượng khu nhà mới
   */
  taoKtx: async (ktx: Ktx): Promise<Ktx> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 200ms
    await moPhongDoTre(200);

    // Bước 2: Lưu khu nhà mới vào mảng cục bộ
    danhSachKtxCucBo.push(ktx);
    return ktx;
  },

  /**
   * Hàm cập nhật thông tin khu nhà ký túc xá.
   * Chức năng: Cập nhật các trường thông tin của khu nhà dựa trên ID.
   * @param id Mã khu nhà cần cập nhật
   * @param duLieuKtx Dữ liệu cập nhật một phần của khu nhà
   */
  capNhatKtx: async (id: string, duLieuKtx: Partial<Ktx>): Promise<Ktx> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 200ms
    await moPhongDoTre(200);

    // Bước 2: Tìm kiếm và gán dữ liệu mới
    danhSachKtxCucBo = danhSachKtxCucBo.map((d) => 
      d.id === id ? { ...d, ...duLieuKtx } : d
    );

    // Bước 3: Tìm lại khu nhà vừa cập nhật để trả về kết quả
    const ktxDaCapNhat = danhSachKtxCucBo.find((d) => d.id === id);
    if (! ktxDaCapNhat) {
      throw new Error('Dormitory not found');
    }
    return ktxDaCapNhat;
  },

  /**
   * Hàm xóa khu nhà ký túc xá khỏi danh sách.
   * Chức năng: Xóa bỏ thông tin khu nhà theo mã định danh.
   * @param id Mã khu nhà cần xóa
   */
  xoaKtx: async (id: string): Promise<boolean> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 150ms
    await moPhongDoTre(150);

    // Bước 2: Lọc bỏ khu nhà khỏi mảng cục bộ
    danhSachKtxCucBo = danhSachKtxCucBo.filter((d) => d.id !== id);
    return true;
  }
};
