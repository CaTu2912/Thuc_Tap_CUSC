'use client';

import React from 'react';
import { Card, Spin } from 'antd';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  loading?: boolean;
  extra?: React.ReactNode;
  children: React.ReactNode;
  height?: number;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  loading = false,
  extra,
  children,
  height = 300,
  className = '',
}) => {
  return (
    <Card
      title={
        <div className="flex flex-col">
          <span className="text-zinc-800 font-bold text-base tracking-tight">{title}</span>
          {subtitle && <span className="text-zinc-400 font-normal text-xs mt-0.5">{subtitle}</span>}
        </div>
      }
      extra={extra}
      variant="borderless"
      className={`shadow-xs border border-zinc-100 rounded-xl overflow-hidden ${className}`}
      styles={{ body: { padding: '16px 20px' } }}
    >
      <Spin spinning={loading}>
        <div style={{ height: `${height}px`, width: '100%' }} className="flex items-center justify-center">
          {children}
        </div>
      </Spin>
    </Card>
  );
};

export default ChartCard;
