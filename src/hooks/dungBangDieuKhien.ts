import { useQuery } from '@tanstack/react-query';
import { dichVuBangDieuKhien } from '../services/bangDieuKhien.service';

/**
 * Custom React Hook truy vấn toàn bộ thông tin hiển thị tại trang chủ.
 * Chức năng: Gọi API bất đồng bộ và đồng bộ trạng thái tải dữ liệu của các biểu đồ và KPI.
 */
export const dungBangDieuKhien = () => {
  // Bước 1: Thực hiện truy vấn dữ liệu thống kê tổng hợp KPI, lịch sử và cảnh báo mới
  const truyVanBangDieuKhien = useQuery({
    queryKey: ['dashboardData'],
    queryFn: dichVuBangDieuKhien.layDuLieuBangDieuKhien,
  });

  // Bước 2: Thực hiện truy vấn dữ liệu biểu đồ lượt ra vào theo giờ
  const truyVanBieuDoRaVao = useQuery({
    queryKey: ['accessChartData'],
    queryFn: dichVuBangDieuKhien.layDuLieuBieuDoRaVao,
  });

  // Bước 3: Thực hiện truy vấn dữ liệu biểu đồ tròn phân bố theo khu nhà
  const truyVanBieuDoTronKtx = useQuery({
    queryKey: ['dormitoryPieData'],
    queryFn: dichVuBangDieuKhien.layDuLieuBieuDoTronKtx,
  });

  // Bước 4: Thực hiện truy vấn dữ liệu biểu đồ phát hiện đối tượng lạ đột nhập
  const truyVanBieuDoNguoiLa = useQuery({
    queryKey: ['strangerChartData'],
    queryFn: dichVuBangDieuKhien.layDuLieuBieuDoNguoiLa,
  });

  // Bước 5: Trả về dữ liệu đã lấy kèm trạng thái tải/lỗi tổng hợp và phương thức làm mới dữ liệu
  return {
    duLieuBangDieuKhien: truyVanBangDieuKhien.data,
    duLieuBieuDoRaVao: truyVanBieuDoRaVao.data,
    duLieuBieuDoTronKtx: truyVanBieuDoTronKtx.data,
    duLieuBieuDoNguoiLa: truyVanBieuDoNguoiLa.data,
    dangTai:
      truyVanBangDieuKhien.isLoading ||
      truyVanBieuDoRaVao.isLoading ||
      truyVanBieuDoTronKtx.isLoading ||
      truyVanBieuDoNguoiLa.isLoading,
    biLoi:
      truyVanBangDieuKhien.isError ||
      truyVanBieuDoRaVao.isError ||
      truyVanBieuDoTronKtx.isError ||
      truyVanBieuDoNguoiLa.isError,
    taiLaiTatCa: () => {
      truyVanBangDieuKhien.refetch();
      truyVanBieuDoRaVao.refetch();
      truyVanBieuDoTronKtx.refetch();
      truyVanBieuDoNguoiLa.refetch();
    },
  };
};
