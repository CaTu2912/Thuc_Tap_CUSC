'use client';

import React from 'react';
import { Skeleton, Card } from 'antd';

// Định nghĩa giao diện thuộc tính cho khung hiệu ứng đang tải dữ liệu
interface ThuocTinhKhungTaiDuLieu {
  // Phân loại khung tải (bảng biểu, dạng thẻ, biểu đồ, danh sách)
  loai?: 'table' | 'card' | 'chart' | 'list';

  // Số lượng dòng hiệu ứng hiển thị (nếu loại là table/list)
  soDong?: number;

  // Số lượng thẻ hiệu ứng hiển thị (nếu loại là card)
  soLuongThe?: number;
}

/**
 * Component hiển thị khung xương (Skeleton) giả lập trạng thái đang tải dữ liệu.
 * Chức năng: Giúp giao diện mượt mà hơn khi chờ phản hồi từ máy chủ, hỗ trợ nhiều kiểu hiển thị.
 */
export const KhungTaiDuLieu: React.FC<ThuocTinhKhungTaiDuLieu> = ({
  loai = 'table',
  soDong = 5,
  soLuongThe = 3,
}) => {
  // Trường hợp tải dạng thẻ (Card)
  if (loai === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 mb-6">
        {Array.from({ length: soLuongThe }).map((_, chiSo) => (
          <Card key={chiSo} className="rounded-xl border border-zinc-100 shadow-xs" styles={{ body: { padding: '20px 24px' } }}>
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        ))}
      </div>
    );
  }

  // Trường hợp tải dạng biểu đồ (Chart)
  if (loai === 'chart') {
    return (
      <Card className="rounded-xl border border-zinc-100 shadow-xs p-4 w-full h-[350px] flex flex-col justify-between">
        <Skeleton.Input active size="small" style={{ width: 120 }} />
        <Skeleton active paragraph={{ rows: 6 }} title={false} />
      </Card>
    );
  }

  // Trường hợp tải dạng danh sách (List)
  if (loai === 'list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: soDong }).map((_, chiSo) => (
          <div key={chiSo} className="bg-white p-4 rounded-xl border border-zinc-100 flex items-center gap-4">
            <Skeleton.Avatar active size="large" />
            <div className="flex-1">
              <Skeleton active paragraph={{ rows: 1 }} title={false} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Mặc định tải dạng bảng dữ liệu (Table)
  return (
    <div className="bg-white p-6 rounded-xl border border-zinc-100 shadow-xs space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Skeleton.Input active size="default" style={{ width: 200 }} />
        <Skeleton.Button active size="default" style={{ width: 100 }} />
      </div>
      {Array.from({ length: soDong }).map((_, chiSo) => (
        <Skeleton key={chiSo} active paragraph={{ rows: 1 }} title={false} />
      ))}
    </div>
  );
};

export default KhungTaiDuLieu;
