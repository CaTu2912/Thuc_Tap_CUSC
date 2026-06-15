'use client';

import React from 'react';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface ConfirmDeleteProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  children: React.ReactElement;
  okText?: string;
  cancelText?: string;
}

export const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  title = 'Xác nhận xóa?',
  description = 'Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa mục này?',
  onConfirm,
  onCancel,
  children,
  okText = 'Xóa',
  cancelText = 'Hủy',
}) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
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

export default ConfirmDelete;
