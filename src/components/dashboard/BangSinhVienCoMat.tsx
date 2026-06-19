'use client';

import React, { useState } from 'react';
import { Table, Avatar, Group, Text, Pagination } from '@mantine/core';
import { SinhVien } from '../../types/SinhVien';

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
export const BangSinhVienCoMat: React.FC<ThuocTinhBangSinhVienCoMat> = ({ duLieu = [], dangTai = false }) => {
  const [trangHienTai, setTrangHienTai] = useState(1);
  const kichThuocTrang = 5;
  const tongSoTrang = Math.ceil(duLieu.length / kichThuocTrang);
  const duLieuPhanTrang = duLieu.slice(
    (trangHienTai - 1) * kichThuocTrang,
    trangHienTai * kichThuocTrang
  );

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full bg-white">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
        <span className="font-bold text-sm text-zinc-800 uppercase font-sans">Sinh viên đang có mặt tại KTX</span>
      </div>

      <div style={{ overflowX: 'auto', position: 'relative' }} className="flex-1">
        {dangTai && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10" />
        )}
        <Table horizontalSpacing="sm" verticalSpacing="xs" highlightOnHover>
          <Table.Thead className="bg-zinc-50/30">
            <Table.Tr>
              <Table.Th style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Sinh viên</Table.Th>
              <Table.Th style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Khu / Phòng</Table.Th>
              <Table.Th style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Thời gian đi vào</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {duLieuPhanTrang.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={3} align="center" style={{ padding: '20px 10px' }}>
                  <span className="text-zinc-400 text-xs">Không có dữ liệu</span>
                </Table.Td>
              </Table.Tr>
            ) : (
              duLieuPhanTrang.map((record) => {
                return (
                  <Table.Tr key={record.mssv}>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <Group gap="sm" wrap="nowrap">
                        <Avatar src={record.duongDanAnhDaiDien} size="sm" radius="xl" />
                        <div className="flex flex-col">
                          <Text fw={600} size="xs" c="zinc.8" className="font-sans leading-tight">
                            {record.hoVaTen}
                          </Text>
                          <Text size="10px" c="dimmed" className="font-mono mt-0.5">
                            {record.mssv}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <span className="text-xs text-zinc-500 font-sans">
                        {record.tenKtx} - {record.tenPhong}
                      </span>
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <span className="text-xs text-zinc-600 font-medium font-sans">{record.thoiGianRaVaoCuoi}</span>
                    </Table.Td>
                  </Table.Tr>
                );
              })
            )}
          </Table.Tbody>
        </Table>
      </div>

      {tongSoTrang > 1 && (
        <div className="p-3 border-t border-zinc-100 flex justify-end bg-white">
          <Pagination
            total={tongSoTrang}
            value={trangHienTai}
            onChange={setTrangHienTai}
            size="xs"
            radius="md"
          />
        </div>
      )}
    </div>
  );
};

export default BangSinhVienCoMat;
