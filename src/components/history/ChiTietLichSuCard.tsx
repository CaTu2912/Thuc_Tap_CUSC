'use client';

import React from 'react';
import { Button } from 'antd';
import { LichSuRaVao } from '../../types/LichSuRaVao';
import { layNhanTrangThai } from './BangLichSu';
import type { LoaiTabHienThi } from './BangLichSu';
import dayjs from 'dayjs';

// Định nghĩa giao diện thuộc tính cho Component Chi tiết lịch sử ra vào
interface ThuocTinhChiTietLichSuCard {
  // Bản ghi lịch sử ra vào đang được lựa chọn để xem chi tiết
  lichSuDuocChon: LichSuRaVao | null;

  // Loại tab hiện tại để xác định màu trạng thái
  loaiTab?: LoaiTabHienThi;

  // Hàm callback khi người dùng bấm nút Đóng
  khiDong: () => void;

  // Hàm callback khi người dùng bấm nút Phản hồi sai thông tin
  khiPhanHoi: (lichSu: LichSuRaVao) => void;
}

/**
 * Component Thẻ thông tin chi tiết quét thẻ ra vào (ChiTietLichSuCard).
 * Chức năng: Hiển thị ảnh chân dung lớn và thông tin cụ thể của bản ghi được chọn.
 */
export const ChiTietLichSuCard: React.FC<ThuocTinhChiTietLichSuCard> = ({
  lichSuDuocChon,
  loaiTab = 'LICH_SU',
  khiDong,
  khiPhanHoi,
}) => {
  // Nếu không có bản ghi nào được chọn, hiển thị thông báo rỗng
  if (!lichSuDuocChon) {
    return (
      <div className="bg-white rounded-xl border border-zinc-200 p-6 flex flex-col items-center justify-center h-full min-h-[350px] text-zinc-400">
        <p className="text-sm font-medium text-center">
          Vui lòng chọn một dòng lịch sử để xem thông tin chi tiết
        </p>
      </div>
    );
  }

  // Xác định đường dẫn ảnh chân dung
  const duongDanAnh =
    lichSuDuocChon.duongDanAnhChup ||
    lichSuDuocChon.duongDanAnhDaiDien ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200';

  // Định dạng mốc thời gian hiển thị
  const thoiGianDinhDang = dayjs(lichSuDuocChon.thoiGian).format('DD/MM/YYYY HH:mm:ss');

  // Lấy nhãn và màu sắc trạng thái theo tab
  const { nhan: nhanTrangThai, mauSac } = layNhanTrangThai(lichSuDuocChon, loaiTab);

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm flex flex-col h-full">
      {/* Tiêu đề */}
      <h3 className="text-[#00afef] font-bold text-sm uppercase tracking-wide mb-4 pb-2 border-b border-zinc-100">
        Thông tin chi tiết
      </h3>

      {/* Ảnh chân dung lớn */}
      <div className="flex justify-center mb-5">
        <div className="relative w-full max-w-[220px] aspect-[3/4] rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50">
          <img
            src={duongDanAnh}
            alt={lichSuDuocChon.hoVaTen}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Danh sách thông tin chi tiết */}
      <div className="flex-1 space-y-2.5 text-sm mb-5">
        <div className="flex items-start gap-2">
          <span className="text-zinc-500 font-medium shrink-0 w-24">MSSV:</span>
          <span className="text-zinc-800 font-semibold">{lichSuDuocChon.mssv}</span>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-zinc-500 font-medium shrink-0 w-24">Họ Tên:</span>
          <span className="text-zinc-800 font-semibold">{lichSuDuocChon.hoVaTen}</span>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-zinc-500 font-medium shrink-0 w-24">KTX:</span>
          <span className="text-zinc-700 font-medium">{lichSuDuocChon.tenKtx}</span>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-zinc-500 font-medium shrink-0 w-24">Thời gian:</span>
          <span className="text-zinc-700 font-medium">{thoiGianDinhDang}</span>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-zinc-500 font-medium shrink-0 w-24">Phòng:</span>
          <span className="text-zinc-700 font-medium">{lichSuDuocChon.tenPhong}</span>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-zinc-500 font-medium shrink-0 w-24">Trạng thái:</span>
          <span className={`font-bold ${mauSac}`}>{nhanTrangThai}</span>
        </div>
      </div>

      {/* Nút thao tác */}
      <div className="mt-auto pt-3 border-t border-zinc-100">
        <Button
          type="primary"
          block
          onClick={() => khiPhanHoi(lichSuDuocChon)}
          className="bg-[#00afef] hover:bg-[#0092c7] border-none text-white text-sm font-semibold h-9 rounded-md"
        >
          Phản hồi sai thông tin
        </Button>
      </div>
    </div>
  );
};

export default ChiTietLichSuCard;
