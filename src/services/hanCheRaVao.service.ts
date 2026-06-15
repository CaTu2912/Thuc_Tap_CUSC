import { moPhongDoTre } from '../lib/axios';
import { ThongKeSinhVienBiHanChe } from '../types/ThongKe';
import { duLieuGiaLapThongKeSinhVienBiHanChe } from '../mocks/statistics.mock';

// Bản lưu trữ cục bộ danh sách sinh viên bị hạn chế ra vào trong phiên làm việc
let danhSachSinhVienBiHanCheCucBo = [...duLieuGiaLapThongKeSinhVienBiHanChe];

/**
 * Đối tượng cung cấp các dịch vụ liên quan đến việc hạn chế/cấm ra vào của sinh viên.
 * Chức năng: Quản lý danh sách sinh viên bị hạn chế, thêm lệnh phạt, gỡ bỏ lệnh cấm.
 */
export const dichVuHanCheRaVao = {
  /**
   * Hàm lấy danh sách sinh viên đang hoặc đã từng bị hạn chế ra vào.
   * Chức năng: Tìm kiếm và trả về danh sách dựa trên bộ lọc từ khóa.
   * @param boLoc Tham số lọc tìm kiếm (tùy chọn)
   */
  layDanhSachSinhVienBiHanChe: async (boLoc?: { timKiem?: string }): Promise<ThongKeSinhVienBiHanChe[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 250ms
    await moPhongDoTre(250);

    let ketQua = [...danhSachSinhVienBiHanCheCucBo];

    // Bước 2: Lọc danh sách theo từ khóa tìm kiếm (họ tên hoặc mssv) nếu có
    if (boLoc?.timKiem) {
      const tuKhoa = boLoc.timKiem.toLowerCase();
      ketQua = ketQua.filter((b) => 
        b.mssv.toLowerCase().includes(tuKhoa) ||
        b.hoVaTen.toLowerCase().includes(tuKhoa)
      );
    }
    return ketQua;
  },

  /**
   * Hàm áp đặt lệnh hạn chế ra vào mới đối với sinh viên.
   * Chức năng: Thêm mới một bản ghi hạn chế vào đầu danh sách quản lý.
   * @param banGhiHanChe Thông tin lệnh hạn chế mới
   */
  hanCheSinhVien: async (banGhiHanChe: ThongKeSinhVienBiHanChe): Promise<ThongKeSinhVienBiHanChe> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 300ms
    await moPhongDoTre(300);

    // Bước 2: Thêm bản ghi mới vào đầu danh sách
    danhSachSinhVienBiHanCheCucBo = [banGhiHanChe, ...danhSachSinhVienBiHanCheCucBo];
    return banGhiHanChe;
  },

  /**
   * Hàm gỡ bỏ/cho hết hạn lệnh hạn chế đối với sinh viên.
   * Chức năng: Cập nhật trạng thái lệnh hạn chế thành hết hiệu lực (EXPIRED).
   * @param mssv Mã số sinh viên cần gỡ bỏ hạn chế
   */
  goBoHanChe: async (mssv: string): Promise<boolean> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 200ms
    await moPhongDoTre(200);

    // Bước 2: Tìm kiếm và cập nhật trạng thái của lệnh cấm thành EXPIRED
    danhSachSinhVienBiHanCheCucBo = danhSachSinhVienBiHanCheCucBo.map((b) => 
      b.mssv === mssv ? { ...b, trangThai: 'EXPIRED' as const } : b
    );
    return true;
  },

  /**
   * Hàm xóa hoàn toàn bản ghi hạn chế ra vào khỏi danh sách.
   * Chức năng: Loại bỏ bản ghi hạn chế dựa trên mã số sinh viên.
   * @param mssv Mã số sinh viên cần xóa bản ghi
   */
  xoaBanGhiHanChe: async (mssv: string): Promise<boolean> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 150ms
    await moPhongDoTre(150);

    // Bước 2: Lọc bỏ sinh viên đó ra khỏi danh sách
    danhSachSinhVienBiHanCheCucBo = danhSachSinhVienBiHanCheCucBo.filter((b) => b.mssv !== mssv);
    return true;
  }
};
