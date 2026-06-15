'use client';

import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface StatisticTableProps<T extends object> {
  title: string;
  dataSource: T[];
  rowKey: keyof T & string;
  loading: boolean;
  columns: ColumnsType<T>;
}

export function StatisticTable<T extends object>({
  title,
  dataSource,
  rowKey,
  loading,
  columns,
}: StatisticTableProps<T>) {
  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
        <span className="font-bold text-sm text-zinc-800">{title}</span>
      </div>
      <Table<T>
        dataSource={dataSource}
        loading={loading}
        rowKey={rowKey}
        pagination={false}
        size="small"
        columns={columns}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}

export default StatisticTable;
