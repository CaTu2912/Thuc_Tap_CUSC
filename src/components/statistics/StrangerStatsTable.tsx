import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import type { StrangerDetectionStats } from '@/types/Statistic';

export const strangerStatsColumns: ColumnsType<StrangerDetectionStats> = [
  {
    title: 'Ngày phát hiện',
    dataIndex: 'date',
    key: 'date',
    render: (text: string) => <span className="text-xs font-semibold text-zinc-600">{text}</span>,
  },
  {
    title: 'Số lượt quét',
    dataIndex: 'count',
    key: 'count',
    align: 'center',
    render: (value: number) => (
      <span className="text-amber-500 font-bold text-xs">{value} người lạ</span>
    ),
  },
  {
    title: 'Khu vực phát hiện',
    dataIndex: 'locations',
    key: 'locations',
    render: (locations: StrangerDetectionStats['locations']) => (
      <div className="flex flex-wrap gap-1">
        {locations.map((location) => (
          <Tag key={location.name} color="orange" className="text-[10px]">
            {location.name} ({location.count})
          </Tag>
        ))}
      </div>
    ),
  },
];
