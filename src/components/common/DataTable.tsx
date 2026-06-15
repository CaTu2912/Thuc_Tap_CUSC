'use client';

import React from 'react';
import { Table, TableProps } from 'antd';

interface DataTableProps<T> extends Omit<TableProps<T>, 'loading'> {
  loading?: boolean;
}

export function DataTable<T extends object>({
  columns,
  dataSource,
  loading = false,
  rowKey = 'id',
  pagination = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total) => `Tổng số ${total} mục`,
  },
  className = '',
  ...rest
}: DataTableProps<T>) {
  return (
    <div className={`bg-white rounded-xl shadow-xs overflow-hidden border border-zinc-100 flex flex-col h-full ${className}`}>
      <Table<T>
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={rowKey}
        pagination={pagination}
        scroll={{ x: 'max-content' }}
        rowClassName={(_, index) => 
          index % 2 === 0 ? 'bg-white hover:bg-zinc-50/50' : 'bg-zinc-50/20 hover:bg-zinc-50/50'
        }
        style={{
          borderRadius: '12px',
        }}
        {...rest}
      />
    </div>
  );
}

export default DataTable;
