/**
 * Giao diện đại diện cho một cảnh báo trong hệ thống.
 * Chức năng: Định nghĩa cấu trúc dữ liệu cho các cảnh báo an ninh hoặc thiết bị.
 */
export interface CanhBao {
  // Mã định danh duy nhất của cảnh báo
  id: string;

  // Nội dung chi tiết của thông tin cảnh báo
  noiDung: string;

  // Mốc thời gian khi cảnh báo được kích hoạt
  thoiGian: string;

  // Mức độ nghiêm trọng của cảnh báo
  mucDoNghiemTrong: 'INFO' | 'WARNING' | 'CRITICAL';

  // Xác định cảnh báo đã được xử lý hay chưa
  daGiaiQuyet: boolean;

  // Phân loại cảnh báo (Người lạ, Sinh viên bị cấm, Thiết bị ngoại tuyến, Nợ phí, Vắng mặt)
  loaiCanhBao: 'STRANGER' | 'FORBIDDEN' | 'DEVICE_OFFLINE' | 'DEBT' | 'ABSENT' | string;

  // Vị trí hoặc địa điểm phát sinh cảnh báo
  diaDiem: string;

  // Đường dẫn ảnh chụp từ camera khi phát hiện sự cố (nếu có)
  duongDanAnh?: string;

  // Đối tượng liên quan đến cảnh báo (ví dụ: mã số sinh viên hoặc 'Unknown')
  doiTuong?: string;

  // Tên khu ký túc xá xảy ra cảnh báo
  tenKtx?: string;
}
