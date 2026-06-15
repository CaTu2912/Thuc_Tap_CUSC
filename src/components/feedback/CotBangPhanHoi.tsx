import type { ColumnsType } from 'antd/es/table';
import { Button, Space, Tooltip } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import NhanTrangThai from '@/components/common/NhanTrangThai';
import XacNhanXoa from '@/components/common/XacNhanXoa';
import type { PhanHoi } from '@/types/PhanHoi';

// Định nghĩa giao diện cho các hàm xử lý sự kiện trên cột bảng phản hồi
interface TuyChonCotBangPhanHoi {
  // Hàm xử lý khi nhấn giải quyết phản hồi
  onGiaiQuyet: (id: string) => void;

  // Hàm xử lý khi nhấn xóa phản hồi
  onXoa: (id: string) => void;
}

/**
 * Hàm lấy cấu trúc các cột cho bảng phản hồi (layCotBangPhanHoi).
 * Chức năng: Định nghĩa tiêu đề cột, cách hiển thị dữ liệu và thao tác cho từng dòng trong bảng phản hồi.
 */
export const layCotBangPhanHoi = ({
  onGiaiQuyet,
  onXoa,
}: TuyChonCotBangPhanHoi): ColumnsType<PhanHoi> => [
  {
    title: 'Mã số sinh viên',
    dataIndex: 'mssv',
    key: 'mssv',
    render: (vanBan) => {
      return <span className="font-mono text-xs font-semibold text-zinc-700">{vanBan}</span>;
    },
  },
  {
    title: 'Họ và tên',
    dataIndex: 'hoVaTen',
    key: 'hoVaTen',
    render: (vanBan) => {
      return <span className="font-bold text-xs text-zinc-800">{vanBan}</span>;
    },
  },
  {
    title: 'Nội dung phản hồi từ MyCTU',
    dataIndex: 'noiDung',
    key: 'noiDung',
    render: (vanBan) => {
      return <span className="text-xs text-zinc-600 block max-w-md">{vanBan}</span>;
    },
  },
  {
    title: 'Thời gian gửi',
    dataIndex: 'thoiGian',
    key: 'thoiGian',
    render: (vanBan) => {
      return <span className="text-xs text-zinc-400">{vanBan}</span>;
    },
  },
  {
    title: 'Trạng thái xử lý',
    dataIndex: 'trangThai',
    key: 'trangThai',
    render: (trangThai) => {
      return <NhanTrangThai trangThai={trangThai} />;
    },
  },
  {
    title: 'Xử lý bởi / Thời gian',
    key: 'thongTinGiaiQuyet',
    render: (_, record) => {
      if (record.trangThai === 'PENDING') {
        return <span className="text-xs text-zinc-400 font-light italic">Chưa xử lý</span>;
      }
      return (
        <div className="flex flex-col">
          <span className="text-xs text-zinc-700 font-semibold">{record.nguoiGiaiQuyet}</span>
          <span className="text-[10px] text-zinc-400">{record.thoiGianGiaiQuyet}</span>
        </div>
      );
    },
  },
  {
    title: 'Thao tác',
    key: 'hanhDong',
    width: 120,
    align: 'center',
    render: (_, record) => {
      return (
        <Space size={8}>
          {record.trangThai === 'PENDING' && (
            <Tooltip title="Đánh dấu đã giải quyết">
              <Button
                type="text"
                icon={<CheckOutlined />}
                onClick={() => {
                  return onGiaiQuyet(record.id);
                }}
                className="text-emerald-500 hover:bg-emerald-50"
              />
            </Tooltip>
          )}
          <Tooltip title="Xóa phản hồi">
            <div>
              <XacNhanXoa khiXacNhan={() => {
                return onXoa(record.id);
              }}>
                <Button type="text" danger icon={<DeleteOutlined />} className="hover:bg-red-50" />
              </XacNhanXoa>
            </div>
          </Tooltip>
        </Space>
      );
    },
  },
];
