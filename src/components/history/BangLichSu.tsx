'use client';

import React, { useState } from 'react';
import { Table, Avatar, Select, Box } from '@mantine/core';
import {
  IconArrowRight,
  IconArrowLeft,
  IconCircleX,
  IconUser,
  IconBan,
  IconCircleCheck,
  IconClock,
  IconChevronDown,
} from '@tabler/icons-react';
import { LichSuRaVao } from '../../types/LichSuRaVao';
import { dungKhoLichSu } from '../../store/khoLichSu';
import dayjs from 'dayjs';

// Kiểu Tab hiển thị để quyết định cột Loại render như thế nào
export type LoaiTabHienThi = 'LICH_SU' | 'CO_MAT' | 'VANG_MAT' | 'CANH_BAO';

// Định nghĩa giao diện thuộc tính cho Component Bảng lịch sử ra vào
interface ThuocTinhBangLichSu {
  // Mảng dữ liệu lịch sử ra vào
  duLieu: LichSuRaVao[];

  // Trạng thái đang tải dữ liệu từ API
  dangTai?: boolean;

  // Loại tab hiện tại để điều chỉnh cột Loại
  loaiTab?: LoaiTabHienThi;

  // Props truyền từ cha (optional) để tránh lỗi kiểu
  lichSuDuocChon?: LichSuRaVao | null;
  datLichSuDuocChon?: (lichSu: LichSuRaVao | null) => void;
}

/**
 * Hàm render badge cột Loại tuỳ theo dữ liệu và tab đang active.
 * Chức năng: Hiển thị đúng nhãn trạng thái theo ảnh mockup.
 */
