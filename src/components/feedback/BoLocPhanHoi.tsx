'use client';

import React from 'react';
import { Select } from 'antd';
import ThanhTimKiemCongCu from '@/components/common/ThanhTimKiemCongCu';

// Định nghĩa giao diện các thuộc tính cho Component Bộ lọc phản hồi
interface ThuocTinhBoLocPhanHoi {
  // Từ khóa tìm kiếm hiện tại
  tuKhoaTimKiem: string;

  // Trạng thái xử lý phản hồi đang được chọn
  trangThai: string;

  // Hàm xử lý khi từ khóa tìm kiếm thay đổi
  khiTimKiemThayDoi: (giaTri: string) => void;

  // Hàm xử lý khi trạng thái lọc thay đổi
  khiTrangThaiThayDoi: (giaTri: string) => void;

  // Hàm xử lý khi nhấn nút xuất Excel
  khiXuatFile: () => void;

  // Hàm xử lý khi nhấn nút làm mới bộ lọc
  khiLamMoi: () => void;
}

/**
 * Component Bộ lọc phản hồi (BoLocPhanHoi).
 * Chức năng: Cung cấp ô tìm kiếm nhanh và menu thả xuống để lọc phản hồi theo trạng thái (Chờ giải quyết, Đã giải quyết).
 */
export const BoLocPhanHoi: React.FC<ThuocTinhBoLocPhanHoi> = ({
  tuKhoaTimKiem,
  trangThai,
  khiTimKiemThayDoi,
  khiTrangThaiThayDoi,
  khiXuatFile,
  khiLamMoi,
}) => {
  return (
    <ThanhTimKiemCongCu
      chuGoiY="Tìm theo mã số sinh viên, tên hoặc nội dung..."
      giaTriTimKiem={tuKhoaTimKiem}
      khiGiaTriThayDoi={khiTimKiemThayDoi}
      khiNhanXuatExcel={khiXuatFile}
      khiNhanLamMoi={khiLamMoi}
      boLocBoSung={
        <Select
          placeholder="Trạng thái xử lý"
          value={trangThai || undefined}
          onChange={khiTrangThaiThayDoi}
          allowClear
          options={[
            { value: 'PENDING', label: 'Chờ giải quyết' },
            { value: 'RESOLVED', label: 'Đã giải quyết' },
          ]}
          style={{ width: 180 }}
          className="rounded-lg"
        />
      }
    />
  );
};

export default BoLocPhanHoi;
