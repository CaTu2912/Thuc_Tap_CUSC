'use client';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, DatePicker, Form, Input, Select, message } from 'antd';
import dayjs from 'dayjs';
import DrawerUngDung from '../common/DrawerUngDung';
import { dungKhoSinhVien } from '../../store/khoSinhVien';
import { dungSinhVien } from '../../hooks/dungSinhVien';
import { LUA_CHON_KTX, LUA_CHON_GIOI_TINH, LUA_CHON_TRANG_THAI } from '../../constants';

// Khai báo sơ đồ kiểm tra tính hợp lệ của biểu mẫu sinh viên (Zod Schema)
const soDoBieuMau = z.object({
  mssv: z.string().min(8, { message: 'Mã số sinh viên phải có ít nhất 8 ký tự' }),
  hoVaTen: z.string().min(3, { message: 'Họ tên phải có ít nhất 3 ký tự' }),
  ngaySinh: z.string().nonempty({ message: 'Vui lòng chọn ngày sinh' }),
  gioiTinh: z.enum(['Nam', 'Nữ'], { message: 'Vui lòng chọn giới tính' }),
  maKtx: z.string().nonempty({ message: 'Vui lòng chọn khu KTX' }),
  maPhong: z.string().nonempty({ message: 'Vui lòng chọn phòng' }),
  trangThai: z.enum(['ACTIVE', 'INACTIVE', 'BANNED']),
});

type GiaTriBieuMau = z.infer<typeof soDoBieuMau>;

// Giá trị mặc định ban đầu của biểu mẫu sinh viên
const giaTriMacDinh: GiaTriBieuMau = {
  mssv: '',
  hoVaTen: '',
  ngaySinh: '',
  gioiTinh: 'Nam',
  maKtx: '',
  maPhong: '',
  trangThai: 'ACTIVE',
};

/**
 * Component Drawer lập/sửa thông tin sinh viên nội trú (DrawerSinhVien).
 * Chức năng: Cho phép quản trị viên đăng ký sinh viên mới hoặc cập nhật hồ sơ sinh viên hiện hành.
 */
