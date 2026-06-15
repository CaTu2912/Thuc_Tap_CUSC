'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import TheBieuDo from '../common/TheBieuDo';
import { SinhVienRaVaoNhieuNhat } from '../../types/ThongKe';

// Định nghĩa giao diện thuộc tính cho Component Biểu đồ sinh viên ra vào nhiều nhất
interface ThuocTinhBieuDoSinhVienRaVaoNhieu {
  // Mảng dữ liệu sinh viên ra vào nhiều nhất
  duLieu?: SinhVienRaVaoNhieuNhat[];

  // Trạng thái đang tải dữ liệu (tùy chọn)
  dangTai?: boolean;
}

/**
 * Component Biểu đồ sinh viên ra vào nhiều nhất (BieuDoSinhVienRaVaoNhieu).
 * Chức năng: Vẽ biểu đồ cột ngang (Horizontal Bar Chart) hiển thị danh sách top 5 sinh viên có lượt quét thẻ ra vào KTX nhiều nhất.
 */
export const BieuDoSinhVienRaVaoNhieu: React.FC<ThuocTinhBieuDoSinhVienRaVaoNhieu> = ({
  duLieu = [],
  dangTai = false,
}) => {
  // Định dạng lại dữ liệu cho thư viện Recharts vẽ biểu đồ cột ngang
  const duLieuDinhDang = duLieu.slice(0, 5).map((dong) => {
    return {
      ten: dong.hoVaTen,
      soLuong: dong.soLuotRaVao,
      thongTin: `${dong.mssv} - ${dong.tenKtx}`,
    };
  });

  return (
    <TheBieuDo
      tieuDe="Top 5 Sinh viên ra vào nhiều nhất"
      phuDe="Số lượt quét thẻ/vân tay ghi nhận trong tháng này"
      dangTai={dangTai}
      chieuCao={280}
    >
      {duLieuDinhDang.length === 0 ? (
        <span className="text-zinc-400">Không có dữ liệu</span>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={duLieuDinhDang}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
            <XAxis type="number" stroke="#A0AEC0" fontSize={11} tickLine={false} />
            <YAxis
              dataKey="ten"
              type="category"
              stroke="#4A5568"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip
              formatter={(giaTri) => {
                return [`${giaTri} Lượt`, 'Tần suất'];
              }}
              contentStyle={{
                backgroundColor: '#FFF',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              labelFormatter={(tenHienThi) => {
                return `Sinh viên: ${tenHienThi}`;
              }}
            />
            <Bar dataKey="soLuong" radius={[0, 4, 4, 0]} barSize={14}>
              {duLieuDinhDang.map((_, chiSo) => {
                return (
                  <Cell
                    key={`cell-${chiSo}`}
                    fill={chiSo === 0 ? '#1f5ca9' : '#00afef'}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </TheBieuDo>
  );
};

export default BieuDoSinhVienRaVaoNhieu;
