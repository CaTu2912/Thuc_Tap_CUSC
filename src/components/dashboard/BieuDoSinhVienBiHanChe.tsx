'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import TheBieuDo from '../common/TheBieuDo';

// Định nghĩa giao diện thuộc tính cho Component Biểu đồ sinh viên bị hạn chế
interface ThuocTinhBieuDoSinhVienBiHanChe {
  // Trạng thái đang tải dữ liệu (tùy chọn)
  dangTai?: boolean;
}

// Dữ liệu giả lập về số lượt sinh viên bị hạn chế cố gắng quét thẻ vào KTX theo từng khu nhà
const duLieuGiaLapHanChe = [
  { tenKtx: 'Khu A', soLuong: 8 },
  { tenKtx: 'Khu B', soLuong: 3 },
  { tenKtx: 'Khu C', soLuong: 1 },
  { tenKtx: 'Khu D', soLuong: 5 },
];

/**
 * Component Biểu đồ sinh viên bị hạn chế ra vào (BieuDoSinhVienBiHanChe).
 * Chức năng: Vẽ biểu đồ cột hiển thị số lượng phát hiện sinh viên vi phạm / bị hạn chế ra vào cố tình quét thẻ tại các khu nhà.
 */
export const BieuDoSinhVienBiHanChe: React.FC<ThuocTinhBieuDoSinhVienBiHanChe> = ({ dangTai = false }) => {
  return (
    <TheBieuDo
      tieuDe="Cảnh báo cố tình xâm nhập theo Khu"
      phuDe="Số lượt phát hiện sinh viên đang bị hạn chế cố gắng quét thẻ vào KTX"
      dangTai={dangTai}
      chieuCao={280}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={duLieuGiaLapHanChe} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="tenKtx" stroke="#A0AEC0" fontSize={11} tickLine={false} />
          <YAxis stroke="#A0AEC0" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(giaTri) => {
              return [`${giaTri} Lần`, 'Số lượt phát hiện'];
            }}
            contentStyle={{
              backgroundColor: '#FFF',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Bar dataKey="soLuong" fill="#FF4D4F" radius={[4, 4, 0, 0]} barSize={20}>
            {duLieuGiaLapHanChe.map((_, chiSo) => {
              return (
                <Cell
                  key={`cell-${chiSo}`}
                  fill={chiSo % 2 === 0 ? '#FF4D4F' : '#FAAD14'}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </TheBieuDo>
  );
};

export default BieuDoSinhVienBiHanChe;
