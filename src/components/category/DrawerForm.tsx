'use client';

import React from 'react';
import { Button, Form } from 'antd';
import AppDrawer from '@/components/common/AppDrawer';

interface DrawerFormProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  submitText?: string;
  children: React.ReactNode;
  width?: number;
}

export const DrawerForm: React.FC<DrawerFormProps> = ({
  title,
  open,
  onClose,
  onSubmit,
  submitText = 'Lưu thông tin',
  children,
  width,
}) => {
  return (
    <AppDrawer
      title={title}
      open={open}
      onClose={onClose}
      width={width}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} className="rounded-lg">
            Hủy
          </Button>
          <Button type="primary" onClick={onSubmit} className="rounded-lg bg-[#1f5ca9] border-none">
            {submitText}
          </Button>
        </div>
      }
    >
      <Form layout="vertical" className="space-y-4">
        {children}
      </Form>
    </AppDrawer>
  );
};

export default DrawerForm;
