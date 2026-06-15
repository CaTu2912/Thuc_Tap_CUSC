import { moPhongDoTre } from '../lib/axios';
import { PhanHoi } from '../types/PhanHoi';
import { duLieuGiaLapPhanHoi } from '../mocks/feedback.mock';
import dayjs from 'dayjs';

// Mảng cục bộ lưu trữ các phản hồi trong phiên làm việc
let danhSachPhanHoiCucBo = [...duLieuGiaLapPhanHoi];

/**
 * Đối tượng cung cấp các dịch vụ liên quan đến quản lý phản hồi của sinh viên.
 * Chức năng: Lấy danh sách phản hồi, giải quyết phản hồi và xóa phản hồi.
 */
export const dichVuPhanHoi = {
  /**
   * Hàm lấy danh sách phản hồi của sinh viên.
   * Chức năng: Hỗ trợ tìm kiếm, lọc theo trạng thái và sắp xếp theo thứ tự thời gian mới nhất trước.
   * @param boLoc Bộ lọc phản hồi (tùy chọn)
   */
  layDanhSachPhanHoi: async (boLoc?: { timKiem?: string; trangThai?: 'PENDING' | 'RESOLVED' }): Promise<PhanHoi[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 300ms
    await moPhongDoTre(300);

    let ketQua = [...danhSachPhanHoiCucBo];
    
    // Bước 2: Lọc dữ liệu theo từ khóa tìm kiếm (họ tên, mssv, nội dung) nếu có
    if (boLoc) {
      const { timKiem, trangThai } = boLoc;
      if (timKiem) {
        const tuKhoa = timKiem.toLowerCase();
        ketQua = ketQua.filter((f) => 
          f.mssv.toLowerCase().includes(tuKhoa) ||
          f.hoVaTen.toLowerCase().includes(tuKhoa) ||
          f.noiDung.toLowerCase().includes(tuKhoa)
        );
      }
      // Bước 3: Lọc dữ liệu theo trạng thái phản hồi nếu có
      if (trangThai) {
        ketQua = ketQua.filter((f) => f.trangThai === trangThai);
      }
    }
    
    // Bước 4: Sắp xếp danh sách giảm dần theo mốc thời gian gửi phản hồi
    return ketQua.sort((a, b) => dayjs(b.thoiGian).unix() - dayjs(a.thoiGian).unix());
  },

  /**
   * Hàm giải quyết phản hồi của sinh viên.
   * Chức năng: Cập nhật trạng thái thành RESOLVED kèm thông tin người giải quyết và thời gian hoàn tất.
   * @param id Mã phản hồi cần giải quyết
   * @param tenQuanTri Tên của cán bộ quản lý giải quyết phản hồi
   */
  giaiQuyetPhanHoi: async (id: string, tenQuanTri: string): Promise<PhanHoi> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 250ms
    await moPhongDoTre(250);

    // Bước 2: Cập nhật trạng thái phản hồi tương ứng
    danhSachPhanHoiCucBo = danhSachPhanHoiCucBo.map((f) => 
      f.id === id 
        ? { ...f, trangThai: 'RESOLVED', nguoiGiaiQuyet: tenQuanTri, thoiGianGiaiQuyet: dayjs().format('YYYY-MM-DD HH:mm:ss') }
        : f
    );

    // Bước 3: Truy vấn lại phản hồi vừa cập nhật để trả về kết quả
    const phanHoiDaCapNhat = danhSachPhanHoiCucBo.find((f) => f.id === id);
    if (! phanHoiDaCapNhat) {
      throw new Error('Feedback not found');
    }
    return phanHoiDaCapNhat;
  },

  /**
   * Hàm xóa hoàn toàn phản hồi của sinh viên khỏi danh sách.
   * Chức năng: Loại bỏ phản hồi khỏi danh sách dựa trên mã ID.
   * @param id Mã phản hồi cần xóa
   */
  xoaPhanHoi: async (id: string): Promise<boolean> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 200ms
    await moPhongDoTre(200);

    // Bước 2: Lọc bỏ phản hồi ra khỏi mảng cục bộ
    danhSachPhanHoiCucBo = danhSachPhanHoiCucBo.filter((f) => f.id !== id);
    return true;
  }
};
