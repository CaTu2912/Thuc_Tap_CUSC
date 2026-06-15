'use client';

import React from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { LichSuRaVao } from '../../types/LichSuRaVao';
import { useRouter } from 'next/navigation';
import { DUONG_DAN } from '@/constants';

// Giao diện thuộc tính cho Bảng lịch sử ra vào mới nhất tại trang chủ
interface ThuocTinhBangLichSuMoiNhat {
  // Mảng danh sách các bản ghi lịch sử ra vào
  duLieu: LichSuRaVao[];

  // Trạng thái đang tải dữ liệu (tùy chọn)
  dangTai?: boolean;
}

/**
 * Component Bảng lịch sử ra vào mới nhất tại dashboard (BangLichSuMoiNhat).
 * Chức năng: Thể hiện danh sách quét thẻ ra vào KTX gần nhất của sinh viên, kèm hình ảnh, hướng đi và vị trí thiết bị.
 */
export const BangLichSuMoiNhat: React.FC<ThuocTinhBangLichSuMoiNhat> = ({ duLieu, dangTai = false }) => {
  const boChuyenHuong = useRouter();

  // Cấu hình các cột cho bảng lịch sử khớp với ảnh chụp
  const cacCot: ColumnsType<LichSuRaVao> = [
    {
      title: 'Thời gian',
      dataIndex: 'thoiGian',
      key: 'thoiGian',
      width: 90,
      render: (text) => {
        return <span className="font-sans text-[11px] text-zinc-500 font-medium">{text}</span>;
      },
    },
    {
      title: 'MSSV',
      dataIndex: 'mssv',
      key: 'mssv',
      width: 90,
      render: (text) => {
        return <span className="font-mono text-[11px] text-zinc-700 font-bold">{text}</span>;
      },
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoVaTen',
      key: 'hoVaTen',
      width: 140,
      render: (text) => {
        return <span className="font-sans text-[11px] text-zinc-800 font-semibold">{text}</span>;
      },
    },
    {
      title: 'Khu KTX',
      dataIndex: 'tenKtx',
      key: 'tenKtx',
      width: 90,
      render: (text) => {
        return <span className="font-sans text-[11px] text-zinc-500 font-medium">{text}</span>;
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'loai',
      key: 'loai',
      width: 90,
      align: 'center',
      render: (loai) => {
        const laVao = loai === 'IN';
        return (
          <Tag 
            color={laVao ? 'success' : 'error'} 
            className="rounded-full px-2.5 py-0.5 border-none text-[10px] font-bold w-12 text-center"
          >
            {laVao ? 'Vào' : 'Ra'}
          </Tag>
        );
      },
    },
    {
      title: 'Cổng',
      dataIndex: 'thietBi',
      key: 'thietBi',
      width: 110,
      render: (text) => {
        return <span className="font-sans text-[11px] text-zinc-500 font-medium">{text}</span>;
      },
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center h-12">
        <span className="font-bold text-sm text-zinc-800">LỊCH SỬ VÀO/RA MỚI NHẤT</span>
        <Button
          type="link"
          size="small"
          onClick={() => {
            return boChuyenHuong.push(DUONG_DAN.HISTORY);
          }}
          className="text-[#00afef] hover:text-[#1f5ca9] p-0 font-semibold text-xs font-sans"
        >
          Xem tất cả
        </Button>
      </div>
      <Table<LichSuRaVao>
        className="flex-1 flex flex-col [&_.ant-table]:flex-1 [&_.ant-table]:flex [&_.ant-table]:flex-col [&_.ant-table-container]:flex-1 [&_.ant-table-container]:flex [&_.ant-table-container]:flex-col [&_.ant-table-content]:flex-1 [&_.ant-table-content]:flex [&_.ant-table-content]:flex-col [&_.ant-table-content]:justify-between"
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

export default BangLichSuMoiNhat;
