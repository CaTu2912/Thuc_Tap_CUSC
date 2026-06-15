'use client';

import React from 'react';
import BoCucChinh from '@/components/layout/BoCucChinh';
import CacTheDashboard from '@/components/dashboard/CacTheDashboard';
import BieuDoRaVao from '@/components/dashboard/BieuDoRaVao';
import BieuDoTronKtx from '@/components/dashboard/BieuDoTronKtx';
import BangLichSuMoiNhat from '@/components/dashboard/BangLichSuMoiNhat';
import BangCanhBaoMoiNhat from '@/components/dashboard/BangCanhBaoMoiNhat';
import BangSinhVienVangMat from '@/components/dashboard/BangSinhVienVangMat';
import { dungBangDieuKhien } from '@/hooks/dungBangDieuKhien';
import KhungTaiDuLieu from '@/components/common/KhungTaiDuLieu';
import { Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { DUONG_DAN } from '@/constants';

/**
 * Component Trang Bảng điều khiển chính (DashboardPage).
 * Chức năng: Hiển thị các số liệu thống kê nhanh (KPI), các biểu đồ phân tích lượt đi lại, người lạ đột nhập và danh sách nhật ký, phản hồi mới nhất.
 */
export default function DashboardPage() {
  // Trích xuất các dữ liệu và trạng thái tải từ hook điều khiển trang chủ
  const {
    duLieuBangDieuKhien,
    duLieuBieuDoRaVao,
    duLieuBieuDoTronKtx,
    dangTai,
  } = dungBangDieuKhien();

  // Nếu dữ liệu đang tải, hiển thị bộ khung tải dữ liệu giả lập (Loading Skeleton)
  if (dangTai) {
    return (
      <BoCucChinh>
        <div className="mb-4">
          <span className="text-zinc-800 font-extrabold text-base tracking-tight uppercase font-sans">Tổng quan nhanh</span>
        </div>
        <KhungTaiDuLieu loai="card" soLuongThe={6} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <KhungTaiDuLieu loai="chart" />
          <KhungTaiDuLieu loai="chart" />
          <KhungTaiDuLieu loai="chart" />
        </div>
      </BoCucChinh>
    );
  }

  return (
    <BoCucChinh>
      <div className="mb-4 flex items-center justify-between">
        <span 
          className="text-zinc-800 font-black text-lg tracking-tight uppercase"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          Tổng quan nhanh
        </span>
      </div>

      {/* KPI Cards hiển thị thống kê nhanh số liệu */}
      <CacTheDashboard chiSoKpi={duLieuBangDieuKhien?.chiSoKpi} />

      {/* Hàng 2: Biểu đồ cột ra vào (2/3) & Bảng Cảnh báo mới nhất (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <BieuDoRaVao duLieu={duLieuBieuDoRaVao} />
        </div>
        <div className="lg:col-span-1">
          <BangCanhBaoMoiNhat duLieu={duLieuBangDieuKhien?.canhBaoMoiNhat || []} />
        </div>
      </div>

      {/* Hàng 3: Biểu đồ tròn KTX (1/3) & Bảng sinh viên vắng mặt lâu ngày (2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <BieuDoTronKtx duLieu={duLieuBieuDoTronKtx} />
        </div>
        <div className="lg:col-span-2">
          <BangSinhVienVangMat duLieu={duLieuBangDieuKhien?.sinhVienVangMat || []} />
        </div>
      </div>

      {/* Hàng 4: Bảng lịch sử ra vào mới nhất (2/4), Thẻ sinh viên đang có mặt (1/4), Thẻ phản hồi MyCTU (1/4) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-2">
          <BangLichSuMoiNhat duLieu={duLieuBangDieuKhien?.lichSuRaVaoMoiNhat || []} />
        </div>
        
        {/* Thẻ hiển thị số lượng sinh viên đang có mặt trong KTX */}
        <div className="lg:col-span-1">
          <Card 
            variant="borderless" 
            className="shadow-xs border border-zinc-100 rounded-xl overflow-hidden flex flex-col justify-between h-full font-sans"
            styles={{ body: { padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } }}
          >
            <div className="border-b border-zinc-100 pb-3 bg-zinc-50/10 w-full text-left">
              <span className="font-bold text-xs text-[#1f5ca9] uppercase tracking-wide">Sinh viên đang có mặt</span>
            </div>
            <div className="flex flex-col items-center justify-center my-6 flex-1">
              <span 
                className="text-5xl font-black text-[#52C41A] tracking-tight leading-none"
                style={{ fontFamily: 'var(--font-k2d)' }}
              >
                {duLieuBangDieuKhien?.chiSoKpi?.sinhVienCoMat || 842}
              </span>
              <span className="text-zinc-500 text-xs font-semibold mt-2">sinh viên</span>
            </div>
            <a 
              href={`${DUONG_DAN.CATEGORIES.STUDENTS}?loc=coMat`} 
              className="flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500 font-bold hover:text-[#1f5ca9] w-full"
            >
              <span>Xem danh sách</span>
              <RightOutlined className="text-[10px]" />
            </a>
          </Card>
        </div>

        {/* Thẻ hiển thị số lượng phản hồi sai lịch sử từ MyCTU */}
        <div className="lg:col-span-1">
          <Card 
            variant="borderless" 
            className="shadow-xs border border-zinc-100 rounded-xl overflow-hidden flex flex-col justify-between h-full font-sans"
            styles={{ body: { padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } }}
          >
            <div className="border-b border-zinc-100 pb-3 bg-zinc-50/10 w-full text-left">
              <span className="font-bold text-xs text-[#1f5ca9] uppercase tracking-wide">Phản hồi sai lịch sử từ MyCTU</span>
            </div>
            <div className="flex flex-col items-center justify-center my-6 flex-1">
              <span 
                className="text-5xl font-black text-[#805AD5] tracking-tight leading-none"
                style={{ fontFamily: 'var(--font-k2d)' }}
              >
                {duLieuBangDieuKhien?.chiSoKpi?.nguoiLaPhatHienHomNay || 12}
              </span>
              <span className="text-zinc-500 text-xs font-semibold mt-2">yêu cầu chờ xử lý</span>
            </div>
            <a 
              href={DUONG_DAN.FEEDBACK} 
              className="flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500 font-bold hover:text-[#1f5ca9] w-full"
            >
              <span>Xem danh sách</span>
              <RightOutlined className="text-[10px]" />
            </a>
          </Card>
        </div>
      </div>
    </BoCucChinh>
  );
}

