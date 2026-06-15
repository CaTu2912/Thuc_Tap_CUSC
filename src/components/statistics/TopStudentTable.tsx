import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import type { TopAccessStudent } from '@/types/Statistic';

export const topStudentColumns: ColumnsType<TopAccessStudent> = [
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
    title: 'Khu',
    dataIndex: 'dormitoryName',
    key: 'dormitoryName',
    render: (text: string) => <span className="text-xs text-zinc-500">{text}</span>,
  },
  {
    title: 'Phòng',
    dataIndex: 'roomName',
    key: 'roomName',
    render: (text: string) => <span className="text-xs text-zinc-500">{text}</span>,
  },
  {
    title: 'Tần suất',
    dataIndex: 'accessCount',
    key: 'accessCount',
    align: 'center',
    render: (value: number) => (
      <Tag color="blue" className="font-bold text-xs">
        {value} lượt
      </Tag>
    ),
  },
];
