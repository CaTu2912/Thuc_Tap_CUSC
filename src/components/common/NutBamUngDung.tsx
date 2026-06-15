'use client';

import React from 'react';
import { Button, ButtonProps } from 'antd';

// Định nghĩa thuộc tính cho nút bấm ứng dụng kế thừa từ ButtonProps của Antd
interface ThuocTinhNutBamUngDung extends Omit<ButtonProps, 'variant'> {
  // Loại kiểu dáng hiển thị của nút bấm
  kieuDang?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

/**
 * Component nút bấm tùy biến cho ứng dụng.
 * Chức năng: Tạo nút bấm chuẩn hóa kiểu dáng, bo góc và các màu sắc đặc trưng (chủ đạo CTU, thành công, cảnh báo, nguy hiểm).
 */
export const NutBamUngDung: React.FC<ThuocTinhNutBamUngDung> = ({
  children,
  kieuDang = 'primary',
  className = '',
  style,
  ...cacThuocTinhKhac
}) => {
  let kieuCssRieng: React.CSSProperties = {};
  
  // Thiết lập kiểu dáng màu sắc riêng biệt cho từng loại nút
  if (kieuDang === 'primary') {
    kieuCssRieng = { backgroundColor: '#1f5ca9', borderColor: '#1f5ca9', color: '#fff' };
  } else if (kieuDang === 'danger') {
    kieuCssRieng = { backgroundColor: '#FF4D4F', borderColor: '#FF4D4F', color: '#fff' };
  } else if (kieuDang === 'success') {
    kieuCssRieng = { backgroundColor: '#52C41A', borderColor: '#52C41A', color: '#fff' };
  } else if (kieuDang === 'warning') {
    kieuCssRieng = { backgroundColor: '#FAAD14', borderColor: '#FAAD14', color: '#fff' };
  } else {
    // Loại phụ (secondary)
    kieuCssRieng = { color: '#1f5ca9', borderColor: '#1f5ca9' };
  }

  return (
    <Button
      style={{ ...kieuCssRieng, borderRadius: '8px', ...style }}
      className={`font-medium transition-all duration-200 flex items-center justify-center ${className}`}
      {...cacThuocTinhKhac}
    >
      {children}
    </Button>
  );
};

export default NutBamUngDung;
