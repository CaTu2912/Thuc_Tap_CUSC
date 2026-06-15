'use client';

import React from 'react';
import { Empty } from 'antd';

interface EmptyStateProps {
  description?: string;
  extra?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  description = 'Không tìm thấy dữ liệu',
  extra,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-zinc-100 rounded-xl min-h-[300px]">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span className="text-zinc-400 font-medium text-sm">{description}</span>
        }
      >
        {extra}
      </Empty>
    </div>
  );
};

export default EmptyState;
