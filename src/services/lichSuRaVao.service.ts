import { moPhongDoTre } from '../lib/axios';
import { LichSuRaVao } from '../types/LichSuRaVao';
import { duLieuGiaLapLichSuRaVao } from '../mocks/history.mock';
import dayjs from 'dayjs';

// Mảng cục bộ lưu trữ các bản ghi lịch sử ra vào trong phiên làm việc
let danhSachLichSuRaVaoCucBo = [...duLieuGiaLapLichSuRaVao];

/**
 * Đối tượng cung cấp các dịch vụ liên quan đến lịch sử ra vào ký túc xá.
 * Chức năng: Tìm kiếm lịch sử, thêm bản ghi quét thẻ mới và xóa bản ghi lịch sử.
 */
export const dichVuLichSuRaVao = {
  /**
   * Hàm lấy danh sách lịch sử ra vào của sinh viên.
   * Chức năng: Lọc kết quả theo khoảng thời gian, mã sinh viên, họ tên, dãy nhà, loại ra/vào và sắp xếp mới nhất trước.
   * @param boLoc Bộ lọc tìm kiếm lịch sử (tùy chọn)
   */
  layDanhSachLichSu: async (boLoc?: {
    tuNgay?: string;
    denNgay?: string;
    mssv?: string;
    hoVaTen?: string;
    maKtx?: string;
    loai?: 'IN' | 'OUT' | 'ALL';
    trangThai?: string;
    loaiDoiTuong?: string;
  }): Promise<LichSuRaVao[]> => {
    // Bước 1: Giả lập độ trễ kết nối mạng 400ms
    await moPhongDoTre(400);

    let ketQua = [...danhSachLichSuRaVaoCucBo];

    // Bước 2: Lọc danh sách theo các điều kiện lọc nếu được cung cấp
    if (boLoc) {
      const { tuNgay, denNgay, mssv, hoVaTen, maKtx, loai, trangThai, loaiDoiTuong } = boLoc;

      // Lọc từ ngày bắt đầu
      if (tuNgay) {
        ketQua = ketQua.filter((h) => {
          return dayjs(h.thoiGian).isAfter(dayjs(tuNgay).startOf('day'));
        });
      }
      // Lọc đến ngày kết thúc
      if (denNgay) {
        ketQua = ketQua.filter((h) => {
          return dayjs(h.thoiGian).isBefore(dayjs(denNgay).endOf('day'));
        });
      }
      // Lọc theo mã số sinh viên
      if (mssv) {
        ketQua = ketQua.filter((h) => {
          return h.mssv.toLowerCase().includes(mssv.toLowerCase());
        });
      }
      // Lọc theo họ và tên sinh viên
      if (hoVaTen) {
        ketQua = ketQua.filter((h) => {
          return h.hoVaTen.toLowerCase().includes(hoVaTen.toLowerCase());
        });
      }
      // Lọc theo dãy nhà ký túc xá
      if (maKtx && maKtx !== 'ALL') {
        ketQua = ketQua.filter((h) => {
          return h.maKtx === maKtx;
        });
      }
      // Lọc theo hướng di chuyển (Vào hoặc Ra)
      if (loai && loai !== 'ALL') {
        ketQua = ketQua.filter((h) => {
          return h.loai === loai;
        });
      }
      // Lọc theo loại đối tượng
      if (loaiDoiTuong && loaiDoiTuong !== 'ALL') {
        ketQua = ketQua.filter((h) => {
          return h.loaiDoiTuong === loaiDoiTuong;
        });
      }
    }

    // Bước 3: Sắp xếp kết quả giảm dần theo thời gian ra vào
    return ketQua.sort((a, b) => {
      return dayjs(b.thoiGian).unix() - dayjs(a.thoiGian).unix();
    });
  },

  /**
   * Hàm tạo mới một bản ghi lịch sử ra vào ký túc xá.
   * Chức năng: Tự động phát sinh mã ID tăng dần và mốc thời gian hiện tại, thêm vào đầu mảng cục bộ.
   * @param duLieuLichSu Dữ liệu lịch sử cần tạo (bỏ qua id và thoiGian)
   */
  taoBanGhiLichSu: async (duLieuLichSu: Omit<LichSuRaVao, 'id' | 'thoiGian'>): Promise<LichSuRaVao> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 300ms
    await moPhongDoTre(300);

    // Bước 2: Khởi tạo thông tin bản ghi lịch sử mới
    const banGhiLichSuMoi: LichSuRaVao = {
      ...duLieuLichSu,
      id: `H${String(danhSachLichSuRaVaoCucBo.length + 1).padStart(3, '0')}`,
      thoiGian: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };

    // Bước 3: Đưa bản ghi mới lên đầu danh sách quản lý
    danhSachLichSuRaVaoCucBo = [banGhiLichSuMoi, ...danhSachLichSuRaVaoCucBo];
    return banGhiLichSuMoi;
  },

  /**
   * Hàm xóa bản ghi lịch sử ra vào khỏi danh sách.
   * Chức năng: Loại bỏ bản ghi dựa trên ID.
   * @param id Mã bản ghi lịch sử cần xóa
   */
  xoaBanGhiLichSu: async (id: string): Promise<boolean> => {
    // Bước 1: Giả lập độ trễ phản hồi từ API 200ms
    await moPhongDoTre(200);

    // Bước 2: Lọc bỏ bản ghi ra khỏi mảng cục bộ
    danhSachLichSuRaVaoCucBo = danhSachLichSuRaVaoCucBo.filter((h) => h.id !== id);
    return true;
  }
};
