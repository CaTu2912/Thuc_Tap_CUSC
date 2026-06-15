'use client';

import React from 'react';
import { Table, Button, Badge, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CanhBao } from '../../types/CanhBao';
import { EyeInvisibleOutlined, StopOutlined, DollarOutlined, TeamOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { DUONG_DAN } from '@/constants';

// Giao diện thuộc tính cho Bảng cảnh báo an ninh mới nhất tại trang chủ
interface ThuocTinhBangCanhBaoMoiNhat {
  // Mảng danh sách các cảnh báo
  duLieu: CanhBao[];

  // Trạng thái đang tải dữ liệu (tùy chọn)
  dangTai?: boolean;
}

/**
 * Component Bảng hiển thị cảnh báo an ninh mới nhất tại dashboard (BangCanhBaoMoiNhat).
 * Chức năng: Liệt kê các sự cố an ninh trong ngày (thiết bị offline, người lạ, vi phạm), đếm số lượng sự cố chưa xử lý và cho phép duyệt nhanh.
 */
export const BangCanhBaoMoiNhat: React.FC<ThuocTinhBangCanhBaoMoiNhat> = ({ duLieu, dangTai = false }) => {
  const boChuyenHuong = useRouter();

  // Định nghĩa danh sách các cột cho bảng cảnh báo mới nhất khớp với ảnh chụp
  const cacCot: ColumnsType<CanhBao> = [
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
      title: 'Loại cảnh báo',
      dataIndex: 'noiDung',
      key: 'noiDung',
      width: 180,
      render: (text, record) => {
        let bieuTuong = <EyeInvisibleOutlined />;
        let mauSac = '#FF4D4F'; // Mặc định đỏ cho người lạ
        if (record.loaiCanhBao === 'FORBIDDEN') {
          bieuTuong = <StopOutlined />;
          mauSac = '#FF4D4F';
        } else if (record.loaiCanhBao === 'DEBT') {
          bieuTuong = <DollarOutlined />;
          mauSac = '#ED8936'; // Vàng cam
        } else if (record.loaiCanhBao === 'ABSENT') {
          bieuTuong = <TeamOutlined />;
          mauSac = '#52C41A'; // Xanh lá
        }
        return (
          <div className="flex items-center gap-1.5 font-sans font-semibold text-[11px]" style={{ color: mauSac }}>
            <span className="flex items-center text-xs shrink-0">{bieuTuong}</span>
            <span>{text}</span>
          </div>
        );
      },
    },
    {
      title: 'Đối tượng',
      dataIndex: 'doiTuong',
      key: 'doiTuong',
      width: 110,
      render: (doiTuong) => {
        const laUnknown = doiTuong === 'Unknown';
        return (
          <span className={`font-mono text-[11px] ${laUnknown ? 'text-zinc-400 font-normal' : 'text-zinc-700 font-bold'}`}>
            {doiTuong || 'Unknown'}
          </span>
        );
      },
    },
    {
      title: 'Khu KTX',
      dataIndex: 'tenKtx',
      key: 'tenKtx',
      width: 90,
      render: (tenKtx) => {
        return <span className="font-sans text-[11px] text-zinc-500 font-medium">{tenKtx}</span>;
      },
    },
  ];

  // Tính số lượng cảnh báo chưa được trực ban xử lý
  const soLuongCanhBaoChuaXuLy = duLieu.filter((a) => {
    return ! a.daGiaiQuyet;
  }).length;

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center h-12">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-zinc-800">CẢNH BÁO MỚI NHẤT</span>
        </div>
        <Button
          type="link"
          size="small"
          onClick={() => {
            return boChuyenHuong.push(DUONG_DAN.ALERTS);
          }}
          className="text-[#00afef] hover:text-[#1f5ca9] p-0 font-semibold text-xs font-sans"
        >
          Xem tất cả
        </Button>
      </div>
      <Table<CanhBao>
        className="flex-1 flex flex-col [&_.ant-table]:flex-1 [&_.ant-table]:flex [&_.ant-table]:flex-col [&_.ant-table-container]:flex-1 [&_.ant-table-container]:flex [&_.ant-table-container]:flex-col [&_.ant-table-content]:flex-1 [&_.ant-table-content]:flex [&_.ant-table-content]:flex-col [&_.ant-table-content]:justify-between"
        columns={cacCot}
        dataSource={duLieu}
        loading={dangTai}
        rowKey="id"
        pagination={false}
        size="small"
        scroll={{ x: 'max-content' }}
        sticky
      />
    </div>
  );
};

export default BangCanhBaoMoiNhat;
