'use client';

import React from 'react';
import { Select } from 'antd';
import SearchToolbar from '@/components/common/SearchToolbar';

interface FeedbackFilterProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onExport: () => void;
  onReset: () => void;
}

export const FeedbackFilter: React.FC<FeedbackFilterProps> = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onExport,
  onReset,
}) => {
  return (
    <SearchToolbar
      placeholder="Tìm theo mã số sinh viên, tên hoặc nội dung..."
      searchValue={search}
      onSearchChange={onSearchChange}
      onExportClick={onExport}
      onResetClick={onReset}
      extraFilters={
        <Select
          placeholder="Trạng thái xử lý"
          value={status || undefined}
          onChange={onStatusChange}
          allowClear
          options={[
            { value: 'PENDING', label: 'Chờ giải quyết' },
            { value: 'RESOLVED', label: 'Đã giải quyết' },
          ]}
          style={{ width: 180 }}
          className="rounded-lg"
        />
      }
    />
  );
};

export default FeedbackFilter;
