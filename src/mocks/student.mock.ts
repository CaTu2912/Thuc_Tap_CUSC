import { SinhVien } from '../types/SinhVien';
import { Ktx } from '../types/Ktx';
import { Phong } from '../types/Phong';
import { NguoiDung } from '../types/NguoiDung';

// Dữ liệu giả lập danh sách các khu nhà ký túc xá
export const duLieuGiaLapKtx: Ktx[] = [
  { id: 'KTXA', tenKtx: 'Khu A', soPhong: 20, sucChua: 160, trangThai: 'ACTIVE' },
  { id: 'KTXB', tenKtx: 'Khu B', soPhong: 25, sucChua: 200, trangThai: 'ACTIVE' },
  { id: 'KTXC', tenKtx: 'Khu C', soPhong: 30, sucChua: 240, trangThai: 'ACTIVE' },
  { id: 'KTXD', tenKtx: 'Khu D', soPhong: 15, sucChua: 120, trangThai: 'ACTIVE' },
];

// Dữ liệu giả lập danh sách các phòng ở trong ký túc xá
export const duLieuGiaLapPhong: Phong[] = [
  { id: 'A101', tenPhong: 'Phòng A101', maKtx: 'KTXA', tenKtx: 'Khu A', tang: 1, sucChua: 8, soNguoiO: 6, trangThai: 'AVAILABLE' },
  { id: 'A102', tenPhong: 'Phòng A102', maKtx: 'KTXA', tenKtx: 'Khu A', tang: 1, sucChua: 8, soNguoiO: 8, trangThai: 'FULL' },
  { id: 'A201', tenPhong: 'Phòng A201', maKtx: 'KTXA', tenKtx: 'Khu A', tang: 2, sucChua: 8, soNguoiO: 4, trangThai: 'AVAILABLE' },
  { id: 'B101', tenPhong: 'Phòng B101', maKtx: 'KTXB', tenKtx: 'Khu B', tang: 1, sucChua: 8, soNguoiO: 7, trangThai: 'AVAILABLE' },
  { id: 'B102', tenPhong: 'Phòng B102', maKtx: 'KTXB', tenKtx: 'Khu B', tang: 1, sucChua: 8, soNguoiO: 5, trangThai: 'AVAILABLE' },
  { id: 'C101', tenPhong: 'Phòng C101', maKtx: 'KTXC', tenKtx: 'Khu C', tang: 1, sucChua: 8, soNguoiO: 8, trangThai: 'FULL' },
  { id: 'C102', tenPhong: 'Phòng C102', maKtx: 'KTXC', tenKtx: 'Khu C', tang: 1, sucChua: 8, soNguoiO: 0, trangThai: 'MAINTENANCE' },
  { id: 'D101', tenPhong: 'Phòng D101', maKtx: 'KTXD', tenKtx: 'Khu D', tang: 1, sucChua: 8, soNguoiO: 6, trangThai: 'AVAILABLE' },
];

