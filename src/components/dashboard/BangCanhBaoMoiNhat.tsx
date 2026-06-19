'use client';

import React from 'react';
import { Table, Button } from '@mantine/core';
import { CanhBao } from '../../types/CanhBao';
import { IconEyeOff, IconBan, IconCurrencyDollar, IconUsers } from '@tabler/icons-react';
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
export const BangCanhBaoMoiNhat: React.FC<ThuocTinhBangCanhBaoMoiNhat> = ({ duLieu = [], dangTai = false }) => {
  const boChuyenHuong = useRouter();

  // Tính số lượng cảnh báo chưa được trực ban xử lý
  const soLuongCanhBaoChuaXuLy = duLieu.filter((a) => {
    return ! a.daGiaiQuyet;
  }).length;

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full bg-white">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center h-12">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-zinc-800 uppercase font-sans">CẢNH BÁO MỚI NHẤT</span>
        </div>
        <Button
          variant="transparent"
          size="xs"
          onClick={() => {
            return boChuyenHuong.push(DUONG_DAN.ALERTS);
          }}
          className="text-[#00afef] hover:text-[#1f5ca9] p-0 font-semibold text-xs font-sans"
          styles={{
            root: {
              height: 'auto',
              padding: 0,
            }
          }}
        >
          Xem tất cả
        </Button>
      </div>

      <div style={{ overflowX: 'auto', position: 'relative' }} className="flex-1">
        {dangTai && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10" />
        )}
        <Table horizontalSpacing="sm" verticalSpacing="xs" highlightOnHover>
          <Table.Thead className="bg-zinc-50/30">
            <Table.Tr>
              <Table.Th style={{ width: 90, padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Thời gian</Table.Th>
              <Table.Th style={{ width: 180, padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Loại cảnh báo</Table.Th>
              <Table.Th style={{ width: 110, padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Đối tượng</Table.Th>
              <Table.Th style={{ width: 90, padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Khu KTX</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {duLieu.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={4} align="center" style={{ padding: '20px 10px' }}>
                  <span className="text-zinc-400 text-xs">Không có dữ liệu</span>
                </Table.Td>
              </Table.Tr>
            ) : (
              duLieu.map((record) => {
                let bieuTuong = <IconEyeOff size={12} />;
                let mauSac = '#FF4D4F'; // Mặc định đỏ cho người lạ
                if (record.loaiCanhBao === 'FORBIDDEN') {
                  bieuTuong = <IconBan size={12} />;
                  mauSac = '#FF4D4F';
                } else if (record.loaiCanhBao === 'DEBT') {
                  bieuTuong = <IconCurrencyDollar size={12} />;
                  mauSac = '#ED8936'; // Vàng cam
                } else if (record.loaiCanhBao === 'ABSENT') {
                  bieuTuong = <IconUsers size={12} />;
                  mauSac = '#52C41A'; // Xanh lá
                }
                const laUnknown = record.doiTuong === 'Unknown';

                return (
                  <Table.Tr key={record.id}>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <span className="font-sans text-[11px] text-zinc-500 font-medium">{record.thoiGian}</span>
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <div className="flex items-center gap-1.5 font-sans font-semibold text-[11px]" style={{ color: mauSac }}>
                        <span className="flex items-center text-xs shrink-0">{bieuTuong}</span>
                        <span>{record.noiDung}</span>
                      </div>
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <span className={`font-mono text-[11px] ${laUnknown ? 'text-zinc-400 font-normal' : 'text-zinc-700 font-bold'}`}>
                        {record.doiTuong || 'Unknown'}
                      </span>
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <span className="font-sans text-[11px] text-zinc-500 font-medium">{record.tenKtx}</span>
                    </Table.Td>
                  </Table.Tr>
                );
              })
            )}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default BangCanhBaoMoiNhat;
