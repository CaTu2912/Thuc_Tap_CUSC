import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import type { BannedStudentStats } from '@/types/Statistic';

export const bannedStudentStatsColumns: ColumnsType<BannedStudentStats> = [
  {
    title: 'Mã số sinh viên',
    dataIndex: 'mssv',
    key: 'mssv',
    render: (text: string) => <span className="font-mono text-xs font-semibold">{text}</span>,
  },
  {
    title: 'Họ tên',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (text: string) => <span className="font-bold text-xs">{text}</span>,
  },
  {
    title: 'Lý do kỷ luật',
    dataIndex: 'reason',
    key: 'reason',
    render: (text: string) => (
      <span className="text-xs text-zinc-500 block max-w-xs truncate">{text}</span>
    ),
  },
  {
    title: 'Thời hạn',
    key: 'duration',
    render: (_, record) => (
      <span className="text-xs text-zinc-500">
        Từ {record.bannedDate} đến {record.expiryDate}
      </span>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: BannedStudentStats['status']) => (
      <Tag color={status === 'ACTIVE' ? 'error' : 'default'} className="rounded-full">
        {status === 'ACTIVE' ? 'Hạn chế' : 'Hết hạn'}
      </Tag>
    ),
  },
];
