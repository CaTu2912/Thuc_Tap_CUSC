/**
 * Giao diện lưu trữ lịch sử ra vào ký túc xá của sinh viên.
 * Chức năng: Lưu trữ nhật ký kiểm soát truy cập tại các cổng/phòng.
 */
export interface LichSuRaVao {
  // Mã định danh bản ghi lịch sử
  id: string;

  // Thời gian diễn ra sự kiện ra hoặc vào
  thoiGian: string;

  // Mã số sinh viên thực hiện ra vào
  mssv: string;

  // Họ và tên đầy đủ của sinh viên
  hoVaTen: string;

  // Đường dẫn ảnh thẻ đại diện (tùy chọn)
  duongDanAnhDaiDien?: string;

  // Đường dẫn ảnh chụp camera khi quét thẻ/khuôn mặt (tùy chọn)
  duongDanAnhChup?: string;

  // Hướng di chuyển (Vào hay Ra)
  loai: 'IN' | 'OUT';

  // Mã dãy nhà ký túc xá
  maKtx: string;

  // Tên dãy nhà ký túc xá
  tenKtx: string;

  // Mã phòng ở của sinh viên
  maPhong: string;

  // Tên phòng ở của sinh viên
  tenPhong: string;

  // Tên thiết bị kiểm soát (Ví dụ: Cổng ra vào số 1)
  thietBi: string;

  // Ghi chú thêm (tùy chọn)
  ghiChu?: string;

  // Loại đối tượng quét thẻ (Sinh viên, Người lạ, Cán bộ, ...)
  loaiDoiTuong?: string;

  // Trạng thái phân loại của sinh viên (Bình thường, Nợ phí, Bị cấm)
  trangThaiSinhVien?: 'BINH_THUONG' | 'NO_PHI' | 'BI_CAM';

  // Trạng thái hiện diện trong KTX (Có mặt, Vắng mặt)
  trangThaiHienDien?: 'CO_MAT' | 'VANG_MAT';
}
