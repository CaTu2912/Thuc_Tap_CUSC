'use client';

import React from 'react';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

// Định nghĩa giao diện thuộc tính cho hộp thoại xác nhận xóa
interface ThuocTinhXacNhanXoa {
  // Tiêu đề của hộp thoại xác nhận (mặc định: Xác nhận xóa?)
  tieuDe?: string;

  // Mô tả nội dung cảnh báo chi tiết (mặc định: Hành động này không thể hoàn tác...)
  moTa?: string;

  // Hàm xử lý sự kiện khi người dùng bấm nút Xác nhận (Đồng ý)
  khiXacNhan: () => void;

  // Hàm xử lý sự kiện khi người dùng hủy bỏ hành động (tùy chọn)
  khiHuy?: () => void;

  // Thành phần kích hoạt hộp thoại (thường là một nút bấm)
  children: React.ReactElement;

  // Văn bản hiển thị trên nút Đồng ý (mặc định: Xóa)
  chuDongY?: string;

  // Văn bản hiển thị trên nút Hủy (mặc định: Hủy)
  chuHuy?: string;
}

/**
 * Component hiển thị Popconfirm (hộp thoại xác nhận nhỏ đính kèm) dùng để xác nhận thao tác xóa.
 * Chức năng: Ngăn chặn người dùng vô tình xóa dữ liệu bằng cách yêu cầu xác nhận nhanh, hiển thị dạng nút màu đỏ nguy hiểm (danger).
 */
export const XacNhanXoa: React.FC<ThuocTinhXacNhanXoa> = ({
  tieuDe = 'Xác nhận xóa?',
  moTa = 'Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa mục này?',
  khiXacNhan,
  khiHuy,
  children,
  chuDongY = 'Xóa',
  chuHuy = 'Hủy',
}) => {
  return (
    <Popconfirm
      title={tieuDe}
      description={moTa}
      onConfirm={khiXacNhan}
      onCancel={khiHuy}
      okText={chuDongY}
      cancelText={chuHuy}
      okButtonProps={{
        danger: true,
        type: 'primary',
        style: { borderRadius: '6px' }
      }}
      cancelButtonProps={{
        style: { borderRadius: '6px' }
      }}
      icon={<QuestionCircleOutlined style={{ color: '#FF4D4F' }} />}
    >
      {children}
    </Popconfirm>
  );
};

export default XacNhanXoa;
