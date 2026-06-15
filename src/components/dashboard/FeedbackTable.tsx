'use client';

import React from 'react';
import { Table, Typography, Space, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Feedback } from '../../types/Feedback';
import StatusTag from '../common/StatusTag';
import { CheckOutlined } from '@ant-design/icons';
import { feedbackService } from '../../services/feedback.service';
import { useAuthStore } from '../../store/authStore';
import { useQueryClient } from '@tanstack/react-query';

const { Text } = Typography;

interface FeedbackTableProps {
  data: Feedback[];
  loading?: boolean;
}

export const FeedbackTable: React.FC<FeedbackTableProps> = ({ data, loading = false }) => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const handleResolve = async (id: string) => {
    try {
      await feedbackService.resolveFeedback(id, user?.fullName || 'Nguyễn Văn Trỗi');
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
    } catch (err) {
      console.error(err);
    }
  };

  const columns: ColumnsType<Feedback> = [
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => <span className="text-zinc-500 text-xs">{text}</span>,
    },
    {
      title: 'Sinh viên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, record) => (
        <div className="flex flex-col">
          <Text className="font-semibold text-xs text-zinc-800">{record.fullName}</Text>
          <Text className="text-[10px] text-zinc-400">{record.mssv}</Text>
        </div>
      ),
    },
    {
      title: 'Nội dung phản hồi',
      dataIndex: 'content',
      key: 'content',
      render: (text) => <span className="text-xs text-zinc-600 block max-w-xs truncate">{text}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'PENDING' ? (
            <Button
              type="primary"
              size="small"
              icon={<CheckOutlined />}
              onClick={() => handleResolve(record.id)}
              className="bg-[#1f5ca9] hover:bg-[#1a4e8f] border-none text-[10px] rounded flex items-center"
            >
              Giải quyết
            </Button>
          ) : (
            <span className="text-xs text-zinc-400">Đã giải quyết</span>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center">
        <span className="font-bold text-sm text-zinc-800">Phản hồi sai thông tin Ra/Vào (MyCTU)</span>
      </div>
      <Table<Feedback>
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={false}
        size="small"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default FeedbackTable;
