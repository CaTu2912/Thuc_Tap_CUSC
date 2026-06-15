'use client';

import React from 'react';
import { Card, Spin } from 'antd';

// Định nghĩa giao diện thuộc tính cho Thẻ biểu đồ chứa các Recharts
interface ThuocTinhTheBieuDo {
  // Tiêu đề chính của biểu đồ
  tieuDe: string;

  // Tiêu đề phụ hoặc ghi chú nhỏ bên dưới tiêu đề chính (tùy chọn)
  phuDe?: string;

  // Trạng thái đang tải dữ liệu để hiển thị hiệu ứng xoay (mặc định: false)
  dangTai?: boolean;

  // Thành phần React bổ sung hiển thị ở góc trên bên phải (tùy chọn)
  boSung?: React.ReactNode;

  // Nội dung biểu đồ hoặc các phần tử con bên trong
  children: React.ReactNode;

  // Chiều cao của khu vực vẽ biểu đồ (mặc định: 300px)
  chieuCao?: number;

  // Lớp CSS tùy biến bổ sung (tùy chọn)
  tenLop?: string;
}

/**
 * Component Thẻ bao bọc biểu đồ thống kê.
 * Chức năng: Đóng vai trò là một container chuẩn hóa, hỗ trợ tiêu đề, tiêu đề phụ, các nút hành động bổ sung và trạng thái xoay tải dữ liệu (Spin).
 */
export const TheBieuDo: React.FC<ThuocTinhTheBieuDo> = ({
  tieuDe,
  phuDe,
  dangTai = false,
  boSung,
  children,
  chieuCao = 300,
  tenLop = '',
}) => {
  return (
    <Card
      title={
        <div className="flex flex-col">
          <span className="text-zinc-800 font-bold text-base tracking-tight">{tieuDe}</span>
          {phuDe && <span className="text-zinc-400 font-normal text-xs mt-0.5">{phuDe}</span>}
        </div>
      }
      extra={boSung}
      variant="borderless"
      className={`shadow-xs border border-zinc-100 rounded-xl overflow-hidden ${tenLop}`}
      styles={{ body: { padding: '16px 20px' } }}
    >
      <Spin spinning={dangTai}>
        <div style={{ height: `${chieuCao}px`, width: '100%' }} className="flex items-center justify-center">
          {children}
        </div>
      </Spin>
    </Card>
  );
};

export default TheBieuDo;
