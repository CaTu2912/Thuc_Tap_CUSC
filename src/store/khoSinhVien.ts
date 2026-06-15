import { create } from 'zustand';
import { SinhVien } from '../types/SinhVien';
import { Phong } from '../types/Phong';
import { Ktx } from '../types/Ktx';
import { NguoiDung } from '../types/NguoiDung';

// Định nghĩa giao diện quản lý các trạng thái lựa chọn đối tượng và đóng mở drawer biểu mẫu
interface TrangThaiSinhVien {
  // Sinh viên đang được lựa chọn để chỉnh sửa thông tin
  sinhVienDuocChon: SinhVien | null;
  // Trạng thái mở/đóng drawer thông tin sinh viên
  moDrawerSinhVien: boolean;

  // Phòng đang được lựa chọn để chỉnh sửa thông tin
  phongDuocChon: Phong | null;
  // Trạng thái mở/đóng drawer thông tin phòng
  moDrawerPhong: boolean;

  // Khu nhà đang được lựa chọn để chỉnh sửa thông tin
  ktxDuocChon: Ktx | null;
  // Trạng thái mở/đóng drawer thông tin khu nhà
  moDrawerKtx: boolean;

  // Người quản trị đang được lựa chọn để chỉnh sửa thông tin
  nguoiDungDuocChon: NguoiDung | null;
  // Trạng thái mở/đóng drawer thông tin người dùng
  moDrawerNguoiDung: boolean;
  
  // Các hàm thiết lập lựa chọn đối tượng và trạng thái drawer tương ứng
  datSinhVienDuocChon: (sinhVien: SinhVien | null) => void;
  datMoDrawerSinhVien: (mo: boolean) => void;
  datPhongDuocChon: (phong: Phong | null) => void;
  datMoDrawerPhong: (mo: boolean) => void;
  datKtxDuocChon: (ktx: Ktx | null) => void;
  datMoDrawerKtx: (mo: boolean) => void;
  datNguoiDungDuocChon: (nguoiDung: NguoiDung | null) => void;
  datMoDrawerNguoiDung: (mo: boolean) => void;
}

/**
 * Kho lưu trữ quản lý trạng thái các đối tượng danh mục (Sinh viên, Phòng, Dãy nhà, Người dùng).
 * Chức năng: Lưu trữ thông tin đối tượng đang tương tác và điều khiển việc hiển thị các drawer chỉnh sửa tương ứng.
 */
export const dungKhoSinhVien = create<TrangThaiSinhVien>((set) => ({
  sinhVienDuocChon: null,
  moDrawerSinhVien: false,
  phongDuocChon: null,
  moDrawerPhong: false,
  ktxDuocChon: null,
  moDrawerKtx: false,
  nguoiDungDuocChon: null,
  moDrawerNguoiDung: false,

  datSinhVienDuocChon: (sinhVien) => {
    return set({ sinhVienDuocChon: sinhVien });
  },
  datMoDrawerSinhVien: (mo) => {
    return set({ moDrawerSinhVien: mo });
  },
  datPhongDuocChon: (phong) => {
    return set({ phongDuocChon: phong });
  },
  datMoDrawerPhong: (mo) => {
    return set({ moDrawerPhong: mo });
  },
  datKtxDuocChon: (ktx) => {
    return set({ ktxDuocChon: ktx });
  },
  datMoDrawerKtx: (mo) => {
    return set({ moDrawerKtx: mo });
  },
  datNguoiDungDuocChon: (nguoiDung) => {
    return set({ nguoiDungDuocChon: nguoiDung });
  },
  datMoDrawerNguoiDung: (mo) => {
    return set({ moDrawerNguoiDung: mo });
  },
}));
