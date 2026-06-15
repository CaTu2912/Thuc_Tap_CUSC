/**
 * Giao diện đại diện cho thông tin sinh viên tại ký túc xá.
 * Chức năng: Lưu trữ và định nghĩa cấu trúc dữ liệu của sinh viên.
 */
export interface SinhVien {
  // Mã số sinh viên (khóa chính)
  mssv: string;

  // Họ và tên đầy đủ của sinh viên
  hoVaTen: string;

  // Ngày sinh của sinh viên (định dạng YYYY-MM-DD)
  ngaySinh: string;

  // Giới tính của sinh viên
  gioiTinh: 'Nam' | 'Nữ';

  // Mã dãy nhà ký túc xá mà sinh viên đang ở
  maKtx: string;

  // Tên dãy nhà ký túc xá (tùy chọn)
  tenKtx?: string;

  // Mã phòng của sinh viên trong dãy nhà
  maPhong: string;

  // Tên phòng của sinh viên (tùy chọn)
  tenPhong?: string;

  // Trạng thái hoạt động của sinh viên (Hoạt động, Không hoạt động, Bị hạn chế)
  trangThai: 'ACTIVE' | 'INACTIVE' | 'BANNED';

  // Đường dẫn ảnh đại diện của sinh viên (tùy chọn)
  duongDanAnhDaiDien?: string;

  // Số tiền nợ phí ký túc xá của sinh viên (nếu có)
  noPhi?: number;

  // Mốc thời gian ra vào cuối cùng của sinh viên (tùy chọn)
  thoiGianRaVaoCuoi?: string;

  // Trạng thái đang có mặt ở trong ký túc xá hay không
  dangCoMat?: boolean;

  // Số ngày vắng mặt liên tục khỏi ký túc xá (tùy chọn)
  soNgayVang?: number;
}
