// TODO: Review Mantine conversion for this file
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Portal, Notification, Modal, Stack, Text, Group, Button } from '@mantine/core';
import {
  IconAlertTriangle,
  IconBell,
  IconAlertCircle,
  IconHistory,
  IconChartBar,
  IconUser,
  IconUserMinus,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

import BoCucChinh from '@/components/layout/BoCucChinh';
import BoLocLichSu from './BoLocLichSu';
import BangLichSu from './BangLichSu';
import ChiTietLichSuCard from './ChiTietLichSuCard';
import DrawerBieuMauLichSu from './DrawerBieuMauLichSu';
import { dichVuLichSuRaVao } from '@/services/lichSuRaVao.service';
import { xuatRaFileExcel } from '@/utils/excel';
import { LichSuRaVao } from '@/types/LichSuRaVao';
import type { LoaiTabHienThi } from './BangLichSu';

// -------------------------
// Kiểu Tab điều hướng chính
// -------------------------
type LoaiTabChinh = 'LICH_SU' | 'THONG_KE' | 'CO_MAT' | 'VANG_MAT' | 'CANH_BAO';

// -------------------------
// Dữ liệu biểu đồ theo thời gian (giả lập)
// -------------------------
const duLieuBieuDoThoiGian = [
  { ngay: '01/06', luotVao: 110, luotRa: 60 },
  { ngay: '02/06', luotVao: 270, luotRa: 370 },
  { ngay: '03/06', luotVao: 260, luotRa: 150 },
  { ngay: '04/06', luotVao: 200, luotRa: 150 },
  { ngay: '05/06', luotVao: 330, luotRa: 300 },
  { ngay: '06/06', luotVao: 250, luotRa: 260 },
  { ngay: '07/06', luotVao: 240, luotRa: 300 },
  { ngay: '08/06', luotVao: 445, luotRa: 345 },
  { ngay: '09/06', luotVao: 210, luotRa: 165 },
  { ngay: '10/06', luotVao: 40, luotRa: 20 },
];

// -------------------------
// Dữ liệu Top sinh viên ra vào nhiều nhất (giả lập)
// -------------------------
const duLieuTopSinhVien = [
  { mssv: 'MC122202', hoVaTen: 'Nguyễn Văn Minh', luotRaVao: 45 },
  { mssv: 'TC1255686', hoVaTen: 'Trần Thị Mai Anh', luotRaVao: 43 },
  { mssv: 'KKT012255', hoVaTen: 'Đào Anh Thư', luotRaVao: 40 },
  { mssv: 'TT2585524', hoVaTen: 'Lâm Thị Tố Như', luotRaVao: 39 },
  { mssv: 'TM565488', hoVaTen: 'Trịnh Thị Mỹ Ái', luotRaVao: 33 },
  { mssv: 'MC122202', hoVaTen: 'Nguyễn Văn Minh', luotRaVao: 45 },
  { mssv: 'TC1255686', hoVaTen: 'Trần Thị Mai Anh', luotRaVao: 43 },
  { mssv: 'KKT012255', hoVaTen: 'Đào Anh Thư', luotRaVao: 40 },
  { mssv: 'TT2585524', hoVaTen: 'Lâm Thị Tố Như', luotRaVao: 39 },
  { mssv: 'TM565488', hoVaTen: 'Trịnh Thị Mỹ Ái', luotRaVao: 33 },
];

// -------------------------
// Dữ liệu cảnh báo (giả lập)
// -------------------------
const duLieuCanhBao = [
  {
    id: 'CB001',
    icon: 'stop',
    tieuDe: 'Sinh viên bị cấm cố gắng vào KTX',
    moTa: 'Sinh viên Huỳnh Quốc Bảo (B2117788) đã bị cấm nhưng vẫn cố quét thẻ tại Cổng B-Cam01',
    thoiGian: '04/06/2026 08:22:45',
    mucDo: 'cao',
  },
  {
    id: 'CB002',
    icon: 'warning',
    tieuDe: 'Phát hiện người lạ tại cổng KTX B',
    moTa: 'Camera nhận diện người lạ cố gắng vào KTX B tại cổng chính',
    thoiGian: '04/06/2026 15:45:10',
    mucDo: 'trung',
  },
  {
    id: 'CB003',
    icon: 'warning',
    tieuDe: 'Sinh viên nợ phí vào KTX',
    moTa: 'Sinh viên Võ Thành Đạt (B2011122) có nợ phí 2.400.000đ vẫn vào KTX',
    thoiGian: '02/06/2026 18:45:00',
    mucDo: 'trung',
  },
  {
    id: 'CB004',
    icon: 'bell',
    tieuDe: 'Sinh viên vắng mặt trên 7 ngày',
    moTa: 'Có 3 sinh viên vắng mặt liên tục trên 7 ngày: B2009876, B2113344, B2011122',
    thoiGian: '04/06/2026 00:00:00',
    mucDo: 'thap',
  },
  {
    id: 'CB005',
    icon: 'stop',
    tieuDe: 'Người lạ vào KTX B buổi tối',
    moTa: 'Camera ghi nhận người lạ #3 vào KTX B lúc 16:40 chưa được xác minh danh tính',
    thoiGian: '01/06/2026 16:40:00',
    mucDo: 'cao',
  },
];

/**
 * Component Trang Lịch sử Ra/Vào với hệ thống tab đầy đủ.
 * Chức năng: Ghép nối tabs điều hướng Lịch sử, Thống kê, Có mặt, Vắng mặt, Cảnh báo.
 */
export default function HistoryPage() {
  // Trạng thái tab hiện đang active
  const [tabActive, datTabActive] = useState<LoaiTabChinh>('LICH_SU');

  // Trạng thái thông báo thành công/thất bại dạng toast
  const [thongBao, setThongBao] = useState<{ kieu: 'success' | 'error'; tinNhan: string } | null>(null);

  // Bản ghi lịch sử đang yêu cầu xác nhận phản hồi
  const [xacNhanPhanHoi, setXacNhanPhanHoi] = useState<LichSuRaVao | null>(null);

  const hienThongBao = (tinNhan: string, kieu: 'success' | 'error' = 'success') => {
    setThongBao({ tinNhan, kieu });
  };

  useEffect(() => {
    if (thongBao) {
      const timer = setTimeout(() => setThongBao(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [thongBao]);

  // Trạng thái loại thời gian cho biểu đồ thống kê
  const [loaiThoiGian, datLoaiThoiGian] = useState<'NGAY' | 'THANG' | 'NAM'>('NGAY');

  // Trạng thái hiển thị biểu đồ theo Thời gian hoặc theo KTX
  const [loaiBieuDo, datLoaiBieuDo] = useState<'THOI_GIAN' | 'KTX'>('KTX');

  // Khai báo state lưu danh sách và trạng thái tải dữ liệu
  const [danhSachLichSu, setDanhSachLichSu] = useState<LichSuRaVao[]>([]);
  const [dangTai, setDangTai] = useState<boolean>(false);
  const [dangTao, setDangTao] = useState<boolean>(false);

  // Bộ lọc lịch sử hiện hành
  const [boLoc, setBoLoc] = useState({
    tuNgay: '',
    denNgay: '',
    mssv: '',
    hoVaTen: '',
    maKtx: '',
    maPhong: '',
    loai: 'ALL' as 'IN' | 'OUT' | 'ALL',
    trangThai: 'ALL',
    loaiDoiTuong: 'ALL',
  });

  // Bản ghi lịch sử đang được lựa chọn để xem chi tiết
  const [lichSuDuocChon, datLichSuDuocChon] = useState<LichSuRaVao | null>(null);

  // Trạng thái mở/đóng của drawer biểu mẫu nhập liệu
  const [moDrawerBieuMau, datMoDrawerBieuMau] = useState<boolean>(false);

  // Hàm cập nhật thêm điều kiện lọc vào bộ lọc hiện tại
  const datBoLoc = (boLocMoi: Partial<typeof boLoc>) => {
    setBoLoc((prev) => ({ ...prev, ...boLocMoi }));
  };

  // Hàm thiết lập lại bộ lọc về các giá trị trống mặc định
  const datLaiBoLoc = () => {
    setBoLoc({
      tuNgay: '',
      denNgay: '',
      mssv: '',
      hoVaTen: '',
      maKtx: '',
      maPhong: '',
      loai: 'ALL',
      trangThai: 'ALL',
      loaiDoiTuong: 'ALL',
    });
  };

  // Hàm tải danh sách lịch sử ra vào
  const taiDuLieu = async () => {
    setDangTai(true);
    try {
      const duLieu = await dichVuLichSuRaVao.layDanhSachLichSu(boLoc);
      setDanhSachLichSu(duLieu);
    } catch {
      hienThongBao('Có lỗi xảy ra khi tải dữ liệu.', 'error');
    } finally {
      setDangTai(false);
    }
  };

  // Tải dữ liệu ban đầu khi component mount
  useEffect(() => {
    taiDuLieu();
  }, []);

  // Đặt mặc định bản ghi đầu tiên được chọn khi dữ liệu tải xong
  useEffect(() => {
    if (danhSachLichSu.length > 0 && !lichSuDuocChon) {
      datLichSuDuocChon(danhSachLichSu[0]);
    }
  }, [danhSachLichSu, lichSuDuocChon]);

  // Lọc dữ liệu theo từng tab
  const duLieuTheoTab = useMemo((): LichSuRaVao[] => {
    if (tabActive === 'CO_MAT') {
      return danhSachLichSu.filter((h) => h.trangThaiHienDien === 'CO_MAT');
    }
    if (tabActive === 'VANG_MAT') {
      return danhSachLichSu.filter((h) => h.trangThaiHienDien === 'VANG_MAT');
    }
    if (tabActive === 'CANH_BAO') {
      return danhSachLichSu.filter(
        (h) =>
          h.loaiDoiTuong === 'Người lạ' ||
          h.trangThaiSinhVien === 'NO_PHI' ||
          h.trangThaiSinhVien === 'BI_CAM'
      );
    }
    return danhSachLichSu;
  }, [danhSachLichSu, tabActive]);

  // Map tab chính sang loại tab hiển thị cho BangLichSu
  const loaiTabHienThi = useMemo((): LoaiTabHienThi => {
    if (tabActive === 'CO_MAT') return 'CO_MAT';
    if (tabActive === 'VANG_MAT') return 'VANG_MAT';
    if (tabActive === 'CANH_BAO') return 'CANH_BAO';
    return 'LICH_SU';
  }, [tabActive]);

  // Hàm xử lý tìm kiếm
  const xuLyTimKiem = () => {
    taiDuLieu();
    hienThongBao('Đã cập nhật danh sách', 'success');
  };

  // Hàm xử lý xuất Excel
  const xuLyXuatExcel = () => {
    const duLieuXuat = duLieuTheoTab.map((h, i) => ({
      STT: i + 1,
      'Thời gian': h.thoiGian,
      'Mã số sinh viên': h.mssv,
      'Họ và tên': h.hoVaTen,
      'Loại': h.loai === 'IN' ? 'Vào' : 'Ra',
      'Loại đối tượng': h.loaiDoiTuong || 'Sinh viên',
      'Khu KTX': h.tenKtx,
      'Phòng': h.tenPhong,
    }));
    xuatRaFileExcel(duLieuXuat, `Lich_Su_Ra_Vao_${new Date().toISOString().split('T')[0]}`, 'Lịch sử');
    hienThongBao('Xuất Excel thành công', 'success');
  };

  // Hàm xử lý xuất PDF
  const xuLyXuatPdf = () => {
    hienThongBao('Xuất PDF thành công', 'success');
  };

  // Hàm xử lý thêm dữ liệu mở drawer
  const xuLyThemDuLieu = () => {
    datMoDrawerBieuMau(true);
  };

  // Hàm xử lý đóng panel chi tiết
  const xuLyDongChiTiet = () => {
    datLichSuDuocChon(null);
  };

  // Hàm xử lý tạo bản ghi mới từ Drawer
  const xuLyTaoBanGhi = async (duLieu: Omit<LichSuRaVao, 'id' | 'thoiGian'>) => {
    setDangTao(true);
    try {
      await dichVuLichSuRaVao.taoBanGhiLichSu(duLieu);
      await taiDuLieu();
    } finally {
      setDangTao(false);
    }
  };

  // Hàm xử lý phản hồi sai thông tin
  const xuLyPhanHoiSaiThongTin = (lichSu: LichSuRaVao) => {
    setXacNhanPhanHoi(lichSu);
  };

  // Đếm số lượng phần tử động cho badge trên thanh Tabs
  const laySoLuongTab = (key: LoaiTabChinh) => {
    switch (key) {
      case 'LICH_SU':
        return danhSachLichSu.length;
      case 'CO_MAT':
        return danhSachLichSu.filter((h) => h.trangThaiHienDien === 'CO_MAT').length;
      case 'VANG_MAT':
        return danhSachLichSu.filter((h) => h.trangThaiHienDien === 'VANG_MAT').length;
      case 'CANH_BAO':
        return danhSachLichSu.filter(
          (h) =>
            h.loaiDoiTuong === 'Người lạ' ||
            h.trangThaiSinhVien === 'NO_PHI' ||
            h.trangThaiSinhVien === 'BI_CAM'
        ).length;
      default:
        return undefined;
    }
  };

  // Cấu hình danh sách tabs tích hợp icons
  const danhSachTabs = useMemo(() => [
    { key: 'LICH_SU' as const, nhan: 'Lịch sử', icon: <IconHistory size={16} /> },
    { key: 'THONG_KE' as const, nhan: 'Thống kê', icon: <IconChartBar size={16} /> },
    { key: 'CO_MAT' as const, nhan: 'Sinh viên đang có mặt', icon: <IconUser size={16} className="text-emerald-500" /> },
    { key: 'VANG_MAT' as const, nhan: 'Sinh viên vắng mặt', icon: <IconUserMinus size={16} className="text-rose-500" /> },
    { key: 'CANH_BAO' as const, nhan: 'Cảnh báo', icon: <IconAlertTriangle size={16} className="text-amber-500" /> },
  ], []);

  return (
    <BoCucChinh>
      {/* TIÊU ĐỀ TRANG */}
      <h2
        className="text-xl font-extrabold text-zinc-800 uppercase tracking-tight mb-4"
        style={{ fontFamily: 'var(--font-k2d)' }}
      >
        Lịch sử ra vào
      </h2>

      {/* THANH TABS ĐIỀU HƯỚNG DẠNG TAB BAR HIỆN ĐẠI */}
      <div className="mb-6 flex flex-wrap items-center gap-1 border-b border-zinc-200 pb-px">
        {danhSachTabs.map((tab) => {
          const laActive = tabActive === tab.key;
          const soLuong = laySoLuongTab(tab.key);
          return (
            <button
              key={tab.key}
              id={`tab-${tab.key.toLowerCase()}`}
              onClick={() => {
                datTabActive(tab.key);
                datLichSuDuocChon(null);
              }}
              className={`px-5 py-2.5 rounded-t-lg text-sm font-semibold transition-all duration-200 cursor-pointer border-b-2 border-solid border-t-0 border-l-0 border-r-0 bg-transparent flex items-center gap-2 relative -mb-px ${laActive
                  ? 'border-[#00afef] text-[#00afef] bg-[#00afef]/5 font-bold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                }`}
            >
              {tab.icon}
              <span>{tab.nhan}</span>
              {soLuong !== undefined && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors duration-200 ${laActive
                    ? 'bg-[#00afef] text-white'
                    : 'bg-zinc-200 text-zinc-600'
                  }`}>
                  {soLuong}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* BỘ LỌC - Hiển thị ở tất cả các tab để lọc linh hoạt */}
      <BoLocLichSu
        boLoc={boLoc}
        datBoLoc={datBoLoc}
        datLaiBoLoc={datLaiBoLoc}
        khiTimKiem={xuLyTimKiem}
        khiXuatExcel={xuLyXuatExcel}
        khiXuatPdf={xuLyXuatPdf}
        khiThemDuLieu={xuLyThemDuLieu}
      />

      {/* ================================ */}
      {/* NỘI DUNG THEO TỪNG TAB           */}
      {/* ================================ */}

      {/* TAB: LỊCH SỬ | CÓ MẶT | VẮNG MẶT | CẢNH BÁO */}
      {(tabActive === 'LICH_SU' || tabActive === 'CO_MAT' || tabActive === 'VANG_MAT' || tabActive === 'CANH_BAO') && (
        <div key={tabActive} className="flex flex-col lg:flex-row gap-4 items-stretch hieu-ung-chuyen-trang">
          {/* Cột trái: Bảng dữ liệu */}
          <div className="flex-1 min-w-0">
            <BangLichSu
              duLieu={duLieuTheoTab}
              dangTai={dangTai}
              loaiTab={loaiTabHienThi}
              lichSuDuocChon={lichSuDuocChon}
              datLichSuDuocChon={datLichSuDuocChon}
            />
          </div>

          {/* Cột phải: Thông tin chi tiết */}
          <div className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col">
            <ChiTietLichSuCard
              lichSuDuocChon={lichSuDuocChon}
              loaiTab={loaiTabHienThi}
              khiDong={xuLyDongChiTiet}
              khiPhanHoi={xuLyPhanHoiSaiThongTin}
            />
          </div>
        </div>
      )}

      {/* TAB: THỐNG KÊ */}
      {tabActive === 'THONG_KE' && (
        <div key={tabActive} className="flex flex-col lg:flex-row gap-4 hieu-ung-chuyen-trang">
          {/* BIỂU ĐỒ CỘT */}
          <div className="flex-1 bg-white rounded-xl border border-zinc-200 p-5 shadow-sm min-w-0">
            {/* Header biểu đồ: Hỗ trợ chuyển đổi giữa 2 chế độ hiển thị */}
            <div className="flex items-center gap-3 mb-4 border-b border-zinc-100 pb-3">
              <button
                onClick={() => datLoaiBieuDo('THOI_GIAN')}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-150 cursor-pointer ${loaiBieuDo === 'THOI_GIAN'
                    ? 'bg-[#00afef] text-white'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:text-[#00afef] hover:border-[#00afef]'
                  }`}
              >
                Lượt ra vào theo giờ
              </button>
              <button
                onClick={() => datLoaiBieuDo('KTX')}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-150 cursor-pointer ${loaiBieuDo === 'KTX'
                    ? 'bg-[#00afef] text-white'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:text-[#00afef] hover:border-[#00afef]'
                  }`}
              >
                Lượt ra vào theo KTX
              </button>
            </div>

            {/* Bộ chọn Ngày / Tháng / Năm - Chỉ hiển thị khi xem theo thời gian */}
            {loaiBieuDo === 'THOI_GIAN' && (
              <div className="flex items-center gap-2 mb-4">
                {(['NGAY', 'THANG', 'NAM'] as const).map((loai) => (
                  <button
                    key={loai}
                    onClick={() => datLoaiThoiGian(loai)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${loaiThoiGian === loai
                        ? 'bg-[#00afef] text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      }`}
                  >
                    {loai === 'NGAY' ? 'Ngày' : loai === 'THANG' ? 'Tháng' : 'Năm'}
                  </button>
                ))}

                {/* Legend cho biểu đồ thời gian */}
                <div className="ml-auto flex items-center gap-3 text-xs font-medium text-zinc-500">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" />
                    Lượt vào
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm bg-[#3b82f6] inline-block" />
                    Lượt ra
                  </span>
                </div>
              </div>
            )}

            {/* Vùng vẽ biểu đồ */}
            <div className="h-72 w-full mt-2">
              {loaiBieuDo === 'THOI_GIAN' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={duLieuBieuDoThoiGian} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="ngay" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                    <Tooltip formatter={(value) => [value, 'Lượt']} />
                    <Bar dataKey="luotVao" fill="#10b981" radius={[3, 3, 0, 0]} name="Lượt vào" />
                    <Bar dataKey="luotRa" fill="#3b82f6" radius={[3, 3, 0, 0]} name="Lượt ra" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      { name: 'KTX A', value: 1321 },
                      { name: 'KTX B', value: 1002 },
                      { name: 'KTX C', value: 1261 },
                      { name: 'KTX D', value: 780 },
                    ]}
                    margin={{ top: 10, right: 50, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f5f5f5" />
                    <XAxis type="number" domain={[0, 1400]} stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" stroke="#9ca3af" tick={{ fontSize: 11, fontWeight: 600 }} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(value) => [Number(value).toLocaleString('vi-VN'), 'Lượt ra vào']} />
                    <Bar dataKey="value" fill="#00afef" barSize={18} radius={[0, 4, 4, 0]}>
                      <LabelList
                        dataKey="value"
                        position="right"
                        formatter={(val: any) => (val !== null && val !== undefined ? Number(val).toLocaleString('vi-VN') : '')}
                        style={{ fontSize: 12, fontWeight: 700, fill: '#374151' }}
                        offset={8}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* BẢNG TOP SINH VIÊN */}
          <div className="w-full lg:w-80 xl:w-96 bg-white rounded-xl border border-zinc-200 p-5 shadow-sm shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-[#00afef]">
                Top sinh viên ra vào nhiều nhất
              </h4>
              <button className="text-xs text-[#00afef] font-semibold hover:underline">
                Xem tất cả
              </button>
            </div>

            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="pb-2 text-left font-semibold text-zinc-600 text-xs">MSSV</th>
                  <th className="pb-2 text-left font-semibold text-zinc-600 text-xs pl-3">Họ tên</th>
                  <th className="pb-2 text-right font-semibold text-zinc-600 text-xs">Lượt ra vào</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {duLieuTopSinhVien.map((sv, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50">
                    <td className="py-2 text-zinc-600 font-mono text-xs">{sv.mssv}</td>
                    <td className="py-2 text-zinc-800 font-medium text-xs pl-3">{sv.hoVaTen}</td>
                    <td className="py-2 text-right text-zinc-700 font-semibold text-xs">{sv.luotRaVao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DRAWER THÊM DỮ LIỆU */}
      <DrawerBieuMauLichSu
        open={moDrawerBieuMau}
        onClose={() => datMoDrawerBieuMau(false)}
        onSave={xuLyTaoBanGhi}
        dangTao={dangTao}
      />

      {/* THÔNG BÁO DẠNG TOAST */}
      {thongBao && (
        <Portal>
          <div className="fixed top-5 right-5 z-[9999] w-80 animate-fade-in shadow-lg">
            <Notification
              icon={thongBao.kieu === 'success' ? <IconCheck size={18} /> : <IconX size={18} />}
              color={thongBao.kieu === 'success' ? 'teal' : 'red'}
              title={thongBao.kieu === 'success' ? 'Thành công' : 'Thất bại'}
              onClose={() => setThongBao(null)}
            >
              {thongBao.tinNhan}
            </Notification>
          </div>
        </Portal>
      )}

      {/* MODAL XÁC NHẬN PHẢN HỒI */}
      <Modal
        opened={xacNhanPhanHoi !== null}
        onClose={() => setXacNhanPhanHoi(null)}
        title="Xác nhận phản hồi sai lệch thông tin"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Stack gap="md">
          <Text size="sm">
            Bạn muốn báo cáo sai lệch thông tin của{' '}
            <span className="font-semibold">{xacNhanPhanHoi?.hoVaTen}</span> ({xacNhanPhanHoi?.mssv})?
          </Text>
          <Group justify="flex-end" gap="xs">
            <Button variant="default" onClick={() => setXacNhanPhanHoi(null)}>
              Hủy bỏ
            </Button>
            <Button
              color="blue"
              onClick={() => {
                hienThongBao('Đã gửi báo cáo thành công!', 'success');
                setXacNhanPhanHoi(null);
              }}
            >
              Gửi phản hồi
            </Button>
          </Group>
        </Stack>
      </Modal>
    </BoCucChinh>
  );
}
