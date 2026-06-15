'use client';

import React from 'react';
import { Table, Avatar, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Student } from '../../types/Student';

const { Text } = Typography;

interface AbsentStudentTableProps {
  data: Student[];
  loading?: boolean;
}

export const AbsentStudentTable: React.FC<AbsentStudentTableProps> = ({ data, loading = false }) => {
  const columns: ColumnsType<Student> = [
    {
      title: 'Sinh viên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, record) => (
        <Space size={8}>
          <Avatar src={record.avatarUrl} size="small" />
          <div className="flex flex-col">
            <Text className="font-semibold text-xs text-zinc-800">{record.fullName}</Text>
            <Text className="text-[10px] text-zinc-400">{record.mssv}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Khu / Phòng',
      key: 'location',
      render: (_, record) => (
        <span className="text-xs text-zinc-500">
          {record.dormitoryName} - {record.roomName}
        </span>
      ),
    },
    {
      title: 'Thời gian đi ra',
      dataIndex: 'lastAccessTime',
      key: 'lastAccessTime',
      render: (text) => <span className="text-xs text-zinc-600 font-medium">{text}</span>,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
        <span className="font-bold text-sm text-zinc-800">Sinh viên đã ra ngoài (Chưa quay về)</span>
      </div>
      <Table<Student>
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="mssv"
        pagination={{ pageSize: 5 }}
        size="small"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default AbsentStudentTable;
