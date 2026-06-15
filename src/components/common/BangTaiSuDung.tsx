'use client';

import React from 'react';
import BangDuLieu from './BangDuLieu';
import { TableProps } from 'antd';

/**
 * Component Bảng tái sử dụng (ReusableTable).
 * Chức năng: Đóng vai trò là lớp bọc ngoài trung gian chuyển tiếp thuộc tính cho BangDuLieu, tương thích ngược với kiểu bảng của Antd.
 */
export function BangTaiSuDung<T extends object>(cacThuocTinh: Omit<TableProps<T>, 'loading'> & { dangTai?: boolean }) {
  // Thay thế thuộc tính loading bằng dangTai trong phần bọc
  const { dangTai, ...cacThuocTinhConLai } = cacThuocTinh;
  return <BangDuLieu<T> dangTai={dangTai} {...cacThuocTinhConLai} />;
}

export default BangTaiSuDung;
