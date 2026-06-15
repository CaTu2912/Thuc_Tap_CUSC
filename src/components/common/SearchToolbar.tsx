'use client';

import React from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, PlusOutlined, FileExcelOutlined, ReloadOutlined } from '@ant-design/icons';

interface SearchToolbarProps {
  placeholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddClick?: () => void;
  onExportClick?: () => void;
  onResetClick?: () => void;
  addText?: string;
  extraFilters?: React.ReactNode;
}

export const SearchToolbar: React.FC<SearchToolbarProps> = ({
  placeholder = 'Tìm kiếm...',
  searchValue,
  onSearchChange,
  onAddClick,
  onExportClick,
  onResetClick,
  addText = 'Thêm mới',
  extraFilters,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-zinc-100 shadow-xs mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <Input
          placeholder={placeholder}
          prefix={<SearchOutlined className="text-zinc-400" />}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-xs rounded-lg"
          allowClear
        />
        {extraFilters}
      </div>
      <Space size={10} className="self-end lg:self-auto">
        {onResetClick && (
          <Button
            icon={<ReloadOutlined />}
            onClick={onResetClick}
            className="rounded-lg hover:border-[#1f5ca9] hover:text-[#1f5ca9] flex items-center"
          >
            Làm mới
          </Button>
        )}
        {onExportClick && (
          <Button
            icon={<FileExcelOutlined />}
            onClick={onExportClick}
            className="rounded-lg border-emerald-500 text-emerald-600 hover:bg-emerald-50/20 hover:border-emerald-600 flex items-center"
          >
            Xuất Excel
          </Button>
        )}
        {onAddClick && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAddClick}
            className="rounded-lg bg-[#1f5ca9] hover:bg-[#1a4e8f] flex items-center"
          >
            {addText}
          </Button>
        )}
      </Space>
    </div>
  );
};

export default SearchToolbar;