export const DrawerSinhVien: React.FC = () => {
  const { moDrawerSinhVien, datMoDrawerSinhVien, sinhVienDuocChon, datSinhVienDuocChon } = dungKhoSinhVien();
  const { taoSinhVien, capNhatSinhVien } = dungSinhVien();
  const laChinhSua = Boolean(sinhVienDuocChon);

  // Khởi tạo react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GiaTriBieuMau>({
    resolver: zodResolver(soDoBieuMau),
    defaultValues: giaTriMacDinh,
  });

  // Nạp dữ liệu sinh viên được chọn vào biểu mẫu khi mở
  useEffect(() => {
    if (! moDrawerSinhVien) {
      return;
    }

    if (sinhVienDuocChon) {
      reset({
        mssv: sinhVienDuocChon.mssv,
        hoVaTen: sinhVienDuocChon.hoVaTen,
        ngaySinh: sinhVienDuocChon.ngaySinh,
        gioiTinh: sinhVienDuocChon.gioiTinh,
        maKtx: sinhVienDuocChon.maKtx,
        maPhong: sinhVienDuocChon.maPhong,
        trangThai: sinhVienDuocChon.trangThai,
      });
      return;
    }

    reset(giaTriMacDinh);
  }, [moDrawerSinhVien, sinhVienDuocChon, reset]);

  // Hàm xử lý đóng drawer
  const xuLyDong = () => {
    datSinhVienDuocChon(null);
    datMoDrawerSinhVien(false);
  };

  // Hàm xử lý khi gửi biểu mẫu dữ liệu sinh viên
  const khiGửiBieuMau = async (duLieu: GiaTriBieuMau) => {
    try {
      const khuKtx = LUA_CHON_KTX.find((option) => option.value === duLieu.maKtx);
      const studentPayload = {
        ...duLieu,
        tenKtx: khuKtx?.label ?? duLieu.maKtx,
        tenPhong: `Phòng ${duLieu.maPhong}`,
        duongDanAnhDaiDien: sinhVienDuocChon?.duongDanAnhDaiDien || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        noPhi: sinhVienDuocChon?.noPhi || 0,
        dangCoMat: sinhVienDuocChon?.dangCoMat ?? true,
        thoiGianRaVaoCuoi: sinhVienDuocChon?.thoiGianRaVaoCuoi || dayjs().format('YYYY-MM-DD HH:mm:ss'),
      };

      if (sinhVienDuocChon) {
        // Cập nhật thông tin sinh viên nội trú hiện có
        await capNhatSinhVien({ mssv: sinhVienDuocChon.mssv, duLieu: studentPayload });
        message.success('Cập nhật sinh viên thành công!');
      } else {
        // Đăng ký mới sinh viên
        await taoSinhVien(studentPayload);
        message.success('Đăng ký sinh viên mới thành công!');
      }

      xuLyDong();
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <DrawerUngDung
      title={laChinhSua ? 'Chỉnh sửa thông tin sinh viên' : 'Đăng ký sinh viên mới'}
      open={moDrawerSinhVien}
      onClose={xuLyDong}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={xuLyDong} className="rounded-lg">
            Hủy
          </Button>
          <Button type="primary" onClick={handleSubmit(khiGửiBieuMau)} className="rounded-lg bg-[#1f5ca9] border-none">
            Lưu thông tin
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(khiGửiBieuMau)} className="space-y-4">
        <Form.Item label="Mã số sinh viên (MSSV)" validateStatus={errors.mssv ? 'error' : ''} help={errors.mssv?.message} required>
          <Controller name="mssv" control={control} render={({ field }) => {
            return <Input {...field} placeholder="Nhập mã số sinh viên" disabled={laChinhSua} className="rounded-md" />;
          }} />
        </Form.Item>

        <Form.Item label="Họ và tên" validateStatus={errors.hoVaTen ? 'error' : ''} help={errors.hoVaTen?.message} required>
          <Controller name="hoVaTen" control={control} render={({ field }) => {
            return <Input {...field} placeholder="Nhập họ tên" className="rounded-md" />;
          }} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Ngày sinh" validateStatus={errors.ngaySinh ? 'error' : ''} help={errors.ngaySinh?.message} required>
            <Controller
              name="ngaySinh"
              control={control}
              render={({ field }) => {
                return (
                  <DatePicker
                    placeholder="Chọn ngày sinh"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      return field.onChange(date ? date.format('YYYY-MM-DD') : '');
                    }}
                    className="rounded-md w-full"
                  />
                );
              }}
            />
          </Form.Item>

          <Form.Item label="Giới tính" validateStatus={errors.gioiTinh ? 'error' : ''} help={errors.gioiTinh?.message} required>
            <Controller name="gioiTinh" control={control} render={({ field }) => {
              return <Select {...field} placeholder="Giới tính" options={LUA_CHON_GIOI_TINH} className="rounded-md w-full" />;
            }} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Khu ký túc xá" validateStatus={errors.maKtx ? 'error' : ''} help={errors.maKtx?.message} required>
            <Controller name="maKtx" control={control} render={({ field }) => {
              return <Select {...field} placeholder="Chọn khu" options={LUA_CHON_KTX} className="rounded-md w-full" />;
            }} />
          </Form.Item>

          <Form.Item label="Phòng" validateStatus={errors.maPhong ? 'error' : ''} help={errors.maPhong?.message} required>
            <Controller name="maPhong" control={control} render={({ field }) => {
              return <Input {...field} placeholder="Nhập phòng" className="rounded-md" />;
            }} />
          </Form.Item>
        </div>

        <Form.Item label="Trạng thái" validateStatus={errors.trangThai ? 'error' : ''} help={errors.trangThai?.message} required>
          <Controller name="trangThai" control={control} render={({ field }) => {
            return <Select {...field} placeholder="Chọn trạng thái" options={LUA_CHON_TRANG_THAI} className="rounded-md w-full" />;
          }} />
        </Form.Item>
      </Form>
    </DrawerUngDung>
  );
};

export default DrawerSinhVien;
