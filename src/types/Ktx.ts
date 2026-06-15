/**
 * Giao diện đại diện cho một khu nhà/dãy nhà ký túc xá.
 * Chức năng: Định nghĩa cấu trúc dữ liệu của khu nhà ký túc xá.
 */
export interface Ktx {
  // Mã định danh của dãy nhà
  id: string;

  // Tên của dãy nhà (Ví dụ: Nhà A, Nhà B)
  tenKtx: string;

  // Tổng số lượng phòng thuộc dãy nhà này
  soPhong: number;

  // Sức chứa tối đa (tổng số chỗ ở) của cả dãy nhà
  sucChua: number;

  // Trạng thái hoạt động của dãy nhà (Đang hoạt động, Tạm ngưng)
  trangThai: 'ACTIVE' | 'INACTIVE';
}