// Dữ liệu giả lập danh sách sinh viên nội trú
export const duLieuGiaLapSinhVien: SinhVien[] = [
  {
    mssv: 'B2003789',
    hoVaTen: 'Nguyễn Văn Nam',
    ngaySinh: '2002-04-12',
    gioiTinh: 'Nam',
    maKtx: 'KTXA',
    tenKtx: 'Khu A',
    maPhong: 'A101',
    tenPhong: 'Phòng A101',
    trangThai: 'ACTIVE',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    noPhi: 0,
    dangCoMat: true,
    thoiGianRaVaoCuoi: '2026-06-13 22:15:30'
  },
  {
    mssv: 'B2003790',
    hoVaTen: 'Trần Thị Hoa',
    ngaySinh: '2002-08-22',
    gioiTinh: 'Nữ',
    maKtx: 'KTXA',
    tenKtx: 'Khu A',
    maPhong: 'A102',
    tenPhong: 'Phòng A102',
    trangThai: 'ACTIVE',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    noPhi: 1200000,
    dangCoMat: false,
    thoiGianRaVaoCuoi: '2026-06-13 18:24:00'
  },
  {
    mssv: 'B2003791',
    hoVaTen: 'Lê Minh Hải',
    ngaySinh: '2002-11-05',
    gioiTinh: 'Nam',
    maKtx: 'KTXB',
    tenKtx: 'Khu B',
    maPhong: 'B101',
    tenPhong: 'Phòng B101',
    trangThai: 'ACTIVE',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    noPhi: 0,
    dangCoMat: true,
    thoiGianRaVaoCuoi: '2026-06-13 21:45:00'
  },
  {
    mssv: 'B2003792',
    hoVaTen: 'Phạm Thanh Bình',
    ngaySinh: '2002-01-30',
    gioiTinh: 'Nam',
    maKtx: 'KTXA',
    tenKtx: 'Khu A',
    maPhong: 'A101',
    tenPhong: 'Phòng A101',
    trangThai: 'BANNED',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    noPhi: 500000,
    dangCoMat: false,
    thoiGianRaVaoCuoi: '2026-06-10 11:30:20'
  },
  {
    mssv: 'B2104567',
    hoVaTen: 'Hoàng Ngọc Ánh',
    ngaySinh: '2003-05-15',
    gioiTinh: 'Nữ',
    maKtx: 'KTXC',
    tenKtx: 'Khu C',
    maPhong: 'C101',
    tenPhong: 'Phòng C101',
    trangThai: 'ACTIVE',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    noPhi: 0,
    dangCoMat: true,
    thoiGianRaVaoCuoi: '2026-06-13 22:30:00'
  },
  {
    mssv: 'B2104568',
    hoVaTen: 'Vũ Quốc Khánh',
    ngaySinh: '2003-10-09',
    gioiTinh: 'Nam',
    maKtx: 'KTXD',
    tenKtx: 'Khu D',
    maPhong: 'D101',
    tenPhong: 'Phòng D101',
    trangThai: 'ACTIVE',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    noPhi: 0,
    dangCoMat: false,
    thoiGianRaVaoCuoi: '2026-06-13 12:05:00'
  },
  {
    mssv: 'B2104569',
    hoVaTen: 'Đặng Thùy Linh',
    ngaySinh: '2003-12-25',
    gioiTinh: 'Nữ',
    maKtx: 'KTXB',
    tenKtx: 'Khu B',
    maPhong: 'B102',
    tenPhong: 'Phòng B102',
    trangThai: 'INACTIVE',
    duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    noPhi: 1500000,
    dangCoMat: false,
    thoiGianRaVaoCuoi: '2026-06-11 15:40:00'
  }
];

// Dữ liệu giả lập danh sách người dùng quản trị hệ thống
export const duLieuGiaLapNguoiDung: NguoiDung[] = [
  {
    id: 'U001',
    tenDangNhap: 'admin',
    hoVaTen: 'Nguyễn Văn Trỗi',
    email: 'troib2003789@student.ctu.edu.vn',
    vaiTro: 'ADMIN',
    trangThai: 'ACTIVE',
    ngayTao: '2025-01-15'
  },
  {
    id: 'U002',
    tenDangNhap: 'manager_a',
    hoVaTen: 'Lê Văn Tám',
    email: 'tammanager@ctu.edu.vn',
    vaiTro: 'MANAGER',
    trangThai: 'ACTIVE',
    ngayTao: '2025-02-10'
  },
  {
    id: 'U003',
    tenDangNhap: 'operator_1',
    hoVaTen: 'Phạm Thị Sáu',
    email: 'sauoperator@ctu.edu.vn',
    vaiTro: 'OPERATOR',
    trangThai: 'ACTIVE',
    ngayTao: '2025-03-01'
  },
  {
    id: 'U004',
    tenDangNhap: 'operator_2',
    hoVaTen: 'Trần Quốc Toản',
    email: 'toanoperator@ctu.edu.vn',
    vaiTro: 'OPERATOR',
    trangThai: 'INACTIVE',
    ngayTao: '2025-03-05'
  },
  {
    id: 'U005',
    tenDangNhap: 'test',
    hoVaTen: 'Người dùng Thử nghiệm',
    email: 'test@ctu.edu.vn',
    vaiTro: 'MANAGER',
    trangThai: 'ACTIVE',
    ngayTao: '2026-06-14'
  }
];
