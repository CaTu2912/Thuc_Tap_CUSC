'use client';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Form, Input, Select, message } from 'antd';
import DrawerUngDung from '../common/DrawerUngDung';
import { dungKhoLichSu } from '../../store/khoLichSu';
import { dungLichSu } from '../../hooks/dungLichSu';
import { LUA_CHON_KTX } from '../../constants';

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

/**
 * Component Ngăn kéo thêm mới lịch sử ra vào (DrawerBieuMauLichSu).
 * Chức năng: Cung cấp biểu mẫu điền thông tin và thực hiện gọi API để ghi nhận lịch sử ra vào mới của sinh viên.
 */
export const DrawerBieuMauLichSu: React.FC = () => {
  // Lấy các hàm quản lý trạng thái mở rộng ngăn kéo từ store
  const { moDrawerBieuMau, datMoDrawerBieuMau } = dungKhoLichSu();

  // Gọi hook quản lý tác vụ lịch sử (tạo bản ghi)
  const { taoBanGhiLichSu, dangTao } = dungLichSu();

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
    if (!moDrawerBieuMau) {
      reset();
    }
  }, [moDrawerBieuMau, reset]);

  // Hàm xử lý khi người dùng ấn nút lưu thông tin trên biểu mẫu
  const xuLyGuiBieuMau = async (duLieu: GiaTriBieuMau) => {
    try {
      const thongTinKtx = LUA_CHON_KTX.find((tuyChon) => {
        return tuyChon.value === duLieu.maKtx;
      });

      await taoBanGhiLichSu({
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

      message.success('Thêm lịch sử ra vào thành công!');
      datMoDrawerBieuMau(false);
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <DrawerUngDung
      title="Ghi nhận lịch sử ra vào mới"
      open={moDrawerBieuMau}
      onClose={() => {
        return datMoDrawerBieuMau(false);
      }}
      footer={
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              return datMoDrawerBieuMau(false);
            }}
            className="rounded-lg"
          >
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit(xuLyGuiBieuMau)}
            loading={dangTao}
            className="rounded-lg bg-[#1f5ca9] border-none"
          >
            Lưu ghi nhận
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(xuLyGuiBieuMau)} className="space-y-4">
        <Form.Item
          label="Mã số sinh viên (MSSV)"
          validateStatus={errors.mssv ? 'error' : ''}
          help={errors.mssv?.message}
          required
        >
          <Controller
            name="mssv"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  placeholder="Nhập mã số sinh viên (ví dụ: B2003789)"
                  className="rounded-md"
                />
              );
            }}
          />
        </Form.Item>

        <Form.Item
          label="Họ và tên sinh viên"
          validateStatus={errors.hoVaTen ? 'error' : ''}
          help={errors.hoVaTen?.message}
          required
        >
          <Controller
            name="hoVaTen"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  placeholder="Nhập họ và tên sinh viên"
                  className="rounded-md"
                />
              );
            }}
          />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Khu ký túc xá"
            validateStatus={errors.maKtx ? 'error' : ''}
            help={errors.maKtx?.message}
            required
          >
            <Controller
              name="maKtx"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    placeholder="Chọn khu"
                    options={LUA_CHON_KTX}
                    className="rounded-md w-full"
                  />
                );
              }}
            />
          </Form.Item>

          <Form.Item
            label="Phòng"
            validateStatus={errors.maPhong ? 'error' : ''}
            help={errors.maPhong?.message}
            required
          >
            <Controller
              name="maPhong"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    placeholder="Nhập phòng (ví dụ: 101)"
                    className="rounded-md"
                  />
                );
              }}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Loại ghi nhận"
            validateStatus={errors.loai ? 'error' : ''}
            help={errors.loai?.message}
            required
          >
            <Controller
              name="loai"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    placeholder="Vào hoặc ra"
                    options={[
                      { value: 'IN', label: 'Vào ký túc xá' },
                      { value: 'OUT', label: 'Ra ngoài' },
                    ]}
                    className="rounded-md w-full"
                  />
                );
              }}
            />
          </Form.Item>

          <Form.Item
            label="Thiết bị quét"
            validateStatus={errors.thietBi ? 'error' : ''}
            help={errors.thietBi?.message}
            required
          >
            <Controller
              name="thietBi"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    placeholder="Tên thiết bị ghi nhận"
                    className="rounded-md"
                  />
                );
              }}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Ghi chú thêm"
          validateStatus={errors.ghiChu ? 'error' : ''}
          help={errors.ghiChu?.message}
        >
          <Controller
            name="ghiChu"
            control={control}
            render={({ field }) => {
              return (
                <Input.TextArea
                  {...field}
                  placeholder="Ghi chú sự kiện nếu có"
                  rows={3}
                  className="rounded-md"
                />
              );
            }}
          />
        </Form.Item>
      </Form>
    </DrawerUngDung>
  );
};

export default DrawerBieuMauLichSu;
