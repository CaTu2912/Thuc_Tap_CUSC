'use client';

import React from 'react';
import { Card, Space, Button } from 'antd';
import { FilterOutlined, ClearOutlined } from '@ant-design/icons';

// Định nghĩa giao diện thuộc tính cho Thẻ bộ lọc tìm kiếm dữ liệu
interface ThuocTinhTheBoLoc {
  // Các thành phần bộ lọc con bên trong (ô nhập chữ, ô chọn lựa, chọn ngày...)
  children: React.ReactNode;

  // Hàm xử lý khi người dùng nhấn nút làm mới bộ lọc (tùy chọn)
  khiXoa?: () => void;

  // Hàm xử lý khi người dùng bấm nút Áp dụng bộ lọc (tùy chọn)
  khiLoc?: () => void;

  // Tiêu đề của thẻ bộ lọc (mặc định: Bộ lọc tìm kiếm)
  tieuDe?: string;

  // Lớp CSS tùy biến (tùy chọn)
  tenLop?: string;
}

/**
 * Component Thẻ bộ lọc (FilterCard).
 * Chức năng: Tạo khung bao bọc bộ lọc tìm kiếm, hỗ trợ bố cục lưới (grid), nút làm mới (reset) và nút áp dụng (filter).
 */
export const TheBoLoc: React.FC<ThuocTinhTheBoLoc> = ({
  children,
  khiXoa,
  khiLoc,
  tieuDe = 'Bộ lọc tìm kiếm',
  tenLop = '',
}) => {
  return (
    <Card
      title={
        <span className="flex items-center gap-2 text-zinc-700 font-bold text-sm">
          <FilterOutlined style={{ color: '#1f5ca9' }} /> {tieuDe}
        </span>
      }
      variant="borderless"
      className={`shadow-xs border border-zinc-100 rounded-xl mb-4 ${tenLop}`}
      extra={
        <Space size={8}>
          {khiXoa && (
            <Button
              icon={<ClearOutlined />}
              onClick={khiXoa}
              size="small"
              className="rounded-md hover:border-[#1f5ca9] hover:text-[#1f5ca9] text-xs flex items-center"
            >
              Làm mới
            </Button>
          )}
          {khiLoc && (
            <Button
              type="primary"
              onClick={khiLoc}
              size="small"
              className="rounded-md bg-[#1f5ca9] hover:bg-[#1a4e8f] text-xs flex items-center"
            >
              Áp dụng
            </Button>
          )}
        </Space>
      }
      styles={{ body: { padding: '16px 24px' } }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {children}
      </div>
    </Card>
  );
};

export default TheBoLoc;
