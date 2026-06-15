import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dichVuLichSuRaVao } from '../services/lichSuRaVao.service';
import { dungKhoLichSu } from '../store/khoLichSu';
import { LichSuRaVao } from '../types/LichSuRaVao';

/**
 * Custom React Hook xử lý việc truy vấn và thao tác trên lịch sử ra vào.
 * Chức năng: Đồng bộ bộ lọc tìm kiếm từ Zustand, gọi API lấy danh sách, thêm và xóa lịch sử ra vào.
 */
export const dungLichSu = () => {
  const boQuanLyTruyVan = useQueryClient();
  
  // Bước 1: Lấy thông tin bộ lọc tìm kiếm hiện hành từ Zustand store
  const boLoc = dungKhoLichSu((trangThai) => trangThai.boLoc);

  // Bước 2: Thực hiện truy vấn danh sách lịch sử ra vào dựa theo bộ lọc
  const truyVanLichSu = useQuery({
    queryKey: ['accessHistories', boLoc],
    queryFn: () => {
      return dichVuLichSuRaVao.layDanhSachLichSu(boLoc);
    },
  });

  // Bước 3: Định nghĩa hành động đột biến (mutation) tạo mới bản ghi lịch sử
  const bienDoiTao = useMutation({
    mutationFn: (duLieu: Omit<LichSuRaVao, 'id' | 'thoiGian'>) => {
      return dichVuLichSuRaVao.taoBanGhiLichSu(duLieu);
    },
    onSuccess: () => {
      // Làm mới dữ liệu truy vấn liên quan sau khi tạo thành công
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['accessHistories'] });
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  // Bước 4: Định nghĩa hành động đột biến (mutation) xóa bản ghi lịch sử
  const bienDoiXoa = useMutation({
    mutationFn: (id: string) => {
      return dichVuLichSuRaVao.xoaBanGhiLichSu(id);
    },
    onSuccess: () => {
      // Làm mới dữ liệu truy vấn liên quan sau khi xóa thành công
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['accessHistories'] });
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  // Bước 5: Trả về kết quả truy vấn, trạng thái tải dữ liệu và các hành động đột biến tương tác
  return {
    danhSachLichSu: truyVanLichSu.data || [],
    dangTai: truyVanLichSu.isLoading,
    biLoi: truyVanLichSu.isError,
    taiLai: truyVanLichSu.refetch,
    taoBanGhiLichSu: bienDoiTao.mutateAsync,
    dangTao: bienDoiTao.isPending,
    xoaBanGhiLichSu: bienDoiXoa.mutateAsync,
    dangXoa: bienDoiXoa.isPending,
  };
};
