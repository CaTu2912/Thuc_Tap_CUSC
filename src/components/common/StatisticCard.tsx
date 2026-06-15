'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface StatisticCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string;
  trend?: {
    type: 'up' | 'down';
    value: string;
  };
  className?: string;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  icon,
  color = '#1f5ca9',
  trend,
  className = '',
}) => {
  return (
    <Card
      variant="borderless"
      className={`shadow-xs hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden relative ${className}`}
      styles={{ body: { padding: '12px 16px' } }}
      style={{ borderLeft: `5px solid ${color}` }}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col flex-1 min-w-0">
          <Text className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
            {title}
          </Text>
          <span className="text-xl font-black text-zinc-800 tracking-tight leading-none mt-1.5">
            {value}
          </span>
        </div>
        {icon && (
          <div
            className="flex items-center justify-center w-9 h-9 rounded-lg text-base shrink-0"
            style={{ backgroundColor: `${color}15`, color: color }}
          >
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-[10px]">
          {trend.type === 'up' ? (
            <span className="text-emerald-500 flex items-center font-bold">
              <ArrowUpOutlined className="mr-0.5" />
              {trend.value}
            </span>
          ) : (
            <span className="text-rose-500 flex items-center font-bold">
              <ArrowDownOutlined className="mr-0.5" />
              {trend.value}
            </span>
          )}
          <span className="text-zinc-400">so với hôm qua</span>
        </div>
      )}
    </Card>
  );
};

export default StatisticCard;