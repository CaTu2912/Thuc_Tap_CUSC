'use client';

import React from 'react';
import { Table, Typography, Space, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PhanHoi } from '../../types/PhanHoi';
import NhanTrangThai from '../common/NhanTrangThai';
import { CheckOutlined } from '@ant-design/icons';
import { dichVuPhanHoi } from '../../services/phanHoi.service';
import { dungKhoXacThuc } from '../../store/khoXacThuc';
import { useQueryClient } from '@tanstack/react-query';

const { Text } = Typography;

// Giao diện thuộc tính cho Bảng phản hồi tại dashboard
interface ThuocTinhBangPhanHoiDashboard {
  // Mảng danh sách phản hồi từ sinh viên
  duLieu: PhanHoi[];

  // Trạng thái đang tải dữ liệu (tùy chọn)
  dangTai?: boolean;
}

/**
 * Component Bảng phản hồi nhanh tại dashboard (BangPhanHoiDashboard).
 * Chức năng: Thể hiện danh sách phản hồi sai lệch lịch sử quét thẻ, cho phép trực ban xử lý nhanh ngay tại trang chủ.
 */
export const BangPhanHoiDashboard: React.FC<ThuocTinhBangPhanHoiDashboard> = ({ duLieu, dangTai = false }) => {
  const nguoiDung = dungKhoXacThuc((trangThai) => trangThai.nguoiDung);
  const boQuanLyTruyVan = useQueryClient();

  // Hàm xử lý khi xác nhận giải quyết phản hồi sai lệch thông tin
  const xuLyGiaiQuyet = async (id: string) => {
    try {
      await dichVuPhanHoi.giaiQuyetPhanHoi(id, nguoiDung?.hoVaTen || 'Nguyễn Văn Trỗi');
      // Yêu cầu làm mới cache trang chủ và trang danh sách phản hồi
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['dashboardData'] });
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['feedbacks'] });
    } catch (loi) {
      console.error(loi);
    }
  };

  // Cấu hình danh sách các cột cho bảng phản hồi
  const cacCot: ColumnsType<PhanHoi> = [
    {
      title: 'Thời gian',
      dataIndex: 'thoiGian',
      key: 'thoiGian',
      render: (text) => {
        return <span className="text-zinc-500 text-xs">{text}</span>;
      },
    },
    {
      title: 'Sinh viên',
      dataIndex: 'hoVaTen',
      key: 'hoVaTen',
      render: (_, record) => {
        return (
          <div className="flex flex-col">
            <Text className="font-semibold text-xs text-zinc-800">{record.hoVaTen}</Text>
            <Text className="text-[10px] text-zinc-400">{record.mssv}</Text>
          </div>
        );
      },
    },
    {
      title: 'Nội dung phản hồi',
      dataIndex: 'noiDung',
      key: 'noiDung',
      render: (text) => {
        return <span className="text-xs text-zinc-600 block max-w-xs truncate">{text}</span>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai) => {
        return <NhanTrangThai trangThai={trangThai} />;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            {record.trangThai === 'PENDING' ? (
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => {
                  return xuLyGiaiQuyet(record.id);
                }}
                className="bg-[#1f5ca9] hover:bg-[#1a4e8f] border-none text-[10px] rounded flex items-center"
              >
                Giải quyết
              </Button>
            ) : (
              <span className="text-xs text-zinc-400">Đã giải quyết</span>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center">
        <span className="font-bold text-sm text-zinc-800">Phản hồi sai thông tin Ra/Vào (MyCTU)</span>
      </div>
      <Table<PhanHoi>
        columns={cacCot}
        dataSource={duLieu}
        loading={dangTai}
        rowKey="id"
        pagination={false}
        size="small"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default BangPhanHoiDashboard;
