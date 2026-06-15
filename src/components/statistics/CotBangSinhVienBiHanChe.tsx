import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import type { ThongKeSinhVienBiHanChe } from '@/types/ThongKe';

/**
 * Định nghĩa cấu trúc các cột cho bảng thống kê sinh viên bị hạn chế ra vào (cotBangSinhVienBiHanChe).
 * Chức năng: Thiết lập tiêu đề cột và cách hiển thị thông tin sinh viên bị hạn chế (MSSV, Họ tên, lý do kỷ luật, thời gian áp dụng và trạng thái).
 */
export const cotBangSinhVienBiHanChe: ColumnsType<ThongKeSinhVienBiHanChe> = [
  {
    title: 'Mã số sinh viên',
    dataIndex: 'mssv',
    key: 'mssv',
    render: (vanBan: string) => {
      return <span className="font-mono text-xs font-semibold">{vanBan}</span>;
    },
  },
  {
    title: 'Họ tên',
    dataIndex: 'hoVaTen',
    key: 'hoVaTen',
    render: (vanBan: string) => {
      return <span className="font-bold text-xs">{vanBan}</span>;
    },
  },
  {
    title: 'Lý do kỷ luật',
    dataIndex: 'lyDo',
    key: 'lyDo',
    render: (vanBan: string) => {
      return <span className="text-xs text-zinc-500 block max-w-xs truncate">{vanBan}</span>;
    },
  },
  {
    title: 'Thời hạn',
    key: 'thoiHan',
    render: (_, record) => {
      return (
        <span className="text-xs text-zinc-500">
          Từ {record.ngayHanChe} đến {record.ngayHetHan}
        </span>
      );
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangThai',
    key: 'trangThai',
    render: (trangThai: ThongKeSinhVienBiHanChe['trangThai']) => {
      return (
        <Tag color={trangThai === 'ACTIVE' ? 'error' : 'default'} className="rounded-full">
          {trangThai === 'ACTIVE' ? 'Hạn chế' : 'Hết hạn'}
        </Tag>
      );
    },
  },
];
