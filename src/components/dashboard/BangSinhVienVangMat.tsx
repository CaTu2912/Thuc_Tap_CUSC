'use client';

import React from 'react';
import { Table, Avatar, Space, Typography, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SinhVien } from '../../types/SinhVien';

const { Text } = Typography;

import { useRouter } from 'next/navigation';
import { DUONG_DAN } from '@/constants';

// Giao diện thuộc tính cho Bảng sinh viên vắng mặt tại trang chủ
interface ThuocTinhBangSinhVienVangMat {
  // Mảng danh sách sinh viên đang vắng mặt
  duLieu: SinhVien[];

  // Trạng thái đang tải dữ liệu (tùy chọn)
  dangTai?: boolean;
}

/**
 * Component Bảng hiển thị sinh viên vắng mặt tại dashboard (BangSinhVienVangMat).
 * Chức năng: Thể hiện thông tin chi tiết của sinh viên hiện đang ở ngoài ký túc xá (chưa quét thẻ đi vào) kèm thời gian quét ra gần nhất.
 */
export const BangSinhVienVangMat: React.FC<ThuocTinhBangSinhVienVangMat> = ({ duLieu, dangTai = false }) => {
  const boChuyenHuong = useRouter();

  // Định nghĩa các cột cho bảng sinh viên vắng mặt khớp với ảnh chụp
  const cacCot: ColumnsType<SinhVien> = [
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
      title: 'Số ngày vắng',
      dataIndex: 'soNgayVang',
      key: 'soNgayVang',
      width: 110,
      render: (soNgay) => {
        return (
          <span className="font-sans text-[11px] text-rose-500 font-bold">
            {soNgay || 0} ngày
          </span>
        );
      },
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center h-12">
        <span className="font-bold text-sm text-zinc-800">SINH VIÊN VẮNG MẶT LÂU NGÀY</span>
        <Button
          type="link"
          size="small"
          onClick={() => {
            return boChuyenHuong.push(`${DUONG_DAN.CATEGORIES.STUDENTS}?loc=vangMat`);
          }}
          className="text-[#00afef] hover:text-[#1f5ca9] p-0 font-semibold text-xs font-sans"
        >
          Xem tất cả
        </Button>
      </div>
      <Table<SinhVien>
        columns={cacCot}
        dataSource={duLieu}
        loading={dangTai}
        rowKey="mssv"
        pagination={false}
        size="small"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default BangSinhVienVangMat;
