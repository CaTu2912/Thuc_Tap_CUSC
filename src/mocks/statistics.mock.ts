import {
  ThongKeRaVaoTheoThoiGian,
  ThongKeRaVaoTheoKtx,
  SinhVienRaVaoNhieuNhat,
  SinhVienVangMatLauNgay,
  ThongKePhatHienNguoiLa,
  ThongKeSinhVienBiHanChe
} from '../types/ThongKe';

// Dữ liệu giả lập thống kê lượt ra vào theo ngày trong tuần
export const duLieuGiaLapThongKeTheoNgay: ThongKeRaVaoTheoThoiGian[] = [
  { nhan: 'Thứ 2', luotVao: 420, luotRa: 400 },
  { nhan: 'Thứ 3', luotVao: 480, luotRa: 490 },
  { nhan: 'Thứ 4', luotVao: 510, luotRa: 500 },
  { nhan: 'Thứ 5', luotVao: 460, luotRa: 470 },
  { nhan: 'Thứ 6', luotVao: 650, luotRa: 720 },
  { nhan: 'Thứ 7', luotVao: 800, luotRa: 850 },
  { nhan: 'Chủ Nhật', luotVao: 750, luotRa: 600 },
];

// Dữ liệu giả lập thống kê lượt ra vào theo các tháng trong năm
export const duLieuGiaLapThongKeTheoThang: ThongKeRaVaoTheoThoiGian[] = [
  { nhan: 'Tháng 1', luotVao: 12000, luotRa: 11800 },
  { nhan: 'Tháng 2', luotVao: 9500, luotRa: 9300 },
  { nhan: 'Tháng 3', luotVao: 14000, luotRa: 13900 },
  { nhan: 'Tháng 4', luotVao: 13500, luotRa: 13600 },
  { nhan: 'Tháng 5', luotVao: 15000, luotRa: 15200 },
  { nhan: 'Tháng 6', luotVao: 8000, luotRa: 8200 }, // Đến thời điểm hiện tại
];

// Dữ liệu giả lập thống kê lượt ra vào theo năm
export const duLieuGiaLapThongKeTheoNam: ThongKeRaVaoTheoThoiGian[] = [
  { nhan: '2023', luotVao: 145000, luotRa: 143000 },
  { nhan: '2024', luotVao: 168000, luotRa: 167000 },
  { nhan: '2025', luotVao: 180000, luotRa: 179500 },
];

// Dữ liệu giả lập thống kê lượt ra vào theo dãy nhà ký túc xá
export const duLieuGiaLapThongKeTheoKtx: ThongKeRaVaoTheoKtx[] = [
  { tenKtx: 'Khu A', luotVao: 4500, luotRa: 4400, tongLuotRaVao: 8900 },
  { tenKtx: 'Khu B', luotVao: 3800, luotRa: 3750, tongLuotRaVao: 7550 },
  { tenKtx: 'Khu C', luotVao: 5200, luotRa: 5100, tongLuotRaVao: 10300 },
  { tenKtx: 'Khu D', luotVao: 2900, luotRa: 2950, tongLuotRaVao: 5850 },
];

// Dữ liệu giả lập top sinh viên có số lượt ra vào nhiều nhất
export const duLieuGiaLapSinhVienRaVaoNhieuNhat: SinhVienRaVaoNhieuNhat[] = [
  { mssv: 'B2003789', hoVaTen: 'Nguyễn Văn Nam', tenKtx: 'Khu A', tenPhong: 'Phòng A101', soLuotRaVao: 42 },
  { mssv: 'B2104567', hoVaTen: 'Hoàng Ngọc Ánh', tenKtx: 'Khu C', tenPhong: 'Phòng C101', soLuotRaVao: 38 },
  { mssv: 'B2003791', hoVaTen: 'Lê Minh Hải', tenKtx: 'Khu B', tenPhong: 'Phòng B101', soLuotRaVao: 35 },
  { mssv: 'B2104568', hoVaTen: 'Vũ Quốc Khánh', tenKtx: 'Khu D', tenPhong: 'Phòng D101', soLuotRaVao: 30 },
  { mssv: 'B2003790', hoVaTen: 'Trần Thị Hoa', tenKtx: 'Khu A', tenPhong: 'Phòng A102', soLuotRaVao: 28 },
];

// Dữ liệu giả lập sinh viên vắng mặt dài ngày khỏi ký túc xá
export const duLieuGiaLapSinhVienVangMatLauNgay: SinhVienVangMatLauNgay[] = [
  { mssv: 'B2003792', hoVaTen: 'Phạm Thanh Bình', tenKtx: 'Khu A', tenPhong: 'Phòng A101', thoiGianRaVaoCuoi: '2026-06-10 11:30:20', soNgayVangMat: 3 },
  { mssv: 'B2104569', hoVaTen: 'Đặng Thùy Linh', tenKtx: 'Khu B', tenPhong: 'Phòng B102', thoiGianRaVaoCuoi: '2026-06-08 15:40:00', soNgayVangMat: 5 },
  { mssv: 'B2003810', hoVaTen: 'Nguyễn Văn Cường', tenKtx: 'Khu C', tenPhong: 'Phòng C102', thoiGianRaVaoCuoi: '2026-05-30 08:20:00', soNgayVangMat: 14 },
];

// Dữ liệu giả lập thống kê số lần camera phát hiện người lạ
export const duLieuGiaLapThongKeNguoiLa: ThongKePhatHienNguoiLa[] = [
  {
    ngay: '2026-06-13',
    soLuong: 3,
    cacViTri: [{ ten: 'Cửa sau Khu B', soLuong: 2 }, { ten: 'Cổng chính Khu A', soLuong: 1 }]
  },
  {
    ngay: '2026-06-12',
    soLuong: 6,
    cacViTri: [{ ten: 'Cửa sau Khu B', soLuong: 3 }, { ten: 'Hành lang Khu C', soLuong: 2 }, { ten: 'Cổng chính Khu D', soLuong: 1 }]
  },
];

// Dữ liệu giả lập thống kê sinh viên đang chịu kỷ luật hạn chế ra vào
export const duLieuGiaLapThongKeSinhVienBiHanChe: ThongKeSinhVienBiHanChe[] = [
  {
    mssv: 'B2003792',
    hoVaTen: 'Phạm Thanh Bình',
    lyDo: 'Vi phạm quy định giờ giới nghiêm nhiều lần (về muộn sau 23h)',
    ngayHanChe: '2026-06-11',
    ngayHetHan: '2026-06-25',
    trangThai: 'ACTIVE'
  },
  {
    mssv: 'B2003999',
    hoVaTen: 'Lê Văn Quyết',
    lyDo: 'Gây mất trật tự, đánh nhau trong khu vực ký túc xá',
    ngayHanChe: '2026-05-01',
    ngayHetHan: '2026-06-01',
    trangThai: 'EXPIRED'
  }
];