const renderCotLoai = (banGhi: LichSuRaVao, loaiTab: LoaiTabHienThi) => {
  // Ưu tiên hiển thị theo tab
  if (loaiTab === 'CO_MAT') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
        <IconCircleCheck size={14} /> Có mặt
      </span>
    );
  }

  if (loaiTab === 'VANG_MAT') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
        <IconClock size={14} /> Vắng
      </span>
    );
  }

  // Tab LICH_SU hoặc CANH_BAO: hiển thị theo phân loại của bản ghi
  if (banGhi.loaiDoiTuong === 'Người lạ') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500">
        <IconCircleX size={14} className="text-red-500" /> Người lạ
      </span>
    );
  }

  if (banGhi.trangThaiSinhVien === 'NO_PHI') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500">
        <IconUser size={14} /> Nợ phí
      </span>
    );
  }

  if (banGhi.trangThaiSinhVien === 'BI_CAM') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600">
        <IconBan size={14} /> Bị cấm
      </span>
    );
  }

  // Sinh viên bình thường: hiển thị hướng di chuyển Vào / Ra
  const laVao = banGhi.loai === 'IN';
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${
        laVao ? 'text-blue-600' : 'text-emerald-600'
      }`}
    >
      {laVao ? (
        <>
          <IconArrowRight size={14} /> Vào
        </>
      ) : (
        <>
          <IconArrowLeft size={14} /> Ra
        </>
      )}
    </span>
  );
};

/**
 * Hàm lấy nhãn trạng thái hiện diện cho bảng Thông tin chi tiết.
 */
export const layNhanTrangThai = (banGhi: LichSuRaVao, loaiTab: LoaiTabHienThi): { nhan: string; mauSac: string } => {
  if (loaiTab === 'CO_MAT') return { nhan: 'Có mặt', mauSac: 'text-emerald-600' };
  if (loaiTab === 'VANG_MAT') return { nhan: 'Vắng mặt', mauSac: 'text-amber-500' };
  if (banGhi.loaiDoiTuong === 'Người lạ') return { nhan: 'Người lạ', mauSac: 'text-red-500' };
  if (banGhi.trangThaiSinhVien === 'NO_PHI') return { nhan: 'Nợ phí', mauSac: 'text-blue-500' };
  if (banGhi.trangThaiSinhVien === 'BI_CAM') return { nhan: 'Bị cấm', mauSac: 'text-orange-600' };
  if (banGhi.loai === 'IN') return { nhan: 'Vào', mauSac: 'text-blue-600' };
  return { nhan: 'Ra', mauSac: 'text-emerald-600' };
};

/**
 * Component Bảng hiển thị nhật ký ra vào ký túc xá (BangLichSu).
 * Chức năng: Render bảng danh sách lịch sử với cột Loại linh hoạt theo tab.
 */
export const BangLichSu: React.FC<ThuocTinhBangLichSu> = ({
  duLieu,
  dangTai = false,
  loaiTab = 'LICH_SU',
}) => {
  // Trích xuất thông tin lịch sử đang được chọn và hàm cập nhật từ Zustand store
  const { lichSuDuocChon, datLichSuDuocChon } = dungKhoLichSu();

  // Trạng thái phân trang cục bộ
  const [trangHienTai, datTrangHienTai] = useState<number>(1);
  const [soDongTrenTrang, datSoDongTrenTrang] = useState<number>(5);

  // Tính toán danh sách trang hiện tại
  const chiSoBatDau = (trangHienTai - 1) * soDongTrenTrang;
  const chiSoKetThuc = chiSoBatDau + soDongTrenTrang;
  const danhSachHienThi = duLieu.slice(chiSoBatDau, chiSoKetThuc);
  const tongSoTrang = Math.ceil(duLieu.length / soDongTrenTrang);

  // Hàm xử lý chuyển trang
  const xuLyChuyenTrang = (soTrangMoi: number) => {
    if (soTrangMoi >= 1 && soTrangMoi <= tongSoTrang) {
      datTrangHienTai(soTrangMoi);
    }
  };

  // Tạo mảng số trang hiển thị dạng "1 2 3 4 ... 52"
  const taoSoTrangHienThi = (): (number | '...')[] => {
    if (tongSoTrang <= 5) {
      return Array.from({ length: tongSoTrang }, (_, i) => i + 1);
    }
    const trang: (number | '...')[] = [1, 2, 3, 4];
    if (trangHienTai > 4 && trangHienTai < tongSoTrang - 1) {
      trang.push('...');
      trang.push(trangHienTai);
    }
    trang.push('...');
    trang.push(tongSoTrang);
    return trang;
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
      {/* BẢNG DỮ LIỆU */}
      <div className="overflow-x-auto">
        <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md" className="min-w-[600px] text-sm">
          <Table.Thead className="bg-zinc-50 border-b border-zinc-200">
            <Table.Tr>
              <Table.Th style={{ width: 48, textAlign: 'center' }}>STT</Table.Th>
              <Table.Th style={{ width: 145 }}>Thời gian</Table.Th>
              <Table.Th style={{ width: 155 }}>Họ tên</Table.Th>
              <Table.Th style={{ width: 80, textAlign: 'center' }}>Hình ảnh</Table.Th>
              <Table.Th style={{ width: 110 }}>Loại</Table.Th>
              <Table.Th style={{ width: 75 }}>KTX</Table.Th>
              <Table.Th style={{ width: 80 }}>Phòng</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {dangTai ? (
              <Table.Tr>
                <Table.Td colSpan={7} className="text-center py-6 text-zinc-500">
                  Đang tải dữ liệu...
                </Table.Td>
              </Table.Tr>
            ) : danhSachHienThi.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={7} className="text-center py-6 text-zinc-500">
                  Không có dữ liệu
                </Table.Td>
              </Table.Tr>
            ) : (
              danhSachHienThi.map((banGhi, index) => {
                const laDuocChon = lichSuDuocChon?.id === banGhi.id;
                return (
                  <Table.Tr
                    key={banGhi.id}
                    onClick={() => datLichSuDuocChon(banGhi)}
                    className={`cursor-pointer transition-colors duration-150 hover:bg-zinc-50 ${
                      laDuocChon ? 'bg-blue-50/70' : ''
                    }`}
                  >
                    <Table.Td style={{ textAlign: 'center' }} className="font-medium text-zinc-600 text-sm">
                      {chiSoBatDau + index + 1}
                    </Table.Td>
                    <Table.Td className="text-zinc-700 text-sm">
                      {dayjs(banGhi.thoiGian).format('DD/MM/YYYY HH:mm:ss')}
                    </Table.Td>
                    <Table.Td className="font-medium text-zinc-800 text-sm">{banGhi.hoVaTen}</Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>
                      <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar
                          src={banGhi.duongDanAnhDaiDien}
                          radius="sm"
                          size={44}
                          className="border border-zinc-100 shrink-0"
                        />
                      </Box>
                    </Table.Td>
                    <Table.Td>{renderCotLoai(banGhi, loaiTab)}</Table.Td>
                    <Table.Td className="text-zinc-700 text-sm font-medium">{banGhi.tenKtx}</Table.Td>
                    <Table.Td className="text-zinc-700 text-sm font-medium">{banGhi.tenPhong}</Table.Td>
                  </Table.Tr>
                );
              })
            )}
          </Table.Tbody>
        </Table>
      </div>

      {/* THANH PHÂN TRANG THEO MOCKUP */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-zinc-200 bg-white">
        {/* Thông tin số bản ghi */}
        <div className="text-zinc-600 text-sm whitespace-nowrap">
          Hiển thị {duLieu.length === 0 ? 0 : chiSoBatDau + 1} -{' '}
          {Math.min(chiSoKetThuc, duLieu.length)} của {duLieu.length} bản ghi
        </div>

        {/* Nút phân trang */}
        <div className="flex items-center gap-1">
          {/* Nút về trang trước */}
          <button
            onClick={() => xuLyChuyenTrang(trangHienTai - 1)}
            disabled={trangHienTai === 1}
            className="w-7 h-7 flex items-center justify-center rounded border border-zinc-300 text-zinc-500 text-sm hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {'<'}
          </button>

          {/* Danh sách trang */}
          {taoSoTrangHienThi().map((item, idx) => {
            if (item === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="w-7 h-7 flex items-center justify-center text-zinc-400 text-sm">
                  ...
                </span>
              );
            }
            const soTrang = item as number;
            const laHienTai = soTrang === trangHienTai;
            return (
              <button
                key={soTrang}
                onClick={() => xuLyChuyenTrang(soTrang)}
                className={`w-7 h-7 flex items-center justify-center rounded border text-sm transition-colors cursor-pointer ${
                  laHienTai
                    ? 'bg-white text-[#00afef] border-[#00afef] font-semibold'
                    : 'border-zinc-300 text-zinc-600 hover:border-[#00afef] hover:text-[#00afef]'
                }`}
              >
                {soTrang}
              </button>
            );
          })}

          {/* Nút đến trang sau */}
          <button
            onClick={() => xuLyChuyenTrang(trangHienTai + 1)}
            disabled={trangHienTai === tongSoTrang || tongSoTrang === 0}
            className="w-7 h-7 flex items-center justify-center rounded border border-zinc-300 text-zinc-500 text-sm hover:border-[#00afef] hover:text-[#00afef] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {'>'}
          </button>
        </div>

        {/* Bộ chọn số dòng/trang */}
        <Select
          value={soDongTrenTrang.toString()}
          onChange={(giaTri) => {
            datSoDongTrenTrang(Number(giaTri || '5'));
            datTrangHienTai(1);
          }}
          size="xs"
          radius="md"
          style={{ width: 110 }}
          rightSection={<IconChevronDown size={14} className="text-zinc-400 pointer-events-none" />}
          data={[
            { value: '5', label: '5 / Trang' },
            { value: '10', label: '10 / Trang' },
          ]}
        />
      </div>
    </div>
  );
};

export default BangLichSu;
