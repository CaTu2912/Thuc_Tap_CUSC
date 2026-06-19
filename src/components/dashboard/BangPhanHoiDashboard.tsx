'use client';

import React from 'react';
import { Table, Button, Text } from '@mantine/core';
import { PhanHoi } from '../../types/PhanHoi';
import NhanTrangThai from '../common/NhanTrangThai';
import { IconCheck } from '@tabler/icons-react';
import { dichVuPhanHoi } from '../../services/phanHoi.service';
import { dungKhoXacThuc } from '../../store/khoXacThuc';
import { useQueryClient } from '@tanstack/react-query';

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
export const BangPhanHoiDashboard: React.FC<ThuocTinhBangPhanHoiDashboard> = ({ duLieu = [], dangTai = false }) => {
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

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden flex flex-col h-full bg-white">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center">
        <span className="font-bold text-sm text-zinc-800 uppercase font-sans">Phản hồi sai thông tin Ra/Vào (MyCTU)</span>
      </div>

      <div style={{ overflowX: 'auto', position: 'relative' }} className="flex-1">
        {dangTai && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10" />
        )}
        <Table horizontalSpacing="sm" verticalSpacing="xs" highlightOnHover>
          <Table.Thead className="bg-zinc-50/30">
            <Table.Tr>
              <Table.Th style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Thời gian</Table.Th>
              <Table.Th style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Sinh viên</Table.Th>
              <Table.Th style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Nội dung phản hồi</Table.Th>
              <Table.Th style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Trạng thái</Table.Th>
              <Table.Th style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-k2d)' }}>Thao tác</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {duLieu.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={5} align="center" style={{ padding: '20px 10px' }}>
                  <span className="text-zinc-400 text-xs">Không có dữ liệu</span>
                </Table.Td>
              </Table.Tr>
            ) : (
              duLieu.map((record) => {
                return (
                  <Table.Tr key={record.id}>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <span className="text-zinc-500 text-xs font-sans">{record.thoiGian}</span>
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <div className="flex flex-col">
                        <Text className="font-semibold text-xs text-zinc-800 font-sans">{record.hoVaTen}</Text>
                        <Text className="text-[10px] text-zinc-400 font-mono mt-0.5">{record.mssv}</Text>
                      </div>
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <span className="text-xs text-zinc-600 block max-w-xs truncate font-sans">{record.noiDung}</span>
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      <NhanTrangThai trangThai={record.trangThai} />
                    </Table.Td>
                    <Table.Td style={{ padding: '6px 10px' }}>
                      {record.trangThai === 'PENDING' ? (
                        <Button
                          leftSection={<IconCheck size={10} />}
                          onClick={() => {
                            return xuLyGiaiQuyet(record.id);
                          }}
                          size="xs"
                          radius="sm"
                          style={{
                            backgroundColor: '#1f5ca9',
                            height: 'auto',
                            padding: '4px 8px',
                            fontSize: '10px',
                            fontWeight: 600,
                          }}
                        >
                          Giải quyết
                        </Button>
                      ) : (
                        <span className="text-xs text-zinc-400 font-sans">Đã giải quyết</span>
                      )}
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

export default BangPhanHoiDashboard;
