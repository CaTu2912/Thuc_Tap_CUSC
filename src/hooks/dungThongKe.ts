import { useQuery } from '@tanstack/react-query';
import { dichVuThongKe } from '../services/thongKe.service';
import { dungKhoThongKe } from '../store/khoThongKe';
import type { ThongKeRaVaoTheoKtx, ThongKeRaVaoTheoThoiGian } from '../types/ThongKe';

// Định nghĩa kiểu dữ liệu gộp cho thống kê khung thời gian (theo thời gian hoặc theo khu nhà)
type ThongKeKhungThoiGian = ThongKeRaVaoTheoThoiGian | ThongKeRaVaoTheoKtx;

/**
 * Custom React Hook xử lý việc truy vấn các báo cáo thống kê phân tích ký túc xá.
 * Chức năng: Đọc khung thời gian hoạt động từ Zustand store và kích hoạt các truy vấn React Query song song.
 */
export const dungThongKe = () => {
  // Bước 1: Lấy khung thời gian đang được chọn từ Zustand store (Ngày, Tháng, Năm, Dãy nhà)
  const khungThoiGian = dungKhoThongKe((trangThai) => trangThai.khungThoiGian);

  // Bước 2: Thực hiện truy vấn dữ liệu thống kê ra vào tương ứng với khung thời gian đã chọn
  const truyVanThongKe = useQuery<ThongKeKhungThoiGian[]>({
    queryKey: ['statisticsByTime', khungThoiGian],
    queryFn: () => {
      // Nếu chọn thống kê theo khu nhà, gọi API lấy dữ liệu khu nhà
      if (khungThoiGian === 'DORMITORY') {
        return dichVuThongKe.layThongKeTheoKtx();
      }
      // Ngược lại, gọi API thống kê theo khung thời gian chung (Ngày/Tháng/Năm)
      return dichVuThongKe.layThongKeTheoThoiGian(khungThoiGian);
    },
  });

  // Bước 3: Thực hiện truy vấn danh sách sinh viên ra vào nhiều nhất
  const truyVanTopSinhVien = useQuery({
    queryKey: ['topAccessStudents'],
    queryFn: dichVuThongKe.laySinhVienRaVaoNhieuNhat,
  });

  // Bước 4: Thực hiện truy vấn danh sách sinh viên vắng mặt lâu ngày
  const truyVanSinhVienVangMat = useQuery({
    queryKey: ['longAbsentStudents'],
    queryFn: dichVuThongKe.laySinhVienVangMatLauNgay,
  });

  // Bước 5: Thực hiện truy vấn báo cáo thống kê phát hiện người lạ
  const truyVanThongKeNguoiLa = useQuery({
    queryKey: ['strangerStats'],
    queryFn: dichVuThongKe.layThongKeNguoiLa,
  });

  // Bước 6: Thực hiện truy vấn danh sách sinh viên đang bị hạn chế ra vào
  const truyVanThongKeHanChe = useQuery({
    queryKey: ['bannedStudentStats'],
    queryFn: dichVuThongKe.layThongKeSinhVienBiHanChe,
  });

  // Bước 7: Trả về kết quả và trạng thái tải tổng hợp
  return {
    thongKeKhungThoiGian: truyVanThongKe.data || [],
    topSinhVien: truyVanTopSinhVien.data || [],
    sinhVienVangMat: truyVanSinhVienVangMat.data || [],
    thongKeNguoiLa: truyVanThongKeNguoiLa.data || [],
    thongKeSinhVienBiHanChe: truyVanThongKeHanChe.data || [],
    dangTai:
      truyVanThongKe.isLoading ||
      truyVanTopSinhVien.isLoading ||
      truyVanSinhVienVangMat.isLoading ||
      truyVanThongKeNguoiLa.isLoading ||
      truyVanThongKeHanChe.isLoading,
  };
};
