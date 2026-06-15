'use client';

import React from 'react';
import { Table, TableProps } from 'antd';

// Định nghĩa giao diện thuộc tính cho Bảng dữ liệu dùng chung
interface ThuocTinhBangDuLieu<T> extends Omit<TableProps<T>, 'loading'> {
  // Trạng thái đang tải dữ liệu để hiển thị vòng xoay
  dangTai?: boolean;
}

/**
 * Component Bảng dữ liệu chuẩn hóa (DataTable).
 * Chức năng: Đóng gói Antd Table, cấu hình sẵn phân trang tiếng Việt, hiển thị thanh cuộn ngang khi tràn cột, hiệu ứng dòng chẵn lẻ xen kẽ.
 */
export function BangDuLieu<T extends object>({
  columns,
  dataSource,
  dangTai = false,
  rowKey = 'id',
  pagination = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (tongSo) => {
      return `Tổng số ${tongSo} mục`;
    },
  },
  className = '',
  ...cacThuocTinhKhac
}: ThuocTinhBangDuLieu<T>) {
  return (
    <div className={`bg-white rounded-xl shadow-xs overflow-hidden border border-zinc-100 flex flex-col h-full ${className}`}>
      <Table<T>
        columns={columns}
        dataSource={dataSource}
        loading={dangTai}
        rowKey={rowKey}
        pagination={pagination}
        scroll={{ x: 'max-content' }}
        rowClassName={(_, chiSo) => {
          return chiSo % 2 === 0 ? 'bg-white hover:bg-zinc-50/50' : 'bg-zinc-50/20 hover:bg-zinc-50/50';
        }}
        style={{
          borderRadius: '12px',
        }}
        {...cacThuocTinhKhac}
      />
    </div>
  );
}

export default BangDuLieu;
