/**
 * Giao diện đại diện cho một phòng ở ký túc xá.
 * Chức năng: Định nghĩa cấu trúc dữ liệu của phòng ở.
 */
export interface Phong {
  // Mã phòng duy nhất
  id: string;

  // Tên phòng (Ví dụ: Phòng 101, Phòng 102)
  tenPhong: string;

  // Mã dãy nhà chứa phòng này
  maKtx: string;

  // Tên dãy nhà chứa phòng này
  tenKtx: string;

  // Tầng của phòng (Ví dụ: Tầng 1, Tầng 2)
  tang: number;

  // Sức chứa tối đa của phòng (Ví dụ: 8 sinh viên)
  sucChua: number;

  // Số lượng sinh viên hiện đang ở trong phòng
  soNguoiO: number;

  // Trạng thái phòng (Còn chỗ trống, Đã đầy, Đang bảo trì)
  trangThai: 'AVAILABLE' | 'FULL' | 'MAINTENANCE';
}
