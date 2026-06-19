'use client';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, TextInput, Select, Textarea, Drawer, Stack } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { dungKhoLichSu } from '../../store/khoLichSu';
import { dungLichSu } from '../../hooks/dungLichSu';
import { LUA_CHON_KTX } from '../../constants';
import { LichSuRaVao } from '../../types/LichSuRaVao';

// Định nghĩa lược đồ xác thực dữ liệu đầu vào biểu mẫu lịch sử ra vào
const luocDoBieuMau = z.object({
  mssv: z.string().min(8, { message: 'Mã số sinh viên phải gồm ít nhất 8 ký tự' }),
  hoVaTen: z.string().min(3, { message: 'Họ tên sinh viên phải gồm ít nhất 3 ký tự' }),
  maKtx: z.string().min(1, { message: 'Vui lòng chọn Khu KTX' }),
  maPhong: z.string().min(1, { message: 'Vui lòng chọn phòng' }),
  loai: z.enum(['IN', 'OUT'], { message: 'Vui lòng chọn loại ghi nhận' }),
  thietBi: z.string().min(1, { message: 'Vui lòng nhập thiết bị ghi nhận' }),
  ghiChu: z.string().optional(),
});

type GiaTriBieuMau = z.infer<typeof luocDoBieuMau>;

interface ThuocTinhDrawerBieuMauLichSu {
  open?: boolean;
  onClose?: () => void;
  onSave?: (duLieu: Omit<LichSuRaVao, 'id' | 'thoiGian'>) => Promise<void>;
  dangTao?: boolean;
}

/**
 * Component Ngăn kéo thêm mới lịch sử ra vào (DrawerBieuMauLichSu).
 * Chức năng: Cung cấp biểu mẫu điền thông tin và thực hiện gọi API để ghi nhận lịch sử ra vào mới của sinh viên.
 */
export const DrawerBieuMauLichSu: React.FC<ThuocTinhDrawerBieuMauLichSu> = ({
  open,
  onClose,
  onSave,
  dangTao: dangTaoProp,
}) => {
  // Lấy các hàm quản lý trạng thái mở rộng ngăn kéo từ store
  const { moDrawerBieuMau, datMoDrawerBieuMau } = dungKhoLichSu();

  // Gọi hook quản lý tác vụ lịch sử (tạo bản ghi)
  const { taoBanGhiLichSu, dangTao: dangTaoHook } = dungLichSu();

  // Xác định nguồn dữ liệu (từ props hoặc store/hook)
  const activeOpen = open !== undefined ? open : moDrawerBieuMau;
  const activeClose = onClose || (() => datMoDrawerBieuMau(false));
  const activeSave = onSave || taoBanGhiLichSu;
  const activeDangTao = dangTaoProp !== undefined ? dangTaoProp : dangTaoHook;

  // Khởi tạo các phương thức của react-hook-form kèm theo resolver từ Zod
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GiaTriBieuMau>({
    resolver: zodResolver(luocDoBieuMau),
    defaultValues: {
      mssv: '',
      hoVaTen: '',
      maKtx: '',
      maPhong: '',
      loai: 'IN',
      thietBi: 'Cổng chính - Cam 01',
      ghiChu: '',
    },
  });

  // Tự động làm mới dữ liệu trong biểu mẫu khi ngăn kéo bị đóng lại
  useEffect(() => {
    if (!activeOpen) {
      reset();
    }
  }, [activeOpen, reset]);

  // Hàm xử lý khi người dùng ấn nút lưu thông tin trên biểu mẫu
  const xuLyGuiBieuMau = async (duLieu: GiaTriBieuMau) => {
    try {
      const thongTinKtx = LUA_CHON_KTX.find((tuyChon) => {
        return tuyChon.value === duLieu.maKtx;
      });

      await activeSave({
        mssv: duLieu.mssv,
        hoVaTen: duLieu.hoVaTen,
        maKtx: duLieu.maKtx,
        tenKtx: thongTinKtx?.label ?? duLieu.maKtx,
        maPhong: duLieu.maPhong,
        tenPhong: `Phòng ${duLieu.maPhong}`,
        loai: duLieu.loai,
        thietBi: duLieu.thietBi,
        ghiChu: duLieu.ghiChu,
        duongDanAnhDaiDien: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      });

      alert('Thêm lịch sử ra vào thành công!');
      activeClose();
    } catch {
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const customChevron = <IconChevronDown size={16} className="text-zinc-400 pointer-events-none" />;

  return (
    <Drawer
      opened={activeOpen}
      onClose={activeClose}
      title={<span className="font-bold text-base text-zinc-800 font-sans">Ghi nhận lịch sử ra vào mới</span>}
      position="right"
      size={500}
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
      <Stack gap="md" className="font-sans">
        <form onSubmit={handleSubmit(xuLyGuiBieuMau)} className="space-y-4">
          <Controller
            name="mssv"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Mã số sinh viên (MSSV)"
                placeholder="Nhập mã số sinh viên (ví dụ: B2003789)"
                error={errors.mssv?.message}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="hoVaTen"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Họ và tên sinh viên"
                placeholder="Nhập họ và tên sinh viên"
                error={errors.hoVaTen?.message}
                required
                {...field}
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="maKtx"
              control={control}
              render={({ field }) => (
                <Select
                  label="Khu ký túc xá"
                  placeholder="Chọn khu"
                  data={LUA_CHON_KTX}
                  error={errors.maKtx?.message}
                  required
                  rightSection={customChevron}
                  {...field}
                />
              )}
            />

            <Controller
              name="maPhong"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="Phòng"
                  placeholder="Nhập phòng (ví dụ: 101)"
                  error={errors.maPhong?.message}
                  required
                  {...field}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="loai"
              control={control}
              render={({ field }) => (
                <Select
                  label="Loại ghi nhận"
                  placeholder="Vào hoặc ra"
                  data={[
                    { value: 'IN', label: 'Vào ký túc xá' },
                    { value: 'OUT', label: 'Ra ngoài' },
                  ]}
                  error={errors.loai?.message}
                  required
                  rightSection={customChevron}
                  {...field}
                />
              )}
            />

            <Controller
              name="thietBi"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="Thiết bị quét"
                  placeholder="Tên thiết bị ghi nhận"
                  error={errors.thietBi?.message}
                  required
                  {...field}
                />
              )}
            />
          </div>

          <Controller
            name="ghiChu"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Ghi chú thêm"
                placeholder="Ghi chú sự kiện nếu có"
                rows={3}
                error={errors.ghiChu?.message}
                {...field}
              />
            )}
          />

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="default"
              onClick={activeClose}
              className="rounded-lg"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              loading={activeDangTao}
              className="rounded-lg bg-[#1f5ca9] border-none text-white font-semibold cursor-pointer animate-none"
              style={{ backgroundColor: '#1f5ca9' }}
            >
              Lưu ghi nhận
            </Button>
          </div>
        </form>
      </Stack>
    </Drawer>
  );
};

export default DrawerBieuMauLichSu;
