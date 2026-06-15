'use client';

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import TheBieuDo from '../common/TheBieuDo';
import { DuLieuBieuDoTronKtx } from '../../types/BangDieuKhien';

// Định nghĩa giao diện thuộc tính cho Biểu đồ tròn phân bố theo khu nhà
interface ThuocTinhBieuDoTronKtx {
  // Mảng dữ liệu phân bố sinh viên
  duLieu?: DuLieuBieuDoTronKtx[];

  // Trạng thái đang tải dữ liệu (tùy chọn)
  dangTai?: boolean;
}

// Bảng màu phân bố cột/vùng biểu đồ khớp với ảnh chụp
const MAU_SAC_BIEU_DO = ['#1f5ca9', '#52C41A', '#ED8936', '#805AD5'];

/**
 * Component Biểu đồ tròn phân bổ sinh viên (BieuDoTronKtx).
 * Chức năng: Vẽ biểu đồ tròn dạng Donut (Pie Chart) thể hiện tỷ lệ phần trăm phân bố sinh viên cư trú giữa các dãy nhà KTX.
 */
export const BieuDoTronKtx: React.FC<ThuocTinhBieuDoTronKtx> = ({ duLieu = [], dangTai = false }) => {
  // Tính tổng số sinh viên để hiển thị động
  const tongSo = duLieu.reduce((t, muc) => {
    return t + muc.giaTri;
  }, 0);

  return (
    <TheBieuDo
      tieuDe="THỐNG KÊ THEO KHU KTX"
      dangTai={dangTai}
      chieuCao={320}
    >
      {duLieu.length === 0 ? (
        <span className="text-zinc-400">Không có dữ liệu</span>
      ) : (
        <div className="flex flex-col h-full w-full justify-between">
          <div className="flex flex-1 items-center justify-between gap-4">
            <div className="w-[50%] h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={duLieu}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="giaTri"
                    nameKey="ten"
                  >
                    {duLieu.map((_, chiSo) => {
                      return <Cell key={`cell-${chiSo}`} fill={MAU_SAC_BIEU_DO[chiSo % MAU_SAC_BIEU_DO.length]} />;
                    })}
                  </Pie>
                  <Tooltip
                    formatter={(val) => {
                      return [`${val} sinh viên`, 'Sức chứa'];
                    }}
                    contentStyle={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-readex-pro), sans-serif',
                      borderRadius: '6px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-[50%] flex flex-col gap-2.5 font-sans text-xs">
              {duLieu.map((muc, chiSo) => {
                const phanTram = tongSo > 0 ? ((muc.giaTri / tongSo) * 100).toFixed(1).replace('.', ',') : '0,0';
                return (
                  <div key={muc.ten} className="flex items-center justify-between text-zinc-700">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span 
                        className="w-3 h-3 rounded-xs shrink-0" 
                        style={{ backgroundColor: MAU_SAC_BIEU_DO[chiSo % MAU_SAC_BIEU_DO.length] }}
                      ></span>
                      <span>{muc.ten}</span>
                    </div>
                    <span className="font-semibold text-zinc-800">
                      {muc.giaTri} <span className="text-zinc-400 font-normal">({phanTram}%)</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-zinc-100 pt-2.5 text-xs font-sans mt-2">
            <span className="text-zinc-500 font-medium mx-auto pl-10">
              Tổng: <span className="font-bold text-zinc-800">{tongSo.toLocaleString('vi-VN')} sinh viên</span>
            </span>
            <a href="/categories/dormitories" className="text-[#1f5ca9] font-bold hover:underline shrink-0">
              Xem chi tiết
            </a>
          </div>
        </div>
      )}
    </TheBieuDo>
  );
};

export default BieuDoTronKtx;
