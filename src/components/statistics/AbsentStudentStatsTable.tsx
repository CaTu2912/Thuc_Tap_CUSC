import type { ColumnsType } from 'antd/es/table';
import type { LongAbsentStudent } from '@/types/Statistic';

export const absentStudentColumns: ColumnsType<LongAbsentStudent> = [
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
    title: 'Quét ra cuối',
    dataIndex: 'lastAccessTime',
    key: 'lastAccessTime',
    render: (text: string) => <span className="text-xs text-zinc-400">{text}</span>,
  },
  {
    title: 'Số ngày vắng',
    dataIndex: 'daysAbsent',
    key: 'daysAbsent',
    align: 'center',
    render: (value: number) => (
      <span className="text-rose-500 font-black text-xs">{value} ngày</span>
    ),
  },
];
