'use client';

import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ThongKeRaVaoTheoKtx, ThongKeRaVaoTheoThoiGian } from '@/types/ThongKe';

// Định nghĩa kiểu dữ liệu cho một dòng dữ liệu thống kê ra vào
type DongThongKe = ThongKeRaVaoTheoThoiGian | ThongKeRaVaoTheoKtx;

// Định nghĩa giao diện thuộc tính cho Component Bảng chi tiết lượt ra vào
interface ThuocTinhBangChiTietRaVao {
  // Mảng chứa các dòng dữ liệu thống kê
  duLieu: DongThongKe[];

  // Trạng thái đang tải dữ liệu
  dangTai: boolean;

  // Cờ xác định dữ liệu là thống kê theo khu nhà hay không
  laKtx: boolean;
}

/**
 * Hàm lấy nhãn hiển thị cho từng dòng thống kê (layNhanDong).
 * Chức năng: Kiểm tra thuộc tính để trả về tên khu ký túc xá hoặc nhãn thời gian tương ứng.
 */
const layNhanDong = (dong: DongThongKe): string => {
  return 'tenKtx' in dong ? dong.tenKtx : dong.nhan;
};

/**
 * Component Bảng chi tiết số liệu ra vào (BangChiTietRaVao).
 * Chức năng: Render bảng hiển thị chi tiết số lượt quét thẻ đi vào, đi ra và tổng lượt đi lại theo từng khu nhà hoặc theo khung giờ.
 */
export const BangChiTietRaVao: React.FC<ThuocTinhBangChiTietRaVao> = ({
  duLieu,
  dangTai,
  laKtx,
}) => {
  // Định nghĩa các cột cho bảng chi tiết số liệu
  const cotBang: ColumnsType<DongThongKe> = [
    {
      title: laKtx ? 'Khu KTX' : 'Thời gian',
      key: 'nhan',
      render: (_, record) => {
        return <span className="font-bold text-xs text-zinc-700">{layNhanDong(record)}</span>;
      },
    },
    {
      title: 'Lượt vào',
      dataIndex: 'luotVao',
      key: 'luotVao',
      render: (giaTri: number) => {
        return <span className="text-xs text-emerald-500 font-semibold">{giaTri.toLocaleString()} lượt</span>;
      },
    },
    {
      title: 'Lượt ra',
      dataIndex: 'luotRa',
      key: 'luotRa',
      render: (giaTri: number) => {
        return <span className="text-xs text-[#1f5ca9] font-semibold">{giaTri.toLocaleString()} lượt</span>;
      },
    },
    {
      title: 'Tổng lượt',
      key: 'tongCong',
      render: (_, record) => {
        return (
          <span className="text-xs text-zinc-800 font-bold">
            {(record.luotVao + record.luotRa).toLocaleString()} lượt
          </span>
        );
      },
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden h-full">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
        <span className="font-bold text-sm text-zinc-800">Bảng chi tiết số liệu</span>
      </div>
      <Table<DongThongKe>
        columns={cotBang}
        dataSource={duLieu}
        loading={dangTai}
        rowKey={layNhanDong}
        pagination={false}
        size="middle"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default BangChiTietRaVao;
