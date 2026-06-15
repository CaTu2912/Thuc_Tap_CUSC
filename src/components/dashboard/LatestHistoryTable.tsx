'use client';

import React from 'react';
import { Table, Avatar, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AccessHistory } from '../../types/History';
import StatusTag from '../common/StatusTag';

const { Text } = Typography;

interface LatestHistoryTableProps {
  data: AccessHistory[];
  loading?: boolean;
}

export const LatestHistoryTable: React.FC<LatestHistoryTableProps> = ({ data, loading = false }) => {
  const columns: ColumnsType<AccessHistory> = [
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 85,
      render: (text) => {
        const parts = text.split(' ');
        const dateStr = parts[0] ? parts[0].substring(5) : ''; // MM-DD
        const timeStr = parts[1] || ''; // HH:mm:ss
        return (
          <div className="flex flex-col text-[11px] leading-tight font-sans">
            <span className="font-semibold text-zinc-700">{timeStr}</span>
            <span className="text-zinc-400 text-[10px]">{dateStr}</span>
          </div>
        );
      },
    },
    {
      title: 'Sinh viên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 145,
      render: (_, record) => (
        <Space size={6}>
          <Avatar src={record.avatarUrl} size="small" />
          <div className="flex flex-col leading-tight font-sans">
            <Text className="font-semibold text-[11px] text-zinc-800 leading-tight">{record.fullName}</Text>
            <Text className="text-[10px] text-zinc-400 leading-none">{record.mssv}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: 65,
      render: (type) => <StatusTag status={type} />,
    },
    {
      title: 'Vị trí',
      key: 'location',
      width: 90,
      render: (_, record) => (
        <div className="flex flex-col leading-tight font-sans">
          <span className="text-[11px] font-medium text-zinc-700">{record.dormitoryName}</span>
          <span className="text-[10px] text-zinc-400">{record.roomName}</span>
        </div>
      ),
    },
    {
      title: 'Thiết bị',
      dataIndex: 'device',
      key: 'device',
      width: 95,
      responsive: ['xl'],
      render: (text) => <span className="text-[11px] text-zinc-500 truncate block max-w-[95px]" title={text}>{text}</span>,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
        <span className="font-bold text-sm text-zinc-800">Lịch sử Ra/Vào mới nhất</span>
      </div>
      <Table<AccessHistory>
        className="flex-1 flex flex-col [&_.ant-table]:flex-1 [&_.ant-table]:flex [&_.ant-table]:flex-col [&_.ant-table-container]:flex-1 [&_.ant-table-container]:flex [&_.ant-table-container]:flex-col [&_.ant-table-content]:flex-1 [&_.ant-table-content]:flex [&_.ant-table-content]:flex-col [&_.ant-table-content]:justify-between"
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default LatestHistoryTable;
