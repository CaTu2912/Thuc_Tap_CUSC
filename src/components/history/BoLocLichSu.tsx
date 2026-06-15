'use client';

import React from 'react';
import { Input, Select, DatePicker, Button } from 'antd';
import {
  SearchOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { dungKhoLichSu } from '../../store/khoLichSu';
import dayjs from 'dayjs';

// Định nghĩa giao diện thuộc tính cho Component Bộ lọc lịch sử ra vào
interface ThuocTinhBoLocLichSu {
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
 * Chức năng: Render khung tìm kiếm và lọc dữ liệu theo thiết kế mockup mới.
 * Hàng 1 (6 cột): Từ ngày | Đến ngày | Khu KTX | Trạng thái | Hành động | Loại đối tượng
 * Hàng 2 (6 cột): Họ tên (Nhập họ tên) | MSSV (Nhập MSSV) | Tìm kiếm | Xuất Excel | Xuất PDF | Sinh viên đang có mặt
 */
export const BoLocLichSu: React.FC<ThuocTinhBoLocLichSu> = ({
  khiTimKiem,
  khiXuatExcel,
  khiXuatPdf,
  khiThemDuLieu,
}) => {
  // Trích xuất bộ lọc và các hàm điều khiển từ store lịch sử ra vào
  const { boLoc, datBoLoc } = dungKhoLichSu();

  return (
    <div className="bg-white rounded-xl border border-zinc-200 px-6 pt-5 pb-4 shadow-sm mb-4">
      {/* HÀNG 1: Các bộ lọc thời gian, khu KTX, trạng thái, hành động, loại đối tượng */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
        {/* Cột 1: Từ ngày */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Từ ngày</label>
          <DatePicker
            placeholder="01/06/2026"
            format="DD/MM/YYYY"
            value={boLoc.tuNgay ? dayjs(boLoc.tuNgay) : null}
            onChange={(ngay) =>
              datBoLoc({ tuNgay: ngay ? ngay.format('YYYY-MM-DD') : '' })
            }
            className="w-full h-9 rounded-md"
          />
        </div>

        {/* Cột 2: Đến ngày */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Đến ngày</label>
          <DatePicker
            placeholder="04/06/2026"
            format="DD/MM/YYYY"
            value={boLoc.denNgay ? dayjs(boLoc.denNgay) : null}
            onChange={(ngay) =>
              datBoLoc({ denNgay: ngay ? ngay.format('YYYY-MM-DD') : '' })
            }
            className="w-full h-9 rounded-md"
          />
        </div>

        {/* Cột 3: Khu KTX */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Khu KTX</label>
          <Select
            value={boLoc.maKtx || 'ALL'}
            onChange={(giaTri) => datBoLoc({ maKtx: giaTri })}
            className="w-full h-9"
            options={[
              { value: 'ALL', label: 'Tất cả' },
              { value: 'KTXA', label: 'KTX A' },
              { value: 'KTXB', label: 'KTX B' },
              { value: 'KTXC', label: 'KTX C' },
              { value: 'KTXD', label: 'KTX D' },
            ]}
          />
        </div>

        {/* Cột 4: Trạng thái */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Trạng thái</label>
          <Select
            value={boLoc.trangThai || 'ALL'}
            onChange={(giaTri) => datBoLoc({ trangThai: giaTri })}
            className="w-full h-9"
            options={[
              { value: 'ALL', label: 'Tất cả' },
              { value: 'CO_MAT', label: 'Đang có mặt' },
              { value: 'VANG_MAT', label: 'Vắng mặt' },
            ]}
          />
        </div>

        {/* Cột 5: Hành động */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Hành động</label>
          <Select
            value={boLoc.loai || 'ALL'}
            onChange={(giaTri) => datBoLoc({ loai: giaTri })}
            className="w-full h-9"
            options={[
              { value: 'ALL', label: 'Tất cả' },
              { value: 'IN', label: 'Vào' },
              { value: 'OUT', label: 'Ra' },
            ]}
          />
        </div>

        {/* Cột 6: Loại đối tượng */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Loại đối tượng</label>
          <Select
            value={boLoc.loaiDoiTuong || 'ALL'}
            onChange={(giaTri) => datBoLoc({ loaiDoiTuong: giaTri })}
            className="w-full h-9"
            options={[
              { value: 'ALL', label: 'Tất cả' },
              { value: 'Sinh viên', label: 'Sinh viên' },
              { value: 'Người lạ', label: 'Người lạ' },
            ]}
          />
        </div>
      </div>

      {/* HÀNG 2: Họ tên, MSSV và các nút thao tác */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {/* Cột 1: Họ tên */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">Họ tên</label>
          <Input
            placeholder="Nhập họ tên"
            value={boLoc.hoVaTen}
            onChange={(e) => datBoLoc({ hoVaTen: e.target.value })}
            className="h-9 rounded-md w-full text-sm"
            allowClear
          />
        </div>

        {/* Cột 2: MSSV */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-600">MSSV</label>
          <Input
            placeholder="Nhập MSSV"
            value={boLoc.mssv}
            onChange={(e) => datBoLoc({ mssv: e.target.value })}
            className="h-9 rounded-md w-full text-sm font-mono"
            allowClear
          />
        </div>

        {/* Cột 3: Nút Tìm kiếm */}
        <div className="flex flex-col justify-end">
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={khiTimKiem}
            className="bg-[#1f5ca9] hover:bg-[#1a4e8f] border-none text-white font-semibold h-9 w-full rounded-md flex items-center justify-center gap-1 text-sm"
          >
            Tìm kiếm
          </Button>
        </div>

        {/* Cột 4: Nút Xuất Excel */}
        <div className="flex flex-col justify-end">
          <Button
            icon={<FileExcelOutlined />}
            onClick={khiXuatExcel}
            className="border border-zinc-300 text-zinc-700 bg-white font-semibold h-9 w-full rounded-md flex items-center justify-center gap-1 text-sm hover:text-[#00afef] hover:border-[#00afef]"
          >
            Xuất Excel
          </Button>
        </div>

        {/* Cột 5: Nút Xuất PDF */}
        <div className="flex flex-col justify-end">
          <Button
            icon={<FilePdfOutlined />}
            onClick={khiXuatPdf}
            className="border border-zinc-300 text-zinc-700 bg-white font-semibold h-9 w-full rounded-md flex items-center justify-center gap-1 text-sm hover:text-[#00afef] hover:border-[#00afef]"
          >
            Xuất PDF
          </Button>
        </div>

        {/* Cột 6: Nút Thêm dữ liệu */}
        <div className="flex flex-col justify-end">
          <Button
            icon={<PlusOutlined />}
            onClick={khiThemDuLieu}
            className="border border-zinc-300 text-zinc-700 bg-white font-semibold h-9 w-full rounded-md flex items-center justify-center gap-1 text-sm hover:text-[#00afef] hover:border-[#00afef] whitespace-nowrap overflow-hidden text-ellipsis"
          >
            Thêm dữ liệu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BoLocLichSu;
