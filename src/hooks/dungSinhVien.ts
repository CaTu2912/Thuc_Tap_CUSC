import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dichVuSinhVien } from '../services/sinhVien.service';
import { dichVuKtx } from '../services/ktx.service';
import { dichVuPhong } from '../services/phong.service';
import { SinhVien } from '../types/SinhVien';

/**
 * Custom React Hook quản lý trạng thái truy vấn dữ liệu sinh viên, phòng ở, khu nhà và các thao tác cập nhật (CRUD).
 * Chức năng: Tự động tải danh sách sinh viên nội trú dựa trên bộ lọc, danh sách dãy nhà, danh sách phòng và thực hiện đột biến dữ liệu.
 * @param boLocSinhVien Tham số bộ lọc tìm kiếm sinh viên (tùy chọn)
 */
export const dungSinhVien = (boLocSinhVien?: { timKiem?: string; maKtx?: string; trangThai?: string }) => {
  const boQuanLyTruyVan = useQueryClient();

  // Bước 1: Truy vấn danh sách sinh viên theo bộ lọc hiện hành
  const truyVanSinhVien = useQuery({
    queryKey: ['students', boLocSinhVien],
    queryFn: () => {
      return dichVuSinhVien.layDanhSachSinhVien(boLocSinhVien);
    },
  });

  // Bước 2: Truy vấn danh sách tất cả các khu nhà ký túc xá
  const truyVanKtx = useQuery({
    queryKey: ['dormitories'],
    queryFn: () => {
      return dichVuKtx.layDanhSachKtx();
    },
  });

  // Bước 3: Truy vấn danh sách tất cả các phòng ở ký túc xá
  const truyVanPhong = useQuery({
    queryKey: ['rooms'],
    queryFn: () => {
      return dichVuPhong.layDanhSachPhong();
    },
  });

  // Bước 4: Đột biến dữ liệu (Mutation) thêm mới sinh viên nội trú
  const bienDoiTaoSinhVien = useMutation({
    mutationFn: (sinhVien: SinhVien) => {
      return dichVuSinhVien.taoSinhVien(sinhVien);
    },
    onSuccess: () => {
      // Làm mới dữ liệu sau khi tạo mới thành công
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['students'] });
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  // Bước 5: Đột biến dữ liệu (Mutation) cập nhật thông tin sinh viên theo mssv
  const bienDoiCapNhatSinhVien = useMutation({
    mutationFn: ({ mssv, duLieu }: { mssv: string; duLieu: Partial<SinhVien> }) => {
      return dichVuSinhVien.capNhatSinhVien(mssv, duLieu);
    },
    onSuccess: () => {
      // Làm mới dữ liệu sau khi cập nhật thành công
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['students'] });
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  // Bước 6: Đột biến dữ liệu (Mutation) xóa sinh viên khỏi ký túc xá
  const bienDoiXoaSinhVien = useMutation({
    mutationFn: (mssv: string) => {
      return dichVuSinhVien.xoaSinhVien(mssv);
    },
    onSuccess: () => {
      // Làm mới dữ liệu sau khi xóa thành công
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['students'] });
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  // Bước 7: Trả về dữ liệu kết quả và các hàm thao tác cập nhật
  return {
    danhSachSinhVien: truyVanSinhVien.data || [],
    danhSachKtx: truyVanKtx.data || [],
    danhSachPhong: truyVanPhong.data || [],
    dangTaiSinhVien: truyVanSinhVien.isLoading,
    dangTaiKtx: truyVanKtx.isLoading,
    dangTaiPhong: truyVanPhong.isLoading,
    taoSinhVien: bienDoiTaoSinhVien.mutateAsync,
    capNhatSinhVien: bienDoiCapNhatSinhVien.mutateAsync,
    xoaSinhVien: bienDoiXoaSinhVien.mutateAsync,
  };
};
