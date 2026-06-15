'use client';

import React from 'react';
import { Space, Avatar, Button, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { AccessHistory } from '../../types/History';
import DataTable from '../common/DataTable';
import StatusTag from '../common/StatusTag';
import ConfirmDelete from '../common/ConfirmDelete';
import { useHistoryStore } from '../../store/historyStore';

interface HistoryTableProps {
  data: AccessHistory[];
  loading?: boolean;
  onDelete: (id: string) => void;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ data, loading = false, onDelete }) => {
  const { setSelectedHistory, setDetailDrawerOpen } = useHistoryStore();

  const handleViewDetails = (record: AccessHistory) => {
    setSelectedHistory(record);
    setDetailDrawerOpen(true);
  };

  const columns: ColumnsType<AccessHistory> = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      align: 'center',
      render: (_, __, index) => <span className="font-semibold text-xs">{index + 1}</span>,
    },
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => <span className="text-zinc-600 font-medium text-xs">{text}</span>,
    },
    {
      title: 'Ảnh chụp',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      render: (url) => <Avatar src={url} shape="square" size={36} />,
    },
    {
      title: 'Mã số sinh viên',
      dataIndex: 'mssv',
      key: 'mssv',
      render: (text) => <span className="font-mono text-zinc-700 text-xs">{text}</span>,
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <span className="font-bold text-zinc-800 text-xs">{text}</span>,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <StatusTag status={type} />,
    },
    {
      title: 'KTX',
      dataIndex: 'dormitoryName',
      key: 'dormitoryName',
      render: (text) => <span className="text-zinc-500 text-xs">{text}</span>,
    },
    {
      title: 'Phòng',
      dataIndex: 'roomName',
      key: 'roomName',
      render: (text) => <span className="text-zinc-500 text-xs">{text}</span>,
    },
    {
      title: 'Thiết bị',
      dataIndex: 'device',
      key: 'device',
      render: (text) => <span className="text-zinc-500 text-xs">{text}</span>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Space size={8}>
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
              className="text-[#1f5ca9] hover:bg-sky-50"
            />
          </Tooltip>
          <Tooltip title="Xóa lịch sử">
            <div>
              <ConfirmDelete onConfirm={() => onDelete(record.id)}>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  className="hover:bg-red-50"
                />
              </ConfirmDelete>
            </div>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <DataTable<AccessHistory>
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
    />
  );
};

export default HistoryTable;
