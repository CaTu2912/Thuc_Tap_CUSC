/**
 * Giao diện đại diện cho phản hồi từ sinh viên gửi lên ban quản lý.
 * Chức năng: Lưu trữ thông tin phản hồi của sinh viên.
 */
export interface PhanHoi {
  // Mã định danh duy nhất của phản hồi
  id: string;

  // Mã số sinh viên gửi phản hồi
  mssv: string;

  // Họ và tên đầy đủ của sinh viên gửi phản hồi
  hoVaTen: string;

  // Nội dung chi tiết phản hồi của sinh viên
  noiDung: string;

  // Thời gian gửi phản hồi
  thoiGian: string;

  // Trạng thái xử lý phản hồi (Đang chờ xử lý, Đã giải quyết)
  trangThai: 'PENDING' | 'RESOLVED';

  // Người thực hiện giải quyết phản hồi (tùy chọn)
  nguoiGiaiQuyet?: string;

  // Thời gian phản hồi được giải quyết xong (tùy chọn)
  thoiGianGiaiQuyet?: string;
}
