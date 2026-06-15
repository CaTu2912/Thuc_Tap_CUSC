import type { ColumnsType } from 'antd/es/table';
import { Button, Space, Tooltip } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import StatusTag from '@/components/common/StatusTag';
import ConfirmDelete from '@/components/common/ConfirmDelete';
import type { Feedback } from '@/types/Feedback';

interface FeedbackColumnsOptions {
  onResolve: (id: string) => void;
  onDelete: (id: string) => void;
}

export const getFeedbackColumns = ({
  onResolve,
  onDelete,
}: FeedbackColumnsOptions): ColumnsType<Feedback> => [
  {
    title: 'Mã số sinh viên',
    dataIndex: 'mssv',
    key: 'mssv',
    render: (text) => <span className="font-mono text-xs font-semibold text-zinc-700">{text}</span>,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (text) => <span className="font-bold text-xs text-zinc-800">{text}</span>,
  },
  {
    title: 'Nội dung phản hồi từ MyCTU',
    dataIndex: 'content',
    key: 'content',
    render: (text) => <span className="text-xs text-zinc-600 block max-w-md">{text}</span>,
  },
  {
    title: 'Thời gian gửi',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (text) => <span className="text-xs text-zinc-400">{text}</span>,
  },
  {
    title: 'Trạng thái xử lý',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <StatusTag status={status} />,
  },
  {
    title: 'Xử lý bởi / Thời gian',
    key: 'resolvedInfo',
    render: (_, record) => {
      if (record.status === 'PENDING') {
        return <span className="text-xs text-zinc-400 font-light italic">Chưa xử lý</span>;
      }
      return (
        <div className="flex flex-col">
          <span className="text-xs text-zinc-700 font-semibold">{record.resolvedBy}</span>
          <span className="text-[10px] text-zinc-400">{record.resolvedAt}</span>
        </div>
      );
    },
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 120,
    align: 'center',
    render: (_, record) => (
      <Space size={8}>
        {record.status === 'PENDING' && (
          <Tooltip title="Đánh dấu đã giải quyết">
            <Button
              type="text"
              icon={<CheckOutlined />}
              onClick={() => onResolve(record.id)}
              className="text-emerald-500 hover:bg-emerald-50"
            />
          </Tooltip>
        )}
        <Tooltip title="Xóa phản hồi">
          <div>
            <ConfirmDelete onConfirm={() => onDelete(record.id)}>
              <Button type="text" danger icon={<DeleteOutlined />} className="hover:bg-red-50" />
            </ConfirmDelete>
          </div>
        </Tooltip>
      </Space>
    ),
  },
];
