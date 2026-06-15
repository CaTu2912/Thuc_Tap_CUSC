'use client';

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import TheBieuDo from '../common/TheBieuDo';
import { DuLieuBieuDoNguoiLa } from '../../types/BangDieuKhien';

// Định nghĩa giao diện thuộc tính cho Component Biểu đồ người lạ phát hiện
interface ThuocTinhBieuDoNguoiLa {
  // Mảng dữ liệu biểu đồ người lạ
  duLieu?: DuLieuBieuDoNguoiLa[];

  // Trạng thái đang tải dữ liệu (tùy chọn)
  dangTai?: boolean;
}

/**
 * Component Biểu đồ người lạ phát hiện (BieuDoNguoiLa).
 * Chức năng: Vẽ biểu đồ đường (Line Chart) thể hiện số lượt phát hiện người lạ ra vào ký túc xá qua các ngày.
 */
export const BieuDoNguoiLa: React.FC<ThuocTinhBieuDoNguoiLa> = ({ duLieu = [], dangTai = false }) => {
  return (
    <TheBieuDo
      tieuDe="Người lạ phát hiện gần đây"
      phuDe="Số lượt hệ thống phát hiện khuôn mặt không thuộc KTX trong 7 ngày qua"
      dangTai={dangTai}
      chieuCao={280}
    >
      {duLieu.length === 0 ? (
        <span className="text-zinc-400">Không có dữ liệu</span>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={duLieu} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="ngay" stroke="#A0AEC0" fontSize={11} tickLine={false} />
            <YAxis stroke="#A0AEC0" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(giaTri) => {
                return [`${giaTri} Người`, 'Số lượng'];
              }}
              contentStyle={{
                backgroundColor: '#FFF',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="soLuong"
              stroke="#FAAD14"
              strokeWidth={3}
              activeDot={{ r: 6 }}
              dot={{ strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </TheBieuDo>
  );
};

export default BieuDoNguoiLa;
