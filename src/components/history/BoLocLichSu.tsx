'use client';

import React, { useState } from 'react';
import { TextInput, Select, Button } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import {
  IconSearch,
  IconFileSpreadsheet,
  IconFileText,
  IconPlus,
  IconChevronDown,
  IconChevronUp,
  IconRefresh,
} from '@tabler/icons-react';
import { dungKhoLichSu } from '../../store/khoLichSu';
import dayjs from 'dayjs';

// Định nghĩa giao diện thuộc tính cho Component Bộ lọc lịch sử ra vào
interface ThuocTinhBoLocLichSu {
  // Bộ lọc lịch sử
  boLoc?: any;
  datBoLoc?: any;
  datLaiBoLoc?: () => void;

  // Hàm xử lý khi bấm nút Tìm kiếm
  khiTimKiem: () => void;

  // Hàm xử lý khi bấm nút Xuất Excel
  khiXuatExcel: () => void;

  // Hàm xử lý khi bấm nút Xuất PDF
  khiXuatPdf: () => void;

  // Hàm xử lý khi bấm nút Thêm dữ liệu (Sinh viên đang có mặt)
  khiThemDuLieu: () => void;
}

/**
 * Component Bộ lọc lịch sử ra vào (BoLocLichSu).
 * Chức năng: Render khung tìm kiếm và lọc dữ liệu.
 * Bố cục được tinh chỉnh cao cấp:
 * 1. Chế độ Thu gọn:
 *    - 3 ô nhập liệu (Từ ngày, Đến ngày, MSSV) chiếm 1/2 chiều rộng.
 *    - Nhóm 3 nút thao tác (Tìm kiếm, Làm mới, Thêm dữ liệu) chiếm 1/2 chiều rộng còn lại, gom sát về bên phải.
 * 2. Chế độ Mở rộng:
 *    - 8 ô lọc được phân bổ thành 2 hàng song song, mỗi hàng gồm 4 cột đều tăm tắp.
 *    - Một hàng riêng ở dưới cùng dành cho các nút chức năng, gom sát về bên phải, tạo bố cục thoáng đãng và dễ nhìn.
 */
