import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import type { ThongKePhatHienNguoiLa } from '@/types/ThongKe';

/**
 * Định nghĩa cấu trúc các cột cho bảng thống kê phát hiện người lạ (cotBangNguoiLa).
 * Chức năng: Thiết lập tiêu đề cột và cách hiển thị thông tin phát hiện người lạ (ngày phát hiện, số lượt quét, danh sách vị trí camera ghi nhận).
 */
export const cotBangNguoiLa: ColumnsType<ThongKePhatHienNguoiLa> = [
  {
    title: 'Ngày phát hiện',
    dataIndex: 'ngay',
    key: 'ngay',
    render: (vanBan: string) => {
      return <span className="text-xs font-semibold text-zinc-600">{vanBan}</span>;
    },
  },
  {
    title: 'Số lượt quét',
    dataIndex: 'soLuong',
    key: 'soLuong',
    align: 'center',
    render: (giaTri: number) => {
      return <span className="text-amber-500 font-bold text-xs">{giaTri} người lạ</span>;
    },
  },
  {
    title: 'Khu vực phát hiện',
    dataIndex: 'cacViTri',
    key: 'cacViTri',
    render: (cacViTri: ThongKePhatHienNguoiLa['cacViTri']) => {
      return (
        <div className="flex flex-wrap gap-1">
          {cacViTri.map((viTri) => {
            return (
              <Tag key={viTri.ten} color="orange" className="text-[10px]">
                {viTri.ten} ({viTri.soLuong})
              </Tag>
            );
          })}
        </div>
      );
    },
  },
];
