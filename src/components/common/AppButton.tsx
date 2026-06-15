'use client';

import React from 'react';
import { Button, ButtonProps } from 'antd';

interface AppButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  style,
  ...props
}) => {
  let customStyle: React.CSSProperties = {};
  
  if (variant === 'primary') {
    customStyle = { backgroundColor: '#1f5ca9', borderColor: '#1f5ca9', color: '#fff' };
  } else if (variant === 'danger') {
    customStyle = { backgroundColor: '#FF4D4F', borderColor: '#FF4D4F', color: '#fff' };
  } else if (variant === 'success') {
    customStyle = { backgroundColor: '#52C41A', borderColor: '#52C41A', color: '#fff' };
  } else if (variant === 'warning') {
    customStyle = { backgroundColor: '#FAAD14', borderColor: '#FAAD14', color: '#fff' };
  } else {
    // Secondary
    customStyle = { color: '#1f5ca9', borderColor: '#1f5ca9' };
  }

  return (
    <Button
      style={{ ...customStyle, borderRadius: '8px', ...style }}
      className={`font-medium transition-all duration-200 flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;
