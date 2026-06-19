'use client';

import React from 'react';
import { Card, Text } from '@mantine/core';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';

// Định nghĩa giao diện thuộc tính cho thẻ hiển thị thống kê số liệu
interface ThuocTinhTheThongKe {
  // Tiêu đề của thẻ thống kê (Ví dụ: "Tổng sinh viên")
  tieuDe: string;

  // Giá trị số liệu hiển thị (Số hoặc chuỗi chữ)
  giaTri: number | string;

  // Biểu tượng minh họa cho chỉ số thống kê (tùy chọn)
  bieuTuong?: React.ReactNode;

  // Màu sắc chủ đạo trang trí viền trái (mặc định màu xanh dương CTU)
  mauSac?: string;

  // Xu hướng tăng giảm so với kỳ trước (tùy chọn)
  xuHuong?: {
    loai: 'up' | 'down';
    giaTri: string;
  };

  // Các lớp CSS bổ sung để căn chỉnh layout (tùy chọn)
  tenLop?: string;

  // Nội dung phụ đề hiển thị ở cuối thẻ (tùy chọn, ví dụ: 67,0% tổng số SV)
  phuDe?: string;

  // Màu sắc của chữ phụ đề (tùy chọn)
  mauPhuDe?: string;
}

/**
 * Thẻ hiển thị số liệu thống kê nhanh ở trang chủ.
 * Chức năng: Thể hiện thông số cụ thể kèm biểu tượng và xu hướng tăng/giảm.
 */
export const TheThongKe: React.FC<ThuocTinhTheThongKe> = ({
  tieuDe,
  giaTri,
  bieuTuong,
  mauSac = '#1f5ca9',
  xuHuong,
  tenLop = '',
  phuDe,
  mauPhuDe,
}) => {
  return (
    <Card
      radius="xl"
      p="md"
      className={`shadow-xs hover:shadow-md transition-shadow duration-300 overflow-hidden relative bg-white ${tenLop}`}
      style={{
        borderLeft: `5px solid ${mauSac}`,
        borderTop: '1px solid #f4f4f5',
        borderRight: '1px solid #f4f4f5',
        borderBottom: '1px solid #f4f4f5',
      }}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col flex-1 min-w-0">
          <Text size="xs" c="dimmed" fw={600} className="uppercase tracking-wider text-[10px]" style={{ fontSize: '10px' }}>
            {tieuDe}
          </Text>
          <span className="text-xl font-black text-zinc-800 tracking-tight leading-none mt-1.5 font-sans">
            {giaTri}
          </span>
        </div>
        {bieuTuong && (
          <div
            className="flex items-center justify-center w-9 h-9 rounded-lg text-base shrink-0"
            style={{ backgroundColor: `${mauSac}15`, color: mauSac }}
          >
            {bieuTuong}
          </div>
        )}
      </div>
      {phuDe && (
        <div className="mt-2 text-[10px] font-medium leading-none" style={{ color: mauPhuDe || '#A0AEC0', fontSize: '10px' }}>
          {phuDe}
        </div>
      )}
      {!phuDe && xuHuong && (
        <div className="mt-2 flex items-center gap-1 text-[10px]" style={{ fontSize: '10px' }}>
          {xuHuong.loai === 'up' ? (
            <span className="text-emerald-500 flex items-center font-bold">
              <IconArrowUp size={10} className="mr-0.5" />
              {xuHuong.giaTri}
            </span>
          ) : (
            <span className="text-rose-500 flex items-center font-bold">
              <IconArrowDown size={10} className="mr-0.5" />
              {xuHuong.giaTri}
            </span>
          )}
          <span className="text-zinc-400">so với hôm qua</span>
        </div>
      )}
    </Card>
  );
};

export default TheThongKe;
