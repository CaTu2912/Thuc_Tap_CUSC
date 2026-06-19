'use client';

import React from 'react';
import { Card, Image, Button, Drawer, Stack } from '@mantine/core';
import { dungKhoLichSu } from '../../store/khoLichSu';
import NhanTrangThai from '../common/NhanTrangThai';

/**
 * Component Ngăn kéo hiển thị thông tin chi tiết lượt ra vào (DrawerChiTietLichSu).
 * Chức năng: Lấy thông tin bản ghi lịch sử được chọn từ Zustand store và hiển thị chi tiết (ảnh sinh viên, ảnh chụp camera, thông tin cá nhân).
 */
export const DrawerChiTietLichSu: React.FC = () => {
  // Trích xuất các trạng thái cần thiết từ store lịch sử ra vào
  const { moDrawerChiTiet, datMoDrawerChiTiet, lichSuDuocChon } = dungKhoLichSu();

  // Nếu không có bản ghi nào được chọn thì không hiển thị gì
  if (!lichSuDuocChon) {
    return null;
  }

  return (
    <Drawer
      opened={moDrawerChiTiet}
      onClose={() => datMoDrawerChiTiet(false)}
      title={<span className="font-bold text-base text-zinc-800 font-sans">Chi tiết Lịch sử Ra/Vào</span>}
      position="right"
      size={600}
      styles={{
        header: {
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 24px',
          backgroundColor: '#fdfdfd',
        },
        body: {
          padding: '24px',
        },
      }}
    >
      <Stack gap="lg" className="font-sans">
        {/* Phần so sánh ảnh chân dung giữa hồ sơ và camera thực tế */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            withBorder
            className="bg-zinc-50/50 border-zinc-100 rounded-lg overflow-hidden text-center"
            padding="xs"
          >
            <div className="text-xs font-bold text-zinc-500 mb-2">Ảnh Hồ sơ Sinh viên</div>
            <Image
              src={lichSuDuocChon.duongDanAnhDaiDien || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=250'}
              alt="Hồ sơ"
              radius="md"
              className="object-cover max-h-[180px] mx-auto"
            />
          </Card>

          <Card
            withBorder
            className="bg-zinc-50/50 border-zinc-100 rounded-lg overflow-hidden text-center"
            padding="xs"
          >
            <div className="text-xs font-bold text-zinc-500 mb-2">Ảnh chụp Camera</div>
            <Image
              src={lichSuDuocChon.duongDanAnhChup || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=250'}
              alt="Camera chụp"
              radius="md"
              className="object-cover max-h-[180px] mx-auto"
            />
          </Card>
        </div>

        {/* Thông tin mô tả chi tiết của sự kiện ra vào */}
        <div className="border border-zinc-200 rounded-lg overflow-hidden text-sm">
          <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 font-bold text-zinc-800">
            Thông tin chi tiết
          </div>
          <div className="divide-y divide-zinc-200">
            {[
              { label: 'Mã số sinh viên (MSSV)', value: <span className="font-mono font-bold text-zinc-700">{lichSuDuocChon.mssv}</span> },
              { label: 'Họ và tên', value: <span className="font-bold text-zinc-800">{lichSuDuocChon.hoVaTen}</span> },
              { label: 'Khu ký túc xá', value: lichSuDuocChon.tenKtx },
              { label: 'Phòng sinh hoạt', value: lichSuDuocChon.tenPhong },
              { label: 'Loại sự kiện', value: <NhanTrangThai trangThai={lichSuDuocChon.loai} /> },
              { label: 'Thời gian ghi nhận', value: lichSuDuocChon.thoiGian },
              { label: 'Thiết bị ghi nhận', value: lichSuDuocChon.thietBi },
              { label: 'Ghi chú hệ thống', value: <span className="text-zinc-500 italic text-xs">{lichSuDuocChon.ghiChu || 'Không có ghi chú thêm.'}</span> },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row border-zinc-200">
                <div className="w-full sm:w-44 bg-zinc-50/50 px-4 py-2.5 font-semibold text-zinc-600 border-b sm:border-b-0 sm:border-r border-zinc-200 shrink-0">
                  {item.label}
                </div>
                <div className="px-4 py-2.5 text-zinc-800 flex-1">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            variant="default"
            onClick={() => datMoDrawerChiTiet(false)}
            className="rounded-lg cursor-pointer"
          >
            Đóng cửa sổ
          </Button>
        </div>
      </Stack>
    </Drawer>
  );
};

export default DrawerChiTietLichSu;
