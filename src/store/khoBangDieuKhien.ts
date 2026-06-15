import { create } from 'zustand';
import { KpiBangDieuKhien } from '../types/BangDieuKhien';
import { duLieuGiaLapBangDieuKhien } from '../mocks/dashboard.mock';
import { CanhBao } from '../types/CanhBao';

// Định nghĩa giao diện quản lý trạng thái bảng điều khiển
interface TrangThaiBangDieuKhien {
  // Chỉ số KPI thống kê hiển thị nhanh tại dashboard
  chiSoKpi: KpiBangDieuKhien;

  // Danh sách các cảnh báo an ninh mới nhất
  canhBaoMoiNhat: CanhBao[];

  // Tổng số lượng cảnh báo đã được giải quyết xong
  soLuongCanhBaoDaGiaiQuyet: number;

  // Hàm cập nhật trạng thái đã giải quyết cho một cảnh báo theo ID
  giaiQuyetCanhBao: (id: string) => void;

  // Hàm cập nhật chỉ số KPI thống kê mới
  datChiSoKpi: (kpi: KpiBangDieuKhien) => void;

  // Hàm thiết lập danh sách cảnh báo an ninh mới
  datDanhSachCanhBao: (danhSachCanhBao: CanhBao[]) => void;
}

/**
 * Kho lưu trữ quản lý trạng thái dữ liệu hiển thị ở trang chủ.
 * Chức năng: Lưu trữ chỉ số KPI, danh sách cảnh báo, đếm số cảnh báo đã xử lý.
 */
export const dungKhoBangDieuKhien = create<TrangThaiBangDieuKhien>((set) => ({
  chiSoKpi: duLieuGiaLapBangDieuKhien.chiSoKpi,
  canhBaoMoiNhat: duLieuGiaLapBangDieuKhien.canhBaoMoiNhat,
  soLuongCanhBaoDaGiaiQuyet: duLieuGiaLapBangDieuKhien.canhBaoMoiNhat.filter((a) => a.daGiaiQuyet).length,

  giaiQuyetCanhBao: (id) => {
    return set((trangThai) => {
      // Duyệt danh sách cảnh báo và đặt trạng thái daGiaiQuyet thành true cho phần tử có ID trùng khớp
      const canhBaoDaCapNhat = trangThai.canhBaoMoiNhat.map((canhBao) => {
        return canhBao.id === id ? { ...canhBao, daGiaiQuyet: true } : canhBao;
      });

      return {
        canhBaoMoiNhat: canhBaoDaCapNhat,
        soLuongCanhBaoDaGiaiQuyet: canhBaoDaCapNhat.filter((a) => a.daGiaiQuyet).length,
      };
    });
  },

  datChiSoKpi: (kpi) => {
    return set({ chiSoKpi: kpi });
  },

  datDanhSachCanhBao: (danhSachCanhBao) => {
    return set({
      canhBaoMoiNhat: danhSachCanhBao,
      soLuongCanhBaoDaGiaiQuyet: danhSachCanhBao.filter((a) => a.daGiaiQuyet).length,
    });
  },
}));
