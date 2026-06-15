'use client';

import React from 'react';
import { Table, Avatar, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SinhVien } from '../../types/SinhVien';

const { Text } = Typography;

// Giao diện thuộc tính cho Bảng sinh viên đang có mặt tại trang chủ
interface ThuocTinhBangSinhVienCoMat {
  // Mảng danh sách sinh viên đang có mặt tại KTX
  duLieu: SinhVien[];

  // Trạng thái đang tải dữ liệu (tùy chọn)
  dangTai?: boolean;
}

/**
 * Component Bảng hiển thị sinh viên đang có mặt (BangSinhVienCoMat).
 * Chức năng: Thể hiện thông tin chi tiết của sinh viên hiện đang ở trong ký túc xá (quét thẻ đi vào gần nhất) kèm thời gian đi vào.
 */
export const BangSinhVienCoMat: React.FC<ThuocTinhBangSinhVienCoMat> = ({ duLieu, dangTai = false }) => {
  // Định nghĩa các cột cho bảng hiển thị sinh viên có mặt
  const cacCot: ColumnsType<SinhVien> = [
    {
      title: 'Sinh viên',
      dataIndex: 'hoVaTen',
      key: 'hoVaTen',
      render: (_, record) => {
        return (
          <Space size={8}>
            <Avatar src={record.duongDanAnhDaiDien} size="small" />
            <div className="flex flex-col">
              <Text className="font-semibold text-xs text-zinc-800">{record.hoVaTen}</Text>
              <Text className="text-[10px] text-zinc-400">{record.mssv}</Text>
            </div>
          </Space>
        );
      },
    },
    {
      title: 'Khu / Phòng',
      key: 'location',
      render: (_, record) => {
        return (
          <span className="text-xs text-zinc-500">
            {record.tenKtx} - {record.tenPhong}
          </span>
        );
      },
    },
    {
      title: 'Thời gian đi vào',
      dataIndex: 'thoiGianRaVaoCuoi',
      key: 'thoiGianRaVaoCuoi',
      render: (text) => {
        return <span className="text-xs text-zinc-600 font-medium">{text}</span>;
      },
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
        <span className="font-bold text-sm text-zinc-800">Sinh viên đang có mặt tại KTX</span>
      </div>
      <Table<SinhVien>
        columns={cacCot}
        dataSource={duLieu}
        loading={dangTai}
        rowKey="mssv"
        pagination={{ pageSize: 5 }}
        size="small"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default BangSinhVienCoMat;
