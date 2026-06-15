'use client';

import React from 'react';
import { Modal, ModalProps } from 'antd';

// Định nghĩa giao diện thuộc tính cho Hộp thoại ứng dụng
interface ThuocTinhHopThoaiUngDung extends ModalProps {
  // Thành phần con hiển thị bên trong hộp thoại
  children: React.ReactNode;
}

/**
 * Component Hộp thoại (Modal) chuẩn hóa giao diện.
 * Chức năng: Hiển thị giữa màn hình, bo tròn góc, tùy chỉnh nút Đồng ý mặc định và cấu hình khoảng đệm (padding) thân hộp thoại.
 */
export const HopThoaiUngDung: React.FC<ThuocTinhHopThoaiUngDung> = ({
  children,
  styles,
  ...cacThuocTinhKhac
}) => {
  return (
    <Modal
      centered
      styles={{
        body: {
          padding: '12px 0 0 0',
        },
        ...styles,
      }}
      okButtonProps={{
        style: { backgroundColor: '#1f5ca9', borderColor: '#1f5ca9' }
      }}
      style={{
        borderRadius: '12px',
        overflow: 'hidden'
      }}
      {...cacThuocTinhKhac}
    >
      {children}
    </Modal>
  );
};

export default HopThoaiUngDung;
