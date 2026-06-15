'use client';

import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import TheBieuDo from '@/components/common/TheBieuDo';
import type { ThongKeRaVaoTheoKtx, ThongKeRaVaoTheoThoiGian } from '@/types/ThongKe';

// Định nghĩa kiểu dữ liệu cho một dòng thống kê (có thể theo thời gian hoặc theo khu nhà)
type DongThongKe = ThongKeRaVaoTheoThoiGian | ThongKeRaVaoTheoKtx;

// Định nghĩa giao diện thuộc tính cho Component Biểu đồ thống kê ra vào theo khung giờ/khu nhà
interface ThuocTinhBieuDoKhungGio {
  // Tiêu đề của biểu đồ
  tieuDe: string;

  // Mảng chứa dữ liệu thống kê
  duLieu: DongThongKe[];

  // Trạng thái đang tải dữ liệu
  dangTai: boolean;

  // Cờ xác định dữ liệu hiển thị có phải theo khu nhà hay không
  laKtx: boolean;
}

/**
 * Component Biểu đồ cột thống kê ra vào (BieuDoKhungGio).
 * Chức năng: Vẽ biểu đồ cột đôi so sánh số lượt vào và lượt ra của sinh viên theo từng khung giờ hoặc từng khu nhà KTX.
 */
export const BieuDoKhungGio: React.FC<ThuocTinhBieuDoKhungGio> = ({
  tieuDe,
  duLieu,
  dangTai,
  laKtx,
}) => {
  return (
    <TheBieuDo tieuDe={tieuDe} dangTai={dangTai} chieuCao={320}>
      <ResponsiveContainer width="100%" height="100%" minHeight={280}>
        <BarChart data={duLieu} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey={laKtx ? 'tenKtx' : 'nhan'}
            stroke="#A0AEC0"
            fontSize={11}
            tickLine={false}
          />
          <YAxis stroke="#A0AEC0" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFF',
              border: 'none',
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Bar name="Lượt vào" dataKey="luotVao" fill="#52C41A" radius={[4, 4, 0, 0]} barSize={18} />
          <Bar name="Lượt ra" dataKey="luotRa" fill="#1f5ca9" radius={[4, 4, 0, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </TheBieuDo>
  );
};

export default BieuDoKhungGio;
