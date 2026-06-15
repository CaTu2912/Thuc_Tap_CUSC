'use client';

import React from 'react';
import { Empty } from 'antd';

// Định nghĩa giao diện thuộc tính cho giao diện hiển thị khi dữ liệu rỗng
interface ThuocTinhTrangThaiTrong {
  // Chuỗi mô tả hiển thị phía dưới hình ảnh (mặc định: Không tìm thấy dữ liệu)
  moTa?: string;

  // Thành phần React bổ sung như nút bấm hành động (tùy chọn)
  boSung?: React.ReactNode;
}

/**
 * Component hiển thị giao diện thông báo không có dữ liệu.
 * Chức năng: Đưa ra thông điệp thân thiện cho người dùng khi danh sách trống hoặc bộ lọc không khớp.
 */
export const TrangThaiTrong: React.FC<ThuocTinhTrangThaiTrong> = ({
  moTa = 'Không tìm thấy dữ liệu',
  boSung,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-zinc-100 rounded-xl min-h-[300px]">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span className="text-zinc-400 font-medium text-sm">{moTa}</span>
        }
      >
        {boSung}
      </Empty>
    </div>
  );
};

export default TrangThaiTrong;
