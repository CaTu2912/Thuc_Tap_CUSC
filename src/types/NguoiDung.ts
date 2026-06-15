/**
 * Giao diện đại diện cho người dùng hệ thống (quản lý, nhân viên vận hành, quản trị viên).
 * Chức năng: Lưu trữ thông tin tài khoản người dùng của hệ thống.
 */
export interface NguoiDung {
  // Mã định danh duy nhất của người dùng
  id: string;

  // Tên đăng nhập dùng để đăng nhập hệ thống
  tenDangNhap: string;

  // Họ và tên đầy đủ của người dùng
  hoVaTen: string;

  // Thư điện tử (Email) liên hệ
  email: string;

  // Vai trò của tài khoản (Quản trị viên, Quản lý, Nhân viên vận hành)
  vaiTro: 'ADMIN' | 'MANAGER' | 'OPERATOR';

  // Trạng thái tài khoản (Đang hoạt động, Đang bị tạm khóa)
  trangThai: 'ACTIVE' | 'INACTIVE';

  // Đường dẫn ảnh đại diện của người dùng (tùy chọn)
  duongDanAnhDaiDien?: string;

  // Thời gian tạo tài khoản người dùng
  ngayTao: string;
}
