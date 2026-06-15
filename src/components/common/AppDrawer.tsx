'use client';

import React from 'react';
import { Drawer, DrawerProps } from 'antd';

interface AppDrawerProps extends DrawerProps {
  children: React.ReactNode;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  children,
  width = 500,
  headerStyle,
  bodyStyle,
  styles,
  ...props
}) => {
  return (
    <Drawer
      styles={{
        header: {
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 24px',
          backgroundColor: '#fdfdfd',
          ...headerStyle,
        },
        body: {
          padding: '24px',
          ...bodyStyle,
        },
        wrapper: {
          width: width,
        },
        ...styles,
      }}
      style={{
        borderRadius: '12px 0 0 12px',
      }}
      {...props}
    >
      {children}
    </Drawer>
  );
};

export default AppDrawer;
