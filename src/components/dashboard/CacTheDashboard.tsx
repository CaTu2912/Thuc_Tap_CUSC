'use client';

import React from 'react';
import { IconUsers, IconLogin, IconLogout, IconCurrencyDollar, IconBan, IconEyeOff } from '@tabler/icons-react';
import TheThongKe from '../common/TheThongKe';
import { KpiBangDieuKhien } from '../../types/BangDieuKhien';

// Định nghĩa giao diện thuộc tính cho cụm các thẻ KPI tại trang chủ
interface ThuocTinhCacTheDashboard {
  // Đối tượng chứa các chỉ số thống kê
  chiSoKpi?: KpiBangDieuKhien;

  // Trạng thái đang tải dữ liệu (tùy chọn)
  dangTai?: boolean;
}

/**
 * Component tập hợp các thẻ thống kê nhanh chỉ số KPI ở Dashboard (CacTheDashboard).
 * Chức năng: Phân rã dữ liệu từ API và hiển thị thành 6 thẻ: Tổng số sinh viên, có mặt, vắng mặt, nợ phí, bị hạn chế và người lạ.
 */
export const CacTheDashboard: React.FC<ThuocTinhCacTheDashboard> = ({
  chiSoKpi = {
    tongSoSinhVien: 0,
    sinhVienCoMat: 0,
    sinhVienVangMat: 0,
    sinhVienNoPhi: 0,
    sinhVienBiHanChe: 0,
    nguoiLaPhatHienHomNay: 0,
  },
}) => {
  // Tính toán tỷ lệ phần trạng động dựa trên số liệu thực tế
  const tongSV = chiSoKpi.tongSoSinhVien || 1; // Tránh chia cho 0
  const phanTramCoMat = ((chiSoKpi.sinhVienCoMat / tongSV) * 100).toFixed(1).replace('.', ',');
  const phanTramVangMat = ((chiSoKpi.sinhVienVangMat / tongSV) * 100).toFixed(1).replace('.', ',');
  const phanTramNoPhi = ((chiSoKpi.sinhVienNoPhi / tongSV) * 100).toFixed(1).replace('.', ',');
  const phanTramBiCam = ((chiSoKpi.sinhVienBiHanChe / tongSV) * 100).toFixed(1).replace('.', ',');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 mb-6">
      <TheThongKe
        tieuDe="Tổng SV KTX"
        giaTri={chiSoKpi.tongSoSinhVien.toLocaleString('vi-VN')}
        bieuTuong={<IconUsers size={18} />}
        mauSac="#1f5ca9" // Màu xanh dương CTU
        phuDe="Tổng số sinh viên"
        mauPhuDe="#A0AEC0"
      />
      <TheThongKe
        tieuDe="Đang có mặt"
        giaTri={chiSoKpi.sinhVienCoMat.toLocaleString('vi-VN')}
        bieuTuong={<IconLogin size={18} />}
        mauSac="#52C41A" // Màu xanh lá
        phuDe={`${phanTramCoMat}% tổng số SV`}
        mauPhuDe="#52C41A"
      />
      <TheThongKe
        tieuDe="Đã ra ngoài"
        giaTri={chiSoKpi.sinhVienVangMat.toLocaleString('vi-VN')}
        bieuTuong={<IconLogout size={18} />}
        mauSac="#FAAD14" // Màu vàng cam
        phuDe={`${phanTramVangMat}% tổng số SV`}
        mauPhuDe="#ED8936"
      />
      <TheThongKe
        tieuDe="Sinh viên nợ phí"
        giaTri={chiSoKpi.sinhVienNoPhi.toLocaleString('vi-VN')}
        bieuTuong={<IconCurrencyDollar size={18} />}
        mauSac="#D69E2E" // Vàng đồng
        phuDe={`${phanTramNoPhi}% tổng số SV`}
        mauPhuDe="#A0AEC0"
      />
      <TheThongKe
        tieuDe="Sinh viên bị cấm"
        giaTri={chiSoKpi.sinhVienBiHanChe.toLocaleString('vi-VN')}
        bieuTuong={<IconBan size={18} />}
        mauSac="#FF4D4F" // Đỏ nguy hiểm
        phuDe={`${phanTramBiCam}% tổng số SV`}
        mauPhuDe="#A0AEC0"
      />
      <TheThongKe
        tieuDe="Người lạ hôm nay"
        giaTri={chiSoKpi.nguoiLaPhatHienHomNay.toLocaleString('vi-VN')}
        bieuTuong={<IconEyeOff size={18} />}
        mauSac="#805AD5" // Màu tím hoàng gia
        phuDe="Phát hiện hôm nay"
        mauPhuDe="#A0AEC0"
      />
    </div>
  );
};

export default CacTheDashboard;
