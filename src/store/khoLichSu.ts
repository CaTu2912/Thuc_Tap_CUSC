import { create } from 'zustand';
import { LichSuRaVao } from '../types/LichSuRaVao';

// Định nghĩa giao diện cho bộ lọc tìm kiếm lịch sử
interface BoLocLichSu {
  // Lọc từ ngày bắt đầu
  tuNgay?: string;

  // Lọc đến ngày kết thúc
  denNgay?: string;

  // Lọc theo mã số sinh viên
  mssv?: string;

  // Lọc theo họ và tên sinh viên
  hoVaTen?: string;

  // Lọc theo mã khu nhà
  maKtx?: string;

  // Lọc theo mã phòng ở
  maPhong?: string;

  // Lọc theo loại di chuyển (Vào, Ra, Tất cả)
  loai?: 'IN' | 'OUT' | 'ALL';

  // Lọc theo trạng thái hiện diện (Có mặt, Vắng mặt, Tất cả)
  trangThai?: string;

  // Lọc theo loại đối tượng (Sinh viên, Người lạ, Tất cả)
  loaiDoiTuong?: string;
}

// Định nghĩa giao diện quản lý trạng thái lịch sử ra vào
interface TrangThaiLichSu {
  // Bộ lọc lịch sử hiện hành
  boLoc: BoLocLichSu;

  // Bản ghi lịch sử đang được lựa chọn để xem chi tiết
  lichSuDuocChon: LichSuRaVao | null;

  // Trạng thái mở/đóng của drawer xem chi tiết bản ghi
  moDrawerChiTiet: boolean;

  // Trạng thái mở/đóng của drawer tạo mới/sửa lịch sử
  moDrawerBieuMau: boolean;

  // Hàm cập nhật thêm điều kiện lọc vào bộ lọc hiện tại
  datBoLoc: (boLocMoi: BoLocLichSu) => void;

  // Hàm thiết lập lại bộ lọc về các giá trị trống mặc định
  datLaiBoLoc: () => void;

  // Hàm thiết lập bản ghi lịch sử đang được lựa chọn
  datLichSuDuocChon: (lichSu: LichSuRaVao | null) => void;

  // Hàm đóng/mở drawer xem thông tin chi tiết
  datMoDrawerChiTiet: (mo: boolean) => void;

  // Hàm đóng/mở drawer biểu mẫu nhập liệu
  datMoDrawerBieuMau: (mo: boolean) => void;
}

// Giá trị mặc định ban đầu của bộ lọc lịch sử
const boLocBanDau: BoLocLichSu = {
  tuNgay: '',
  denNgay: '',
  mssv: '',
  hoVaTen: '',
  maKtx: '',
  maPhong: '',
  loai: 'ALL',
  trangThai: 'ALL',
  loaiDoiTuong: 'ALL',
};

/**
 * Kho lưu trữ quản lý trạng thái lịch sử ra vào ký túc xá.
 * Chức năng: Lưu trữ bộ lọc tìm kiếm, bản ghi lịch sử đang chọn và trạng thái mở các drawer.
 */
export const dungKhoLichSu = create<TrangThaiLichSu>((set) => ({
  boLoc: boLocBanDau,
  lichSuDuocChon: null,
  moDrawerChiTiet: false,
  moDrawerBieuMau: false,

  datBoLoc: (boLocMoi) => {
    return set((trangThai) => ({
      boLoc: { ...trangThai.boLoc, ...boLocMoi }
    }));
  },

  datLaiBoLoc: () => {
    return set({ boLoc: boLocBanDau });
  },

  datLichSuDuocChon: (lichSu) => {
    return set({ lichSuDuocChon: lichSu });
  },

  datMoDrawerChiTiet: (mo) => {
    return set({ moDrawerChiTiet: mo });
  },

  datMoDrawerBieuMau: (mo) => {
    return set({ moDrawerBieuMau: mo });
  },
}));
