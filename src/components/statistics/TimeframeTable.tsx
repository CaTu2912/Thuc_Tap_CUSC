'use client';

import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { AccessStatsByDormitory, AccessStatsByTime } from '@/types/Statistic';

type TimeframeRow = AccessStatsByTime | AccessStatsByDormitory;

interface TimeframeTableProps {
  data: TimeframeRow[];
  loading: boolean;
  isDormitory: boolean;
}

const getRowLabel = (record: TimeframeRow) =>
  'dormitoryName' in record ? record.dormitoryName : record.label;

export const TimeframeTable: React.FC<TimeframeTableProps> = ({
  data,
  loading,
  isDormitory,
}) => {
  const columns: ColumnsType<TimeframeRow> = [
    {
      title: isDormitory ? 'Khu KTX' : 'Thời gian',
      key: 'label',
      render: (_, record) => (
        <span className="font-bold text-xs text-zinc-700">{getRowLabel(record)}</span>
      ),
    },
    {
      title: 'Lượt vào',
      dataIndex: 'inCount',
      key: 'inCount',
      render: (value: number) => (
        <span className="text-xs text-emerald-500 font-semibold">{value.toLocaleString()} lượt</span>
      ),
    },
    {
      title: 'Lượt ra',
      dataIndex: 'outCount',
      key: 'outCount',
      render: (value: number) => (
        <span className="text-xs text-[#1f5ca9] font-semibold">{value.toLocaleString()} lượt</span>
      ),
    },
    {
      title: 'Tổng lượt',
      key: 'total',
      render: (_, record) => (
        <span className="text-xs text-zinc-800 font-bold">
          {(record.inCount + record.outCount).toLocaleString()} lượt
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden h-full">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
        <span className="font-bold text-sm text-zinc-800">Bảng chi tiết số liệu</span>
      </div>
      <Table<TimeframeRow>
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={getRowLabel}
        pagination={false}
        size="middle"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default TimeframeTable;
