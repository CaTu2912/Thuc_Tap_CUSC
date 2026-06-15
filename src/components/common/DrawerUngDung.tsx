'use client';

import React from 'react';
import { Drawer, DrawerProps } from 'antd';

// Định nghĩa giao diện thuộc tính cho Drawer của ứng dụng
interface ThuocTinhDrawerUngDung extends DrawerProps {
  // Thành phần con hiển thị bên trong Drawer
  children: React.ReactNode;
}

/**
 * Component Drawer (khung trượt từ cạnh màn hình) chuẩn hóa giao diện.
 * Chức năng: Bo viền góc trái, tùy biến kích thước và chuẩn hóa khoảng đệm (padding) tiêu đề/thân của Drawer.
 */
export const DrawerUngDung: React.FC<ThuocTinhDrawerUngDung> = ({
  children,
  width = 500,
  styles,
  ...cacThuocTinhKhac
}) => {
  return (
    <Drawer
      styles={{
        header: {
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 24px',
          backgroundColor: '#fdfdfd',
        },
        body: {
          padding: '24px',
        },
        wrapper: {
          width: width,
        },
        ...styles,
      }}
      style={{
        borderRadius: '12px 0 0 12px',
      }}
      {...cacThuocTinhKhac}
    >
      {children}
    </Drawer>
  );
};

export default DrawerUngDung;
