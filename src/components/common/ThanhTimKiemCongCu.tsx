'use client';

import React from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, PlusOutlined, FileExcelOutlined, ReloadOutlined } from '@ant-design/icons';

// Định nghĩa giao diện thuộc tính cho Thanh công cụ tìm kiếm dữ liệu
interface ThuocTinhThanhTimKiemCongCu {
  // Chuỗi văn bản gợi ý trong ô nhập liệu (mặc định: Tìm kiếm...)
  chuGoiY?: string;

  // Giá trị hiện tại của từ khóa tìm kiếm
  giaTriTimKiem: string;

  // Hàm xử lý sự kiện khi nội dung ô nhập thay đổi
  khiGiaTriThayDoi: (giaTri: string) => void;

  // Hàm xử lý sự kiện khi bấm nút Thêm mới (tùy chọn)
  khiNhanThem?: () => void;

  // Hàm xử lý sự kiện khi bấm nút Xuất Excel (tùy chọn)
  khiNhanXuatExcel?: () => void;

  // Hàm xử lý sự kiện khi bấm nút Làm mới bộ lọc (tùy chọn)
  khiNhanLamMoi?: () => void;

  // Văn bản hiển thị trên nút Thêm mới (mặc định: Thêm mới)
  chuThemMoi?: string;

  // Thành phần lọc bổ sung (tùy chọn)
  boLocBoSung?: React.ReactNode;
}

/**
 * Component Thanh công cụ tìm kiếm và thao tác nhanh (SearchToolbar).
 * Chức năng: Chứa ô nhập từ khóa tìm kiếm, các bộ lọc bổ sung và các nút chức năng (làm mới, xuất Excel, thêm mới).
 */
export const ThanhTimKiemCongCu: React.FC<ThuocTinhThanhTimKiemCongCu> = ({
  chuGoiY = 'Tìm kiếm...',
  giaTriTimKiem,
  khiGiaTriThayDoi,
  khiNhanThem,
  khiNhanXuatExcel,
  khiNhanLamMoi,
  chuThemMoi = 'Thêm mới',
  boLocBoSung,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-zinc-100 shadow-xs mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <Input
          placeholder={chuGoiY}
          prefix={<SearchOutlined className="text-zinc-400" />}
          value={giaTriTimKiem}
          onChange={(e) => {
            return khiGiaTriThayDoi(e.target.value);
          }}
          className="max-w-xs rounded-lg"
          allowClear
        />
        {boLocBoSung}
      </div>
      <Space size={10} className="self-end lg:self-auto">
        {khiNhanLamMoi && (
          <Button
            icon={<ReloadOutlined />}
            onClick={khiNhanLamMoi}
            className="rounded-lg hover:border-[#1f5ca9] hover:text-[#1f5ca9] flex items-center"
          >
            Làm mới
          </Button>
        )}
        {khiNhanXuatExcel && (
          <Button
            icon={<FileExcelOutlined />}
            onClick={khiNhanXuatExcel}
            className="rounded-lg border-emerald-500 text-emerald-600 hover:bg-emerald-50/20 hover:border-emerald-600 flex items-center"
          >
            Xuất Excel
          </Button>
        )}
        {khiNhanThem && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={khiNhanThem}
            className="rounded-lg bg-[#1f5ca9] hover:bg-[#1a4e8f] flex items-center"
          >
            {chuThemMoi}
          </Button>
        )}
      </Space>
    </div>
  );
};

export default ThanhTimKiemCongCu;
