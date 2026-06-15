'use client';

import React from 'react';
import { Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';

interface StatusTagProps {
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED' | 'PENDING' | 'RESOLVED' | 'IN' | 'OUT' | string;
}

export const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  switch (status) {
    case 'ACTIVE':
    case 'RESOLVED':
      return (
        <Tag color="#52C41A" icon={<CheckCircleOutlined />} className="px-2.5 py-0.5 rounded-full font-medium flex items-center w-fit gap-1">
          {status === 'ACTIVE' ? 'Hoạt động' : 'Đã xử lý'}
        </Tag>
      );
    case 'INACTIVE':
      return (
        <Tag color="#FAAD14" icon={<ExclamationCircleOutlined />} className="px-2.5 py-0.5 rounded-full font-medium flex items-center w-fit gap-1">
          Tạm khóa
        </Tag>
      );
    case 'BANNED':
      return (
        <Tag color="#FF4D4F" icon={<CloseCircleOutlined />} className="px-2.5 py-0.5 rounded-full font-medium flex items-center w-fit gap-1">
          Bị cấm
        </Tag>
      );
    case 'PENDING':
      return (
        <Tag color="#FAAD14" icon={<ExclamationCircleOutlined />} className="px-2.5 py-0.5 rounded-full font-medium flex items-center w-fit gap-1">
          Chờ xử lý
        </Tag>
      );
    case 'IN':
      return (
        <Tag color="#52C41A" icon={<LoginOutlined />} className="px-2.5 py-0.5 rounded-full font-medium flex items-center w-fit gap-1">
          VÀO
        </Tag>
      );
    case 'OUT':
      return (
        <Tag color="#1f5ca9" icon={<LogoutOutlined />} className="px-2.5 py-0.5 rounded-full font-medium flex items-center w-fit gap-1">
          RA
        </Tag>
      );
    default:
      return <Tag className="px-2.5 py-0.5 rounded-full font-medium">{status}</Tag>;
  }
};

export default StatusTag;
