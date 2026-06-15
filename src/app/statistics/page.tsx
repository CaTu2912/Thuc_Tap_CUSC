'use client';

import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import BoCucChinh from '@/components/layout/BoCucChinh';
import TieuDeTrang from '@/components/common/TieuDeTrang';
import BieuDoKhungGio from '@/components/statistics/BieuDoKhungGio';
import BangChiTietRaVao from '@/components/statistics/BangChiTietRaVao';
import BangThongKeChung from '@/components/statistics/BangThongKeChung';
import { cotBangSinhVienRaVaoNhieu } from '@/components/statistics/CotBangSinhVienRaVaoNhieu';
import { cotBangSinhVienVangMat } from '@/components/statistics/CotBangSinhVienVangMat';
import { cotBangNguoiLa } from '@/components/statistics/CotBangNguoiLa';
import { cotBangSinhVienBiHanChe } from '@/components/statistics/CotBangSinhVienBiHanChe';
import { dungThongKe } from '@/hooks/dungThongKe';
import { dungKhoThongKe, KieuKhungThoiGian } from '@/store/khoThongKe';

// Các tiêu đề biểu đồ tương ứng với từng khung thời gian lọc
const TIEU_DE_BIEU_DO = {
  DAY: 'Thống kê theo ngày',
  MONTH: 'Thống kê theo tháng',
  YEAR: 'Thống kê theo năm',
  DORMITORY: 'Thống kê theo khu KTX',
} as const;

/**
 * Component Trang Báo cáo Thống kê (StatisticsPage).
 * Chức năng: Hiển thị các bảng biểu thống kê chi tiết lượt ra vào KTX theo khung giờ/khu nhà, top sinh viên, sinh viên vắng mặt, người lạ và sinh viên bị cấm.
 */
export default function StatisticsPage() {
  // Trích xuất khung thời gian đang chọn và phương thức thiết lập từ store thống kê
  const { khungThoiGian, datKhungThoiGian } = dungKhoThongKe();

  // Gọi hook quản lý dữ liệu truy vấn thống kê báo cáo
  const {
    thongKeKhungThoiGian,
    topSinhVien,
    sinhVienVangMat,
    thongKeNguoiLa,
    thongKeSinhVienBiHanChe,
    dangTai,
  } = dungThongKe();

  // Xử lý sự kiện thay đổi khung thời gian hiển thị thống kê
  const xuLyThayDoiKhungThoiGian = (suKien: RadioChangeEvent) => {
    datKhungThoiGian(suKien.target.value as KieuKhungThoiGian);
  };

  const laKtx = khungThoiGian === 'DORMITORY';

  return (
    <BoCucChinh>
      <TieuDeTrang
        tieuDe="Thống kê"
        moTa="Báo cáo phân tích tần suất ra vào và chỉ số an ninh trong Ký túc xá Đại học Cần Thơ"
        boSung={
          <Radio.Group value={khungThoiGian} onChange={xuLyThayDoiKhungThoiGian} className="rounded-lg">
            <Radio.Button value="DAY">Theo ngày</Radio.Button>
            <Radio.Button value="MONTH">Theo tháng</Radio.Button>
            <Radio.Button value="YEAR">Theo năm</Radio.Button>
            <Radio.Button value="DORMITORY">Theo khu KTX</Radio.Button>
          </Radio.Group>
        }
      />

      {/* Phần hiển thị biểu đồ và bảng chi tiết số liệu của khung thời gian */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <BieuDoKhungGio
            tieuDe={TIEU_DE_BIEU_DO[khungThoiGian]}
            duLieu={thongKeKhungThoiGian}
            dangTai={dangTai}
            laKtx={laKtx}
          />
        </div>
        <BangChiTietRaVao duLieu={thongKeKhungThoiGian} dangTai={dangTai} laKtx={laKtx} />
      </div>

      {/* Các bảng thống kê phụ: Top sinh viên đi lại & Sinh viên vắng mặt */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BangThongKeChung
          tieuDe="Top sinh viên ra vào nhiều nhất"
          nguonDuLieu={topSinhVien}
          khoaDong="mssv"
          dangTai={dangTai}
          cacCot={cotBangSinhVienRaVaoNhieu}
        />
        <BangThongKeChung
          tieuDe="Sinh viên vắng mặt lâu ngày"
          nguonDuLieu={sinhVienVangMat}
          khoaDong="mssv"
          dangTai={dangTai}
          cacCot={cotBangSinhVienVangMat}
        />
      </div>

      {/* Các bảng thống kê phụ: Người lạ phát hiện & Sinh viên bị hạn chế */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BangThongKeChung
          tieuDe="Người lạ phát hiện"
          nguonDuLieu={thongKeNguoiLa}
          khoaDong="ngay"
          dangTai={dangTai}
          cacCot={cotBangNguoiLa}
        />
        <BangThongKeChung
          tieuDe="Sinh viên bị hạn chế"
          nguonDuLieu={thongKeSinhVienBiHanChe}
          khoaDong="mssv"
          dangTai={dangTai}
          cacCot={cotBangSinhVienBiHanChe}
        />
      </div>
    </BoCucChinh>
  );
}

