import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import type { SinhVienRaVaoNhieuNhat } from '@/types/ThongKe';

/**
 * Định nghĩa cấu trúc các cột cho bảng thống kê sinh viên ra vào nhiều nhất (cotBangSinhVienRaVaoNhieu).
 * Chức năng: Thiết lập tiêu đề cột và cách hiển thị thông tin sinh viên ra vào nhiều nhất (MSSV, Họ tên, Khu KTX, Tên phòng và Tần suất ra vào).
 */
export const cotBangSinhVienRaVaoNhieu: ColumnsType<SinhVienRaVaoNhieuNhat> = [
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
    title: 'Khu',
    dataIndex: 'tenKtx',
    key: 'tenKtx',
    render: (vanBan: string) => {
      return <span className="text-xs text-zinc-500">{vanBan}</span>;
    },
  },
  {
    title: 'Phòng',
    dataIndex: 'tenPhong',
    key: 'tenPhong',
    render: (vanBan: string) => {
      return <span className="text-xs text-zinc-500">{vanBan}</span>;
    },
  },
  {
    title: 'Tần suất',
    dataIndex: 'soLuotRaVao',
    key: 'soLuotRaVao',
    align: 'center',
    render: (giaTri: number) => {
      return (
        <Tag color="blue" className="font-bold text-xs">
          {giaTri} lượt
        </Tag>
      );
    },
  },
];