export const BoLocLichSu: React.FC<ThuocTinhBoLocLichSu> = ({
  khiTimKiem,
  khiXuatExcel,
  khiXuatPdf,
  khiThemDuLieu,
  datLaiBoLoc,
}) => {
  // Trích xuất bộ lọc và các hàm điều khiển từ store lịch sử ra vào
  const { boLoc, datBoLoc, datLaiBoLoc: datLaiBoLocStore } = dungKhoLichSu();

  // Trạng thái mở rộng/thu gọn của bộ lọc
  const [moRong, setMoRong] = useState(false);

  const customChevron = <IconChevronDown size={16} className="text-zinc-400 pointer-events-none" />;

  // Handler xử lý làm mới bộ lọc
  const xuLyLamMoi = () => {
    if (datLaiBoLoc) {
      datLaiBoLoc();
    } else {
      datLaiBoLocStore();
    }
  };

  if (!moRong) {
    // Giao diện khi THU GỌN (Bố cục 6 cột cân bằng 50% - 50%)
    return (
      <div className="bg-white rounded-xl border border-zinc-200 px-6 pt-5 pb-7 shadow-sm mb-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          {/* Cột 1: Từ ngày */}
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-xs font-semibold text-zinc-600">Từ ngày</label>
            <DateInput
              placeholder="01/06/2026"
              valueFormat="DD/MM/YYYY"
              value={boLoc.tuNgay ? dayjs(boLoc.tuNgay).toDate() : null}
              onChange={(ngay) =>
                datBoLoc({ tuNgay: ngay ? dayjs(ngay).format('YYYY-MM-DD') : '' })
              }
              className="w-full"
              clearable
              styles={{ input: { height: '36px', borderRadius: '6px' } }}
              rightSection={customChevron}
            />
          </div>

          {/* Cột 2: Đến ngày */}
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-xs font-semibold text-zinc-600">Đến ngày</label>
            <DateInput
              placeholder="04/06/2026"
              valueFormat="DD/MM/YYYY"
              value={boLoc.denNgay ? dayjs(boLoc.denNgay).toDate() : null}
              onChange={(ngay) =>
                datBoLoc({ denNgay: ngay ? dayjs(ngay).format('YYYY-MM-DD') : '' })
              }
              className="w-full"
              clearable
              styles={{ input: { height: '36px', borderRadius: '6px' } }}
              rightSection={customChevron}
            />
          </div>

          {/* Cột 3: MSSV */}
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-xs font-semibold text-zinc-600">MSSV</label>
            <TextInput
              placeholder="Nhập MSSV"
              value={boLoc.mssv}
              onChange={(e) => datBoLoc({ mssv: e.target.value })}
              className="w-full text-sm font-mono"
              styles={{ input: { height: '36px', borderRadius: '6px' } }}
              rightSection={boLoc.mssv ? (
                <button
                  onClick={() => datBoLoc({ mssv: '' })}
                  className="text-zinc-400 hover:text-zinc-600 text-xs bg-transparent border-0 cursor-pointer"
                  style={{ padding: 0 }}
                >
                  ✕
                </button>
              ) : null}
            />
          </div>

          {/* Nhóm các nút thao tác (Tìm kiếm, Làm mới, Thêm dữ liệu) */}
          <div className="md:col-span-3 flex flex-wrap items-center gap-2 justify-end w-full">
            <Button
              leftSection={<IconSearch size={16} />}
              onClick={khiTimKiem}
              className="bg-[#1f5ca9] hover:bg-[#1a4e8f] border-none text-white font-semibold h-9 px-4 rounded-md flex items-center justify-center gap-1 text-sm cursor-pointer"
              style={{ backgroundColor: '#1f5ca9' }}
            >
              Tìm kiếm
            </Button>
            
            <Button
              variant="default"
              leftSection={<IconRefresh size={16} />}
              onClick={xuLyLamMoi}
              className="border border-zinc-300 text-zinc-700 bg-white font-semibold h-9 px-4 rounded-md flex items-center justify-center gap-1 text-sm hover:text-[#00afef] hover:border-[#00afef] cursor-pointer"
            >
              Làm mới
            </Button>
            
            <Button
              variant="default"
              leftSection={<IconPlus size={16} />}
              onClick={khiThemDuLieu}
              className="border border-zinc-300 text-zinc-700 bg-white font-semibold h-9 px-4 rounded-md flex items-center justify-center gap-1 text-sm hover:text-[#00afef] hover:border-[#00afef] whitespace-nowrap cursor-pointer"
            >
              Thêm dữ liệu
            </Button>
          </div>
        </div>

        {/* Nút mũi nhọn mở rộng (không khung, đặt ở góc dưới bên phải) */}
        <button
          onClick={() => setMoRong(true)}
          className="absolute bottom-1 right-2 text-zinc-400 hover:text-[#00afef] bg-transparent border-0 cursor-pointer flex items-center justify-center p-1 rounded hover:bg-zinc-50 transition-colors"
          title="Mở rộng bộ lọc"
          style={{ outline: 'none' }}
        >
          <IconChevronDown size={18} />
        </button>
      </div>
    );
  }

  // Giao diện khi MỞ RỘNG (ĐẦY ĐỦ, 4 cột song song + thanh nút riêng biệt bên dưới)
  return (
    <div className="bg-white rounded-xl border border-zinc-200 px-6 pt-5 pb-9 shadow-sm mb-4 relative">
      {/* 8 ô nhập liệu chia làm 2 hàng cân đối (4 cột/hàng) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* Hàng 1 - Cột 1: Từ ngày */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Từ ngày</label>
          <DateInput
            placeholder="01/06/2026"
            valueFormat="DD/MM/YYYY"
            value={boLoc.tuNgay ? dayjs(boLoc.tuNgay).toDate() : null}
            onChange={(ngay) =>
              datBoLoc({ tuNgay: ngay ? dayjs(ngay).format('YYYY-MM-DD') : '' })
            }
            className="w-full"
            clearable
            styles={{ input: { height: '36px', borderRadius: '6px' } }}
            rightSection={customChevron}
          />
        </div>

        {/* Hàng 1 - Cột 2: Đến ngày */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Đến ngày</label>
          <DateInput
            placeholder="04/06/2026"
            valueFormat="DD/MM/YYYY"
            value={boLoc.denNgay ? dayjs(boLoc.denNgay).toDate() : null}
            onChange={(ngay) =>
              datBoLoc({ denNgay: ngay ? dayjs(ngay).format('YYYY-MM-DD') : '' })
            }
            className="w-full"
            clearable
            styles={{ input: { height: '36px', borderRadius: '6px' } }}
            rightSection={customChevron}
          />
        </div>

        {/* Hàng 1 - Cột 3: Khu KTX */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Khu KTX</label>
          <Select
            value={boLoc.maKtx || 'ALL'}
            onChange={(giaTri) => datBoLoc({ maKtx: giaTri || 'ALL' })}
            className="w-full"
            styles={{ input: { height: '36px', borderRadius: '6px' } }}
            rightSection={customChevron}
            data={[
              { value: 'ALL', label: 'Tất cả' },
              { value: 'KTXA', label: 'KTX A' },
              { value: 'KTXB', label: 'KTX B' },
              { value: 'KTXC', label: 'KTX C' },
              { value: 'KTXD', label: 'KTX D' },
            ]}
          />
        </div>

        {/* Hàng 1 - Cột 4: Trạng thái */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Trạng thái</label>
          <Select
            value={boLoc.trangThai || 'ALL'}
            onChange={(giaTri) => datBoLoc({ trangThai: giaTri || 'ALL' })}
            className="w-full"
            styles={{ input: { height: '36px', borderRadius: '6px' } }}
            rightSection={customChevron}
            data={[
              { value: 'ALL', label: 'Tất cả' },
              { value: 'CO_MAT', label: 'Đang có mặt' },
              { value: 'VANG_MAT', label: 'Vắng mặt' },
            ]}
          />
        </div>

        {/* Hàng 2 - Cột 1: Hành động */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Hành động</label>
          <Select
            value={boLoc.loai || 'ALL'}
            onChange={(giaTri) => datBoLoc({ loai: giaTri || 'ALL' })}
            className="w-full"
            styles={{ input: { height: '36px', borderRadius: '6px' } }}
            rightSection={customChevron}
            data={[
              { value: 'ALL', label: 'Tất cả' },
              { value: 'IN', label: 'Vào' },
              { value: 'OUT', label: 'Ra' },
            ]}
          />
        </div>

        {/* Hàng 2 - Cột 2: Loại đối tượng */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Loại đối tượng</label>
          <Select
            value={boLoc.loaiDoiTuong || 'ALL'}
            onChange={(giaTri) => datBoLoc({ loaiDoiTuong: giaTri || 'ALL' })}
            className="w-full"
            styles={{ input: { height: '36px', borderRadius: '6px' } }}
            rightSection={customChevron}
            data={[
              { value: 'ALL', label: 'Tất cả' },
              { value: 'Sinh viên', label: 'Sinh viên' },
              { value: 'Người lạ', label: 'Người lạ' },
            ]}
          />
        </div>

        {/* Hàng 2 - Cột 3: Họ tên */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Họ tên</label>
          <TextInput
            placeholder="Nhập họ tên"
            value={boLoc.hoVaTen}
            onChange={(e) => datBoLoc({ hoVaTen: e.target.value })}
            className="w-full text-sm"
            styles={{ input: { height: '36px', borderRadius: '6px' } }}
            rightSection={boLoc.hoVaTen ? (
              <button
                onClick={() => datBoLoc({ hoVaTen: '' })}
                className="text-zinc-400 hover:text-zinc-600 text-xs bg-transparent border-0 cursor-pointer"
                style={{ padding: 0 }}
              >
                ✕
              </button>
            ) : null}
          />
        </div>

        {/* Hàng 2 - Cột 4: MSSV */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">MSSV</label>
          <TextInput
            placeholder="Nhập MSSV"
            value={boLoc.mssv}
            onChange={(e) => datBoLoc({ mssv: e.target.value })}
            className="w-full text-sm font-mono"
            styles={{ input: { height: '36px', borderRadius: '6px' } }}
            rightSection={boLoc.mssv ? (
              <button
                onClick={() => datBoLoc({ mssv: '' })}
                className="text-zinc-400 hover:text-zinc-600 text-xs bg-transparent border-0 cursor-pointer"
                style={{ padding: 0 }}
              >
                ✕
              </button>
            ) : null}
          />
        </div>
      </div>

      {/* Dòng các nút thao tác riêng biệt ở dưới cùng (Tìm kiếm, Làm mới, Xuất Excel, Xuất PDF, Thêm dữ liệu) */}
      <div className="flex flex-wrap items-center gap-2 justify-end w-full border-t border-zinc-100 pt-4">
        <Button
          leftSection={<IconSearch size={16} />}
          onClick={khiTimKiem}
          className="bg-[#1f5ca9] hover:bg-[#1a4e8f] border-none text-white font-semibold h-9 px-4 rounded-md flex items-center justify-center gap-1 text-sm cursor-pointer"
          style={{ backgroundColor: '#1f5ca9' }}
        >
          Tìm kiếm
        </Button>
        
        <Button
          variant="default"
          leftSection={<IconRefresh size={16} />}
          onClick={xuLyLamMoi}
          className="border border-zinc-300 text-zinc-700 bg-white font-semibold h-9 px-4 rounded-md flex items-center justify-center gap-1 text-sm hover:text-[#00afef] hover:border-[#00afef] cursor-pointer"
        >
          Làm mới
        </Button>

        <Button
          variant="default"
          leftSection={<IconFileSpreadsheet size={16} />}
          onClick={khiXuatExcel}
          className="border border-zinc-300 text-zinc-700 bg-white font-semibold h-9 px-4 rounded-md flex items-center justify-center gap-1 text-sm hover:text-[#00afef] hover:border-[#00afef] cursor-pointer"
        >
          Xuất Excel
        </Button>

        <Button
          variant="default"
          leftSection={<IconFileText size={16} />}
          onClick={khiXuatPdf}
          className="border border-zinc-300 text-zinc-700 bg-white font-semibold h-9 px-4 rounded-md flex items-center justify-center gap-1 text-sm hover:text-[#00afef] hover:border-[#00afef] cursor-pointer"
        >
          Xuất PDF
        </Button>

        <Button
          variant="default"
          leftSection={<IconPlus size={16} />}
          onClick={khiThemDuLieu}
          className="border border-zinc-300 text-zinc-700 bg-white font-semibold h-9 px-4 rounded-md flex items-center justify-center gap-1 text-sm hover:text-[#00afef] hover:border-[#00afef] whitespace-nowrap cursor-pointer"
        >
          Thêm dữ liệu
        </Button>
      </div>

      {/* Nút mũi nhọn thu gọn (không khung, đặt ở góc dưới bên phải) */}
      <button
        onClick={() => setMoRong(false)}
        className="absolute bottom-1 right-2 text-zinc-400 hover:text-[#00afef] bg-transparent border-0 cursor-pointer flex items-center justify-center p-1 rounded hover:bg-zinc-50 transition-colors"
        title="Thu gọn bộ lọc"
        style={{ outline: 'none' }}
      >
        <IconChevronUp size={18} />
      </button>
    </div>
  );
};

export default BoLocLichSu;
