'use client';

import React from 'react';
import { Table, Button } from '@mantine/core';
import { SinhVien } from '../../types/SinhVien';
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
export const BangSinhVienVangMat: React.FC<ThuocTinhBangSinhVienVangMat> = ({ duLieu = [], dangTai = false }) => {
  const boChuyenHuong = useRouter();

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full bg-white">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center h-12">
        <span className="font-bold text-sm text-zinc-800 uppercase font-sans">SINH VIÊN VẮNG MẶT LÂU NGÀY</span>
        <Button
          variant="transparent"
          size="xs"
          onClick={() => {
            return boChuyenHuong.push(`${DUONG_DAN.CATEGORIES.STUDENTS}?loc=vangMat`);
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
              <Table.Th style={{ width: 90, padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>MSSV</Table.Th>
              <Table.Th style={{ width: 140, padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Họ tên</Table.Th>
              <Table.Th style={{ width: 90, padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Khu KTX</Table.Th>
              <Table.Th style={{ width: 110, padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Số ngày vắng</Table.Th>
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
                return (
                  <Table.Tr key={record.mssv}>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <span className="font-mono text-[11px] text-zinc-700 font-bold">{record.mssv}</span>
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <span className="font-sans text-[11px] text-zinc-800 font-semibold">{record.hoVaTen}</span>
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <span className="font-sans text-[11px] text-zinc-500 font-medium">{record.tenKtx}</span>
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <span className="font-sans text-[11px] text-rose-500 font-bold">
                        {record.soNgayVang || 0} ngày
                      </span>
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

export default BangSinhVienVangMat;
