/**
 * Giao diện thống kê lượt ra vào theo thời gian.
 */
export interface ThongKeRaVaoTheoThoiGian {
  // Nhãn thời gian (Ngày, Tháng, Năm)
  nhan: string;

  // Số lượt quét thẻ đi vào
  luotVao: number;

  // Số lượt quét thẻ đi ra
  luotRa: number;
}

/**
 * Giao diện thống kê lượt ra vào theo từng dãy nhà ký túc xá.
 */
export interface ThongKeRaVaoTheoKtx {
  // Tên dãy nhà ký túc xá
  tenKtx: string;

  // Số lượt đi vào của dãy nhà
  luotVao: number;

  // Số lượt đi ra của dãy nhà
  luotRa: number;

  // Tổng số lượt ra vào
  tongLuotRaVao: number;
}

/**
 * Giao diện thông tin sinh viên có tần suất ra vào ký túc xá nhiều nhất.
 */
export interface SinhVienRaVaoNhieuNhat {
  // Mã số sinh viên
  mssv: string;

  // Họ và tên sinh viên
  hoVaTen: string;

  // Tên dãy nhà ký túc xá
  tenKtx: string;

  // Tên phòng ở
  tenPhong: string;

  // Số lượt ra vào đã thực hiện
  soLuotRaVao: number;
}

/**
 * Giao diện thống kê sinh viên vắng mặt dài ngày khỏi ký túc xá.
 */
export interface SinhVienVangMatLauNgay {
  // Mã số sinh viên
  mssv: string;

  // Họ và tên sinh viên
  hoVaTen: string;

  // Tên dãy nhà ký túc xá
  tenKtx: string;

  // Tên phòng ở
  tenPhong: string;

  // Thời gian lần cuối quét thẻ ra vào
  thoiGianRaVaoCuoi: string;

  // Số ngày đã vắng mặt liên tục
  soNgayVangMat: number;
}

/**
 * Giao diện dữ liệu phát hiện người lạ đột nhập.
 */
export interface ThongKePhatHienNguoiLa {
  // Ngày phát hiện người lạ
  ngay: string;

  // Số lượng người lạ được phát hiện trong ngày
  soLuong: number;

  // Chi tiết số lượng người lạ tại các vị trí camera
  cacViTri: {
    // Tên camera / vị trí lắp camera
    ten: string;

    // Số lượt người lạ camera ghi nhận
    soLuong: number;
  }[];
}

/**
 * Giao diện thống kê danh sách sinh viên bị hạn chế ra vào.
 */
export interface ThongKeSinhVienBiHanChe {
  // Mã số sinh viên
  mssv: string;

  // Họ và tên sinh viên
  hoVaTen: string;

  // Lý do bị hạn chế ra vào (Ví dụ: Vi phạm nội quy ktx)
  lyDo: string;

  // Ngày bắt đầu áp dụng hạn chế
  ngayHanChe: string;

  // Ngày hết hạn hạn chế
  ngayHetHan: string;

  // Trạng thái của lệnh hạn chế (Còn hiệu lực, Hết hiệu lực)
  trangThai: 'ACTIVE' | 'EXPIRED';
}
