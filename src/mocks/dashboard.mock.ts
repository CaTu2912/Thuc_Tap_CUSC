import { KpiBangDieuKhien, DuLieuBieuDoRaVao, DuLieuBieuDoTronKtx, DuLieuBieuDoNguoiLa, DuLieuBangDieuKhien } from '../types/BangDieuKhien';
import { CanhBao } from '../types/CanhBao';
import { PhanHoi } from '../types/PhanHoi';
import { SinhVien } from '../types/SinhVien';
import { LichSuRaVao } from '../types/LichSuRaVao';

// Dữ liệu giả lập các chỉ số KPI thống kê nhanh tại dashboard khớp với ảnh chụp
export const duLieuGiaLapKpiBangDieuKhien: KpiBangDieuKhien = {
  tongSoSinhVien: 1256,
  sinhVienCoMat: 842,
  sinhVienVangMat: 414,
  sinhVienNoPhi: 23,
  sinhVienBiHanChe: 26,
  nguoiLaPhatHienHomNay: 12,
};

// Dữ liệu giả lập lượt ra vào theo khung giờ khớp với Bar Chart trong ảnh
export const duLieuGiaLapBieuDoRaVao: DuLieuBieuDoRaVao[] = [
  { thoiGian: '0h', luotVao: 10, luotRa: 5 },
  { thoiGian: '2h', luotVao: 50, luotRa: 30 },
  { thoiGian: '4h', luotVao: 220, luotRa: 200 },
  { thoiGian: '6h', luotVao: 370, luotRa: 300 },
  { thoiGian: '8h', luotVao: 200, luotRa: 160 },
  { thoiGian: '10h', luotVao: 90, luotRa: 80 },
  { thoiGian: '12h', luotVao: 140, luotRa: 120 },
  { thoiGian: '14h', luotVao: 290, luotRa: 450 },
  { thoiGian: '16h', luotVao: 490, luotRa: 340 },
  { thoiGian: '18h', luotVao: 220, luotRa: 150 },
  { thoiGian: '20h', luotVao: 120, luotRa: 100 },
  { thoiGian: '22h', luotVao: 70, luotRa: 50 },
];

// Dữ liệu giả lập thống kê sinh viên theo dãy nhà (Donut Chart) khớp với ảnh
export const duLieuGiaLapBieuDoTronKtx: DuLieuBieuDoTronKtx[] = [
  { ten: 'KTX A', giaTri: 250 },
  { ten: 'KTX B', giaTri: 180 },
  { ten: 'KTX C', giaTri: 320 },
  { ten: 'KTX D', giaTri: 100 },
];

// Dữ liệu giả lập số lượt phát hiện người lạ theo ngày
export const duLieuGiaLapBieuDoNguoiLa: DuLieuBieuDoNguoiLa[] = [
  { ngay: '07/06', soLuong: 1 },
  { ngay: '08/06', soLuong: 4 },
  { ngay: '09/06', soLuong: 2 },
  { ngay: '10/06', soLuong: 5 },
  { ngay: '11/06', soLuong: 3 },
  { ngay: '12/06', soLuong: 6 },
  { ngay: '13/06', soLuong: 3 },
];

