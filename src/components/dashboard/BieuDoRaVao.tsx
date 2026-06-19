'use client';

import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import TheBieuDo from '../common/TheBieuDo';
import { DuLieuBieuDoRaVao } from '../../types/BangDieuKhien';
import { SegmentedControl } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

// Định nghĩa giao diện thuộc tính cho Biểu đồ tần suất ra vào theo giờ
interface ThuocTinhBieuDoRaVao {
  // Mảng chứa dữ liệu vẽ biểu đồ lượt ra vào
  duLieu?: DuLieuBieuDoRaVao[];

  // Trạng thái đang tải dữ liệu (tùy chọn)
  dangTai?: boolean;
}

/**
 * Component Biểu đồ tần suất Ra/Vào theo giờ (BieuDoRaVao).
 * Chức năng: Vẽ biểu đồ cột (Bar Chart) so sánh lượng sinh viên quét thẻ đi vào và đi ra trong ngày.
 */
export const BieuDoRaVao: React.FC<ThuocTinhBieuDoRaVao> = ({ duLieu = [], dangTai = false }) => {
  const [kieuXem, setKieuXem] = useState<string>('DAY');
  const [ngayChon, setNgayChon] = useState<Date | null>(new Date('2026-06-01'));

  // Phần bộ lọc thời gian hiển thị ở góc phải tiêu đề biểu đồ dùng Mantine UI
  const boLocThoiGian = (
    <div className="flex items-center gap-3">
      <SegmentedControl
        value={kieuXem}
        onChange={setKieuXem}
        data={[
          { label: 'Ngày', value: 'DAY' },
          { label: 'Tháng', value: 'MONTH' },
          { label: 'Năm', value: 'YEAR' },
        ]}
        size="xs"
        radius="md"
      />
      <DatePickerInput
        value={ngayChon}
        onChange={(val: any) => {
          setNgayChon(val);
        }}
        valueFormat="DD/MM/YYYY"
        size="xs"
        radius="md"
        style={{ width: 125 }}
      />
    </div>
  );

  return (
    <TheBieuDo
      tieuDe="THỐNG KÊ LƯỢT VÀO/RA THEO THỜI GIAN"
      dangTai={dangTai}
      chieuCao={320}
      boSung={boLocThoiGian}
    >
      {duLieu.length === 0 ? (
        <span className="text-zinc-400">Không có dữ liệu</span>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={duLieu} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="thoiGian" stroke="#A0AEC0" fontSize={11} tickLine={false} />
            <YAxis stroke="#A0AEC0" fontSize={11} tickLine={false} axisLine={false} domain={[0, 500]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFF',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontFamily: 'var(--font-readex-pro), sans-serif',
                fontSize: '11px',
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', fontFamily: 'var(--font-readex-pro), sans-serif' }} 
            />
            <Bar
              name="Lượt vào"
              dataKey="luotVao"
              fill="#1f5ca9" // Màu xanh dương chủ đạo CTU
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
            <Bar
              name="Lượt ra"
              dataKey="luotRa"
              fill="#FF4D4F" // Màu đỏ nguy hiểm/cảnh báo
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </TheBieuDo>
  );
};

export default BieuDoRaVao;
