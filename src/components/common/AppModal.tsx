'use client';

import React from 'react';
import { Modal, ModalProps } from 'antd';

interface AppModalProps extends ModalProps {
  children: React.ReactNode;
}

export const AppModal: React.FC<AppModalProps> = ({
  children,
  bodyStyle,
  styles,
  ...props
}) => {
  return (
    <Modal
      centered
      styles={{
        body: {
          padding: '12px 0 0 0',
          ...bodyStyle,
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
      {...props}
    >
      {children}
    </Modal>
  );
};

export default AppModal;