// Dữ liệu giả lập danh sách cảnh báo an ninh khớp 100% với bảng trong ảnh
export const duLieuGiaLapCanhBao: CanhBao[] = [
  {
    id: '1',
    noiDung: 'Người lạ',
    thoiGian: '01/06 20:10',
    mucDoNghiemTrong: 'CRITICAL',
    daGiaiQuyet: false,
    loaiCanhBao: 'STRANGER',
    diaDiem: 'Cổng chính Khu A',
    doiTuong: 'Unknown',
    tenKtx: 'KTX A',
  },
  {
    id: '2',
    noiDung: 'Sinh viên bị cấm',
    thoiGian: '01/06 19:45',
    mucDoNghiemTrong: 'CRITICAL',
    daGiaiQuyet: false,
    loaiCanhBao: 'FORBIDDEN',
    diaDiem: 'Cổng phụ Khu B',
    doiTuong: 'B2120059',
    tenKtx: 'KTX B',
  },
  {
    id: '3',
    noiDung: 'Sinh viên nợ phí',
    thoiGian: '01/06 18:30',
    mucDoNghiemTrong: 'WARNING',
    daGiaiQuyet: false,
    loaiCanhBao: 'DEBT',
    diaDiem: 'Khu nhà C',
    doiTuong: 'B2012345',
    tenKtx: 'KTX C',
  },
  {
    id: '4',
    noiDung: 'Sinh viên vắng mặt lâu ngày',
    thoiGian: '01/06 17:50',
    mucDoNghiemTrong: 'INFO',
    daGiaiQuyet: false,
    loaiCanhBao: 'ABSENT',
    diaDiem: 'Khu nhà A',
    doiTuong: 'T2120129',
    tenKtx: 'KTX A',
  },
  {
    id: '5',
    noiDung: 'Người lạ',
    thoiGian: '01/06 16:20',
    mucDoNghiemTrong: 'CRITICAL',
    daGiaiQuyet: false,
    loaiCanhBao: 'STRANGER',
    diaDiem: 'Cổng chính Khu D',
    doiTuong: 'Unknown',
    tenKtx: 'KTX D',
  },
  {
    id: '6',
    noiDung: 'Sinh viên bị cấm',
    thoiGian: '01/06 15:10',
    mucDoNghiemTrong: 'CRITICAL',
    daGiaiQuyet: false,
    loaiCanhBao: 'FORBIDDEN',
    diaDiem: 'Khu nhà B',
    doiTuong: 'KT210269',
    tenKtx: 'KTX B',
  },
  {
    id: '7',
    noiDung: 'Sinh viên nợ phí',
    thoiGian: '01/06 14:05',
    mucDoNghiemTrong: 'WARNING',
    daGiaiQuyet: false,
    loaiCanhBao: 'DEBT',
    diaDiem: 'Khu nhà C',
    doiTuong: 'B2101550',
    tenKtx: 'KTX C',
  },
  {
    id: '8',
    noiDung: 'Sinh viên vắng mặt lâu ngày',
    thoiGian: '01/06 12:00',
    mucDoNghiemTrong: 'INFO',
    daGiaiQuyet: false,
    loaiCanhBao: 'ABSENT',
    diaDiem: 'Khu nhà A',
    doiTuong: 'M2011456',
    tenKtx: 'KTX A',
  },
];

// Dữ liệu giả lập danh sách phản hồi (sử dụng riêng tại dashboard)
export const duLieuGiaLapPhanHoiDashboard: PhanHoi[] = [
  {
    id: 'F001',
    mssv: 'B2003790',
    hoVaTen: 'Trần Thị Hoa',
    noiDung: 'Em quét thẻ ra ngoài lúc 18:24 nhưng hệ thống ghi nhận lúc 18:50 làm ảnh hưởng điểm rèn luyện.',
    thoiGian: '2026-06-13 19:30:00',
    trangThai: 'PENDING'
  },
];

