'use client';

import React from 'react';
import { Badge } from '@mantine/core';
import {
  IconCircleCheck,
  IconAlertCircle,
  IconX,
  IconLogin,
  IconLogout,
} from '@tabler/icons-react';

// Định nghĩa giao diện thuộc tính cho nhãn hiển thị trạng thái
interface ThuocTinhNhanTrangThai {
  // Trạng thái cần hiển thị nhãn màu sắc tương ứng
  trangThai: 'ACTIVE' | 'INACTIVE' | 'BANNED' | 'PENDING' | 'RESOLVED' | 'IN' | 'OUT' | string;
}

/**
 * Component hiển thị nhãn trạng thái (Badge) được chuẩn hóa màu sắc.
 * Chức năng: Chuyển đổi các trạng thái hệ thống (ACTIVE, BANNED, IN, OUT,...) thành nhãn tiếng Việt trực quan kèm biểu tượng.
 */
export const NhanTrangThai: React.FC<ThuocTinhNhanTrangThai> = ({ trangThai }) => {
  let color = 'gray';
  let label = trangThai;
  let icon = null;

  switch (trangThai) {
    case 'ACTIVE':
      color = 'green';
      label = 'Hoạt động';
      icon = <IconCircleCheck size={12} />;
      break;
    case 'RESOLVED':
      color = 'green';
      label = 'Đã xử lý';
      icon = <IconCircleCheck size={12} />;
      break;
    case 'INACTIVE':
      color = 'yellow';
      label = 'Tạm khóa';
      icon = <IconAlertCircle size={12} />;
      break;
    case 'BANNED':
      color = 'red';
      label = 'Bị cấm';
      icon = <IconX size={12} />;
      break;
    case 'PENDING':
      color = 'yellow';
      label = 'Chờ xử lý';
      icon = <IconAlertCircle size={12} />;
      break;
    case 'IN':
      color = 'green';
      label = 'VÀO';
      icon = <IconLogin size={12} />;
      break;
    case 'OUT':
      color = 'blue';
      label = 'RA';
      icon = <IconLogout size={12} />;
      break;
    default:
      break;
  }

  return (
    <Badge
      leftSection={icon}
      color={color}
      variant="light"
      radius="xl"
      styles={{
        root: {
          fontWeight: 600,
          textTransform: 'none',
          padding: '4px 10px',
          height: 'auto',
          fontSize: '11px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
        },
      }}
    >
      {label}
    </Badge>
  );
};

export default NhanTrangThai;
