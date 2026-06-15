'use client';

import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

// Định nghĩa giao diện thuộc tính cho Component Bảng thống kê chung
interface ThuocTinhBangThongKeChung<T extends object> {
  // Tiêu đề của bảng thống kê
  tieuDe: string;

  // Mảng dữ liệu nguồn để render bảng
  nguonDuLieu: T[];

  // Thuộc tính đóng vai trò là khóa định danh dòng dữ liệu
  khoaDong: keyof T & string;

  // Trạng thái đang tải dữ liệu
  dangTai: boolean;

  // Mảng định nghĩa cấu trúc cột của bảng
  cacCot: ColumnsType<T>;
}

/**
 * Component Bảng thống kê dạng nhỏ (BangThongKeChung).
 * Chức năng: Đóng gói Antd Table không phân trang, hiển thị tiêu đề tiêu chuẩn, phù hợp để trình bày dữ liệu dạng báo cáo/thống kê ngắn gọn.
 */
export function BangThongKeChung<T extends object>({
  tieuDe,
  nguonDuLieu,
  khoaDong,
  dangTai,
  cacCot,
}: ThuocTinhBangThongKeChung<T>) {
  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
        <span className="font-bold text-sm text-zinc-800">{tieuDe}</span>
      </div>
      <Table<T>
        dataSource={nguonDuLieu}
        loading={dangTai}
        rowKey={khoaDong}
        pagination={false}
        size="small"
        columns={cacCot}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}

export default BangThongKeChung;
