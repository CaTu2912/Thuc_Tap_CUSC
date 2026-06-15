'use client';

import React from 'react';
import { Table, Button, Badge, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Alert } from '../../types/Alert';
import { CheckOutlined } from '@ant-design/icons';
import { useDashboardStore } from '../../store/dashboardStore';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';

interface LatestAlertTableProps {
  data: Alert[];
  loading?: boolean;
}

export const LatestAlertTable: React.FC<LatestAlertTableProps> = ({ data, loading = false }) => {
  const resolveAlert = useDashboardStore((state) => state.resolveAlert);
  const router = useRouter();

  const columns: ColumnsType<Alert> = [
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
      title: 'Nội dung cảnh báo',
      dataIndex: 'message',
      key: 'message',
      width: 240,
      render: (text, record) => (
        <div className="flex flex-col leading-tight font-sans max-w-[240px]">
          <span className={`text-[11px] font-semibold ${record.severity === 'CRITICAL' ? 'text-rose-600' : record.severity === 'WARNING' ? 'text-amber-600' : 'text-blue-600'}`}>
            {text}
          </span>
          <span className="text-[10px] text-zinc-400 mt-0.5">Vị trí: {record.location}</span>
        </div>
      ),
    },
    {
      title: 'Mức độ',
      dataIndex: 'severity',
      key: 'severity',
      width: 90,
      render: (severity: string) => {
        let status: 'error' | 'warning' | 'processing' = 'processing';
        let text = 'Thông tin';
        if (severity === 'CRITICAL') {
          status = 'error';
          text = 'Khẩn cấp';
        } else if (severity === 'WARNING') {
          status = 'warning';
          text = 'Cảnh báo';
        }
        return <Badge status={status} text={<span className="text-[11px] text-zinc-600">{text}</span>} />;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'resolved',
      key: 'resolved',
      width: 90,
      render: (resolved: boolean) => (
        <Badge
          status={resolved ? 'success' : 'default'}
          text={<span className="text-[11px] text-zinc-600">{resolved ? 'Đã xử lý' : 'Chưa xử lý'}</span>}
        />
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          {!record.resolved ? (
            <Button
              type="primary"
              size="small"
              icon={<CheckOutlined className="text-[9px]" />}
              onClick={() => resolveAlert(record.id)}
              className="bg-emerald-500 hover:bg-emerald-600 border-none text-[10px] h-6 px-2 rounded flex items-center gap-1"
            >
              Xử lý
            </Button>
          ) : (
            <span className="text-[11px] text-zinc-400 font-sans">Đã xong</span>
          )}
        </Space>
      ),
    },
  ];

  const activeAlertsCount = data.filter((a) => !a.resolved).length;

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center h-12">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-zinc-800">Cảnh báo An ninh hôm nay</span>
          {activeAlertsCount > 0 && (
            <Badge count={activeAlertsCount} style={{ backgroundColor: '#ef4444' }} />
          )}
        </div>
        <Button
          type="link"
          size="small"
          onClick={() => router.push(ROUTES.ALERTS)}
          className="text-[#00afef] hover:text-[#1f5ca9] p-0 font-semibold text-xs font-sans"
        >
          Xem tất cả
        </Button>
      </div>
      <Table<Alert>
        className="flex-1 flex flex-col [&_.ant-table]:flex-1 [&_.ant-table]:flex [&_.ant-table]:flex-col [&_.ant-table-container]:flex-1 [&_.ant-table-container]:flex [&_.ant-table-container]:flex-col [&_.ant-table-content]:flex-1 [&_.ant-table-content]:flex [&_.ant-table-content]:flex-col [&_.ant-table-content]:justify-between"
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={false}
        size="small"
        scroll={{ x: 'max-content' }}
        sticky
      />
    </div>
  );
};

export default LatestAlertTable;
