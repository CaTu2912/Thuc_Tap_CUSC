'use client';

import React from 'react';
import BangDuLieu from '@/components/common/BangDuLieu';
import { layCotBangPhanHoi } from '@/components/feedback/CotBangPhanHoi';
import type { PhanHoi } from '@/types/PhanHoi';

// Định nghĩa giao diện thuộc tính cho Component Bảng phản hồi sinh viên
interface ThuocTinhBangPhanHoi {
  // Mảng dữ liệu chứa danh sách các phản hồi
  duLieu: PhanHoi[];

  // Trạng thái đang tải dữ liệu
  dangTai: boolean;

  // Hàm xử lý khi nhấn đánh dấu giải quyết phản hồi
  onGiaiQuyet: (id: string) => void;

  // Hàm xử lý khi nhấn xóa phản hồi
  onXoa: (id: string) => void;
}

/**
 * Component Bảng danh sách phản hồi sinh viên (BangPhanHoi).
 * Chức năng: Render bảng danh sách phản hồi, kết hợp với các cột được định nghĩa sẵn và dữ liệu truyền vào.
 */
export const BangPhanHoi: React.FC<ThuocTinhBangPhanHoi> = ({
  duLieu,
  dangTai,
  onGiaiQuyet,
  onXoa,
}) => {
  // Khởi tạo các cột của bảng dựa trên các hàm xử lý hành động
  const cotBang = layCotBangPhanHoi({ onGiaiQuyet, onXoa });

  return (
    <BangDuLieu<PhanHoi>
      columns={cotBang}
      dataSource={duLieu}
      dangTai={dangTai}
      rowKey="id"
    />
  );
};

export default BangPhanHoi;
