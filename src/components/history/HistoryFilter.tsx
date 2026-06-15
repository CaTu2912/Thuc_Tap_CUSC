'use client';

import React from 'react';
import { Input, Select, DatePicker, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined, FileExcelOutlined } from '@ant-design/icons';
import { useHistoryStore } from '../../store/historyStore';
import { DORMITORY_OPTIONS } from '../../constants';
import FilterCard from '../common/FilterCard';
import dayjs from 'dayjs';

interface HistoryFilterProps {
  onSearch: () => void;
  onExport: () => void;
}

export const HistoryFilter: React.FC<HistoryFilterProps> = ({ onSearch, onExport }) => {
  const { filters, setFilters, resetFilters } = useHistoryStore();

  const handleClear = () => {
    resetFilters();
    setTimeout(onSearch, 50);
  };

  return (
    <FilterCard
      title="Bộ lọc tìm kiếm lịch sử"
      onClear={handleClear}
      onFilter={onSearch}
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-zinc-500">Từ ngày</label>
        <DatePicker
          placeholder="Chọn ngày bắt đầu"
          value={filters.fromDate ? dayjs(filters.fromDate) : null}
          onChange={(date) => setFilters({ fromDate: date ? date.format('YYYY-MM-DD') : '' })}
          className="w-full rounded-md"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-zinc-500">Đến ngày</label>
        <DatePicker
          placeholder="Chọn ngày kết thúc"
          value={filters.toDate ? dayjs(filters.toDate) : null}
          onChange={(date) => setFilters({ toDate: date ? date.format('YYYY-MM-DD') : '' })}
          className="w-full rounded-md"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-zinc-500">Mã số sinh viên (MSSV)</label>
        <Input
          placeholder="Nhập mã số sinh viên"
          value={filters.mssv}
          onChange={(e) => setFilters({ mssv: e.target.value })}
          className="rounded-md"
          allowClear
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-zinc-500">Họ tên sinh viên</label>
        <Input
          placeholder="Nhập họ tên"
          value={filters.fullName}
          onChange={(e) => setFilters({ fullName: e.target.value })}
          className="rounded-md"
          allowClear
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-zinc-500">Khu ký túc xá</label>
        <Select
          placeholder="Tất cả các khu"
          value={filters.dormitoryId || undefined}
          onChange={(val) => setFilters({ dormitoryId: val || '' })}
          className="w-full rounded-md"
          allowClear
          options={DORMITORY_OPTIONS}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-zinc-500">Trạng thái (Vào/Ra)</label>
        <Select
          placeholder="Tất cả"
          value={filters.type}
          onChange={(val) => setFilters({ type: val })}
          className="w-full rounded-md"
          options={[
            { value: 'ALL', label: 'Tất cả' },
            { value: 'IN', label: 'Lượt vào' },
            { value: 'OUT', label: 'Lượt ra' },
          ]}
        />
      </div>
      
      <div className="flex flex-col gap-1.5 justify-end col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
        <Button
          icon={<FileExcelOutlined />}
          onClick={onExport}
          className="rounded-md border-emerald-500 text-emerald-600 hover:bg-emerald-50/20 hover:border-emerald-600 flex items-center justify-center font-medium w-full md:w-fit self-end"
        >
          Xuất Excel lịch sử
        </Button>
      </div>
    </FilterCard>
  );
};

export default HistoryFilter;