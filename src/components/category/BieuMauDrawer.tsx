'use client';

import React from 'react';
import { Button, Form } from 'antd';
import DrawerUngDung from '@/components/common/DrawerUngDung';

// Định nghĩa giao diện thuộc tính cho Bọc biểu mẫu dạng Drawer dùng chung
interface ThuocTinhBieuMauDrawer {
  // Tiêu đề hiển thị ở đầu Drawer
  tieuDe: string;

  // Trạng thái đóng/mở Drawer
  mo: boolean;

  // Hàm xử lý sự kiện khi đóng Drawer
  khiDong: () => void;

  // Hàm xử lý sự kiện khi gửi dữ liệu biểu mẫu
  khiNop: () => void;

  // Văn bản hiển thị trên nút Đồng ý gửi dữ liệu (mặc định: Lưu thông tin)
  chuNop?: string;

  // Các trường nhập liệu hoặc nội dung biểu mẫu con bên trong
  children: React.ReactNode;

  // Chiều rộng tùy biến của Drawer (tùy chọn)
  chieuRong?: number;
}

/**
 * Component Bọc biểu mẫu Drawer dùng chung (DrawerForm).
 * Chức năng: Tạo cấu trúc khung Drawer đồng bộ với nút Hủy và nút Xác nhận Lưu/Gửi cho các danh mục (Sinh viên, Phòng, Dãy nhà, v.v.).
 */
export const BieuMauDrawer: React.FC<ThuocTinhBieuMauDrawer> = ({
  tieuDe,
  mo,
  khiDong,
  khiNop,
  chuNop = 'Lưu thông tin',
  children,
  chieuRong,
}) => {
  return (
    <DrawerUngDung
      title={tieuDe}
      open={mo}
      onClose={khiDong}
      width={chieuRong}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={khiDong} className="rounded-lg">
            Hủy
          </Button>
          <Button type="primary" onClick={khiNop} className="rounded-lg bg-[#1f5ca9] border-none">
            {chuNop}
          </Button>
        </div>
      }
    >
      <Form layout="vertical" className="space-y-4">
        {children}
      </Form>
    </DrawerUngDung>
  );
};

export default BieuMauDrawer;
