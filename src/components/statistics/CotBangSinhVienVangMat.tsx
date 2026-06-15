import type { ColumnsType } from 'antd/es/table';
import type { SinhVienVangMatLauNgay } from '@/types/ThongKe';

/**
 * Định nghĩa cấu trúc các cột cho bảng thống kê sinh viên vắng mặt dài ngày (cotBangSinhVienVangMat).
 * Chức năng: Thiết lập tiêu đề cột và cách định dạng hiển thị thông tin sinh viên vắng mặt (MSSV, Họ tên, thời gian quét ra cuối và số ngày vắng mặt).
 */
export const cotBangSinhVienVangMat: ColumnsType<SinhVienVangMatLauNgay> = [
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
    title: 'Quét ra cuối',
    dataIndex: 'thoiGianRaVaoCuoi',
    key: 'thoiGianRaVaoCuoi',
    render: (vanBan: string) => {
      return <span className="text-xs text-zinc-400">{vanBan}</span>;
    },
  },
  {
    title: 'Số ngày vắng',
    dataIndex: 'soNgayVangMat',
    key: 'soNgayVangMat',
    align: 'center',
    render: (giaTri: number) => {
      return <span className="text-rose-500 font-black text-xs">{giaTri} ngày</span>;
    },
  },
];
