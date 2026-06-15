/**
 * Các hằng số cấu hình hệ thống quản lý ký túc xá.
 * Chức năng: Lưu trữ bảng màu chủ đạo, các danh mục lựa chọn (dãy nhà, trạng thái, vai trò, giới tính).
 */

// Bảng màu chủ đạo của hệ thống
export const MAU_SAC = {
  primary: '#1f5ca9',       // Xanh dương CTU
  sidebarActive: '#00afef', // Xanh da trời
  success: '#52C41A',       // Màu thành công (xanh lá)
  warning: '#FAAD14',       // Màu cảnh báo (vàng)
  danger: '#FF4D4F',        // Màu nguy hiểm (đỏ)
  background: '#F5F7FA',    // Màu nền trang
  card: '#FFFFFF',          // Màu nền thẻ card
};

// Các tùy chọn lựa chọn khu nhà ký túc xá
export const LUA_CHON_KTX = [
  { value: 'KTXA', label: 'Khu A' },
  { value: 'KTXB', label: 'Khu B' },
  { value: 'KTXC', label: 'Khu C' },
  { value: 'KTXD', label: 'Khu D' },
];

// Các tùy chọn lựa chọn trạng thái hoạt động sinh viên
export const LUA_CHON_TRANG_THAI = [
  { value: 'ACTIVE', label: 'Đang hoạt động' },
  { value: 'INACTIVE', label: 'Tạm khóa' },
  { value: 'BANNED', label: 'Bị cấm' },
];

// Các tùy chọn vai trò tài khoản quản trị
export const LUA_CHON_VAI_TRO = [
  { value: 'ADMIN', label: 'Quản trị hệ thống' },
  { value: 'MANAGER', label: 'Điều phối viên' },
  { value: 'OPERATOR', label: 'Trực ban' },
];

// Các tùy chọn giới tính
export const LUA_CHON_GIOI_TINH = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' },
];

// Xuất các đường dẫn định tuyến của hệ thống
export * from './duongDan';
