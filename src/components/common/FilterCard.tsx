'use client';

import React from 'react';
import { Card, Space, Button } from 'antd';
import { FilterOutlined, ClearOutlined } from '@ant-design/icons';

interface FilterCardProps {
  children: React.ReactNode;
  onClear?: () => void;
  onFilter?: () => void;
  title?: string;
  className?: string;
}

export const FilterCard: React.FC<FilterCardProps> = ({
  children,
  onClear,
  onFilter,
  title = 'Bộ lọc tìm kiếm',
  className = '',
}) => {
  return (
    <Card
      title={
        <span className="flex items-center gap-2 text-zinc-700 font-bold text-sm">
          <FilterOutlined style={{ color: '#1f5ca9' }} /> {title}
        </span>
      }
      variant="borderless"
      className={`shadow-xs border border-zinc-100 rounded-xl mb-4 ${className}`}
      extra={
        <Space size={8}>
          {onClear && (
            <Button
              icon={<ClearOutlined />}
              onClick={onClear}
              size="small"
              className="rounded-md hover:border-[#1f5ca9] hover:text-[#1f5ca9] text-xs flex items-center"
            >
              Làm mới
            </Button>
          )}
          {onFilter && (
            <Button
              type="primary"
              onClick={onFilter}
              size="small"
              className="rounded-md bg-[#1f5ca9] hover:bg-[#1a4e8f] text-xs flex items-center"
            >
              Áp dụng
            </Button>
          )}
        </Space>
      }
      styles={{ body: { padding: '16px 24px' } }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {children}
      </div>
    </Card>
  );
};

export default FilterCard;