// Dữ liệu giả lập sinh viên vắng mặt lâu ngày khớp với bảng trong ảnh
export const duLieuGiaLapSinhVienVangMatDashboard: SinhVien[] = [
  {
    mssv: 'B2012345',
    hoVaTen: 'Nguyễn Văn Minh',
    ngaySinh: '2002-05-12',
    gioiTinh: 'Nam',
    maKtx: 'KTXA',
    tenKtx: 'KTX A',
    maPhong: 'A101',
    tenPhong: 'Phòng 101',
    trangThai: 'ACTIVE',
    dangCoMat: false,
    soNgayVang: 15,
  },
  {
    mssv: 'T2120129',
    hoVaTen: 'Trần Thị Mai Anh',
    ngaySinh: '2003-08-20',
    gioiTinh: 'Nữ',
    maKtx: 'KTXA',
    tenKtx: 'KTX A',
    maPhong: 'A102',
    tenPhong: 'Phòng 102',
    trangThai: 'ACTIVE',
    dangCoMat: false,
    soNgayVang: 12,
  },
  {
    mssv: 'B2101550',
    hoVaTen: 'Lê Hoàng Nam',
    ngaySinh: '2003-02-14',
    gioiTinh: 'Nam',
    maKtx: 'KTXC',
    tenKtx: 'KTX C',
    maPhong: 'C302',
    tenPhong: 'Phòng 302',
    trangThai: 'ACTIVE',
    dangCoMat: false,
    soNgayVang: 10,
  },
  {
    mssv: 'M2011456',
    hoVaTen: 'Phạm Thị Kim Ngân',
    ngaySinh: '2002-11-30',
    gioiTinh: 'Nữ',
    maKtx: 'KTXD',
    tenKtx: 'KTX D',
    maPhong: 'D204',
    tenPhong: 'Phòng 204',
    trangThai: 'ACTIVE',
    dangCoMat: false,
    soNgayVang: 9,
  },
  {
    mssv: 'CT2123456',
    hoVaTen: 'Huỳnh Văn Lộc',
    ngaySinh: '2003-06-25',
    gioiTinh: 'Nam',
    maKtx: 'KTXB',
    tenKtx: 'KTX B',
    maPhong: 'B108',
    tenPhong: 'Phòng 108',
    trangThai: 'ACTIVE',
    dangCoMat: false,
    soNgayVang: 8,
  },
];

// Dữ liệu giả lập lịch sử ra vào mới nhất khớp với bảng trong ảnh
export const duLieuGiaLapLichSuMoiNhatDashboard: LichSuRaVao[] = [
  {
    id: 'H001',
    thoiGian: '01/06 20:15',
    mssv: 'B2112345',
    hoVaTen: 'Nguyễn Văn An',
    loai: 'IN',
    maKtx: 'KTXA',
    tenKtx: 'KTX A',
    maPhong: 'A101',
    tenPhong: 'Phòng 101',
    thietBi: 'Cổng chính',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
  },
  {
    id: 'H002',
    thoiGian: '01/06 20:10',
    mssv: 'B2111111',
    hoVaTen: 'Trần Thị Bích',
    loai: 'OUT',
    maKtx: 'KTXB',
    tenKtx: 'KTX B',
    maPhong: 'B102',
    tenPhong: 'Phòng 102',
    thietBi: 'Cổng phụ 1',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
  },
  {
    id: 'H003',
    thoiGian: '01/06 19:58',
    mssv: 'T2112222',
    hoVaTen: 'Lê Văn Cường',
    loai: 'IN',
    maKtx: 'KTXA',
    tenKtx: 'KTX A',
    maPhong: 'A103',
    tenPhong: 'Phòng 103',
    thietBi: 'Cổng chính',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    id: 'H004',
    thoiGian: '01/06 19:45',
    mssv: 'B2120059',
    hoVaTen: 'Phan Thị Duyên',
    loai: 'OUT',
    maKtx: 'KTXC',
    tenKtx: 'KTX C',
    maPhong: 'C205',
    tenPhong: 'Phòng 205',
    thietBi: 'Cổng phụ 2',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    id: 'H005',
    thoiGian: '01/06 19:30',
    mssv: 'M2113333',
    hoVaTen: 'Đỗ Hoàng Nam',
    loai: 'IN',
    maKtx: 'KTXD',
    tenKtx: 'KTX D',
    maPhong: 'D104',
    tenPhong: 'Phòng 104',
    thietBi: 'Cổng chính',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  },
];

// Tổng hợp dữ liệu trang chủ ký túc xá
export const duLieuGiaLapBangDieuKhien: DuLieuBangDieuKhien = {
  chiSoKpi: duLieuGiaLapKpiBangDieuKhien,
  lichSuRaVaoMoiNhat: duLieuGiaLapLichSuMoiNhatDashboard,
  canhBaoMoiNhat: duLieuGiaLapCanhBao,
  sinhVienVangMat: duLieuGiaLapSinhVienVangMatDashboard,
  sinhVienCoMat: [],
  phanHoiMoiNhat: duLieuGiaLapPhanHoiDashboard,
};
