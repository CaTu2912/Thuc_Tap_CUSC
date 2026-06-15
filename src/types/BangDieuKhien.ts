import { LichSuRaVao } from './LichSuRaVao';
import { PhanHoi } from './PhanHoi';
import { SinhVien } from './SinhVien';
import { CanhBao } from './CanhBao';

/**
 * Giao diện các chỉ số đo lường hiệu suất (KPI) tại trang chủ.
 */
export interface KpiBangDieuKhien {
  // Tổng số lượng sinh viên nội trú
  tongSoSinhVien: number;

  // Số lượng sinh viên đang có mặt tại KTX
  sinhVienCoMat: number;

  // Số lượng sinh viên đang ở bên ngoài
  sinhVienVangMat: number;

  // Số lượng sinh viên nợ phí ký túc xá
  sinhVienNoPhi: number;

  // Số lượng sinh viên bị hạn chế ra vào
  sinhVienBiHanChe: number;

  // Số lượng lượt phát hiện người lạ đột nhập hôm nay
  nguoiLaPhatHienHomNay: number;
}

/**
 * Giao diện dữ liệu biểu đồ biểu diễn lượt ra vào theo khung giờ.
 */
export interface DuLieuBieuDoRaVao {
  // Khung giờ (Ví dụ: "08:00", "09:00")
  thoiGian: string;

  // Lượt quét đi vào
  luotVao: number;

  // Lượt quét đi ra
  luotRa: number;
}

/**
 * Giao diện dữ liệu biểu đồ tròn tỷ lệ sinh viên theo từng dãy nhà.
 */
export interface DuLieuBieuDoTronKtx {
  // Tên dãy nhà
  ten: string;

  // Số lượng sinh viên đang nội trú tại dãy đó
  giaTri: number;
}

/**
 * Giao diện dữ liệu biểu đồ thống kê phát hiện người lạ theo ngày.
 */
export interface DuLieuBieuDoNguoiLa {
  // Ngày thống kê
  ngay: string;

  // Số lượt phát hiện trong ngày
  soLuong: number;
}

/**
 * Giao diện chứa tất cả dữ liệu tổng hợp hiển thị tại bảng điều khiển chính.
 */
export interface DuLieuBangDieuKhien {
  // Nhóm chỉ số KPI thống kê nhanh
  chiSoKpi: KpiBangDieuKhien;

  // Danh sách lượt ra vào mới nhất
  lichSuRaVaoMoiNhat: LichSuRaVao[];

  // Danh sách các cảnh báo an ninh mới nhất
  canhBaoMoiNhat: CanhBao[];

  // Danh sách các sinh viên đang vắng mặt
  sinhVienVangMat: SinhVien[];

  // Danh sách các sinh viên đang có mặt
  sinhVienCoMat: SinhVien[];

  // Danh sách các phản hồi mới nhất của sinh viên
  phanHoiMoiNhat: PhanHoi[];
}
