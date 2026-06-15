'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input, Select, Button, Form, message, InputNumber } from 'antd';
import DrawerUngDung from '../common/DrawerUngDung';
import { dungKhoSinhVien } from '../../store/khoSinhVien';
import { dichVuPhong } from '../../services/phong.service';
import { LUA_CHON_KTX } from '../../constants';
import { useQueryClient } from '@tanstack/react-query';

// Khai báo sơ đồ kiểm tra tính hợp lệ của biểu mẫu phòng (Zod Schema)
const soDoBieuMau = z.object({
  id: z.string().min(2, { message: 'Mã phòng tối thiểu 2 ký tự' }),
  tenPhong: z.string().min(3, { message: 'Tên phòng tối thiểu 3 ký tự' }),
  maKtx: z.string().nonempty({ message: 'Vui lòng chọn Khu KTX' }),
  tang: z.number().min(1, { message: 'Số tầng phải lớn hơn 0' }),
  sucChua: z.number().min(1, { message: 'Sức chứa phải lớn hơn 0' }),
  soNguoiO: z.number().min(0, { message: 'Số người hiện tại không thể âm' }),
  trangThai: z.enum(['AVAILABLE', 'FULL', 'MAINTENANCE']),
});

type GiaTriBieuMau = z.infer<typeof soDoBieuMau>;

/**
 * Component Drawer lập/sửa thông tin phòng ở ký túc xá (DrawerPhong).
 * Chức năng: Quản lý biểu mẫu thông tin chi tiết phòng, tự động gán dữ liệu và lưu lên API giả lập.
 */
export const DrawerPhong: React.FC = () => {
  const { moDrawerPhong, datMoDrawerPhong, phongDuocChon, datPhongDuocChon } = dungKhoSinhVien();
  const boQuanLyTruyVan = useQueryClient();

  const laChinhSua = ! ! phongDuocChon;

  // Khởi tạo react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GiaTriBieuMau>({
    resolver: zodResolver(soDoBieuMau),
    defaultValues: {
      id: '',
      tenPhong: '',
      maKtx: '',
      tang: 1,
      sucChua: 8,
      soNguoiO: 0,
      trangThai: 'AVAILABLE',
    },
  });

  // Tự động nạp dữ liệu phòng được chọn vào biểu mẫu khi mở
  useEffect(() => {
    if (moDrawerPhong) {
      if (phongDuocChon) {
        reset({
          id: phongDuocChon.id,
          tenPhong: phongDuocChon.tenPhong,
          maKtx: phongDuocChon.maKtx,
          tang: phongDuocChon.tang,
          sucChua: phongDuocChon.sucChua,
          soNguoiO: phongDuocChon.soNguoiO,
          trangThai: phongDuocChon.trangThai,
        });
      } else {
        reset({
          id: '',
          tenPhong: '',
          maKtx: '',
          tang: 1,
          sucChua: 8,
          soNguoiO: 0,
          trangThai: 'AVAILABLE',
        });
      }
    }
  }, [moDrawerPhong, phongDuocChon, reset]);

  // Hàm xử lý đóng drawer
  const xuLyDong = () => {
    datPhongDuocChon(null);
    datMoDrawerPhong(false);
  };

  // Hàm xử lý khi gửi biểu mẫu dữ liệu phòng ở
  const khiGửiBieuMau = async (duLieu: GiaTriBieuMau) => {
    try {
      const luaChonKtx = LUA_CHON_KTX.find((o) => o.value === duLieu.maKtx);
      const thongTinGui = {
        ...duLieu,
        tenKtx: luaChonKtx ? luaChonKtx.label : duLieu.maKtx,
      };

      if (laChinhSua) {
        // Gọi dịch vụ cập nhật thông tin phòng
        await dichVuPhong.capNhatPhong(phongDuocChon!.id, thongTinGui);
        message.success('Cập nhật phòng thành công!');
      } else {
        // Gọi dịch vụ tạo mới phòng
        await dichVuPhong.taoPhong(thongTinGui);
        message.success('Thêm phòng thành công!');
      }
      // Yêu cầu làm mới các truy vấn liên quan đến phòng
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['rooms'] });
      xuLyDong();
    } catch (loi) {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <DrawerUngDung
      title={laChinhSua ? 'Chỉnh sửa Phòng' : 'Thêm mới Phòng'}
      open={moDrawerPhong}
      onClose={xuLyDong}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={xuLyDong} className="rounded-lg">
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit(khiGửiBieuMau)}
            className="rounded-lg bg-[#1f5ca9] hover:bg-[#1a4e8f] border-none"
          >
            Lưu thông tin
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(khiGửiBieuMau)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Mã phòng"
            validateStatus={errors.id ? 'error' : ''}
            help={errors.id?.message}
            required
          >
            <Controller
              name="id"
              control={control}
              render={({ field }) => {
                return <Input {...field} placeholder="Nhập mã phòng" disabled={laChinhSua} className="rounded-md" />;
              }}
            />
          </Form.Item>

          <Form.Item
            label="Tên phòng"
            validateStatus={errors.tenPhong ? 'error' : ''}
            help={errors.tenPhong?.message}
            required
          >
            <Controller
              name="tenPhong"
              control={control}
              render={({ field }) => {
                return <Input {...field} placeholder="Tên phòng (ví dụ: Phòng 101)" className="rounded-md" />;
              }}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
                    placeholder="Chọn Khu"
                    options={LUA_CHON_KTX}
                    className="rounded-md w-full"
                  />
                );
              }}
            />
          </Form.Item>

          <Form.Item
            label="Tầng"
            validateStatus={errors.tang ? 'error' : ''}
            help={errors.tang?.message}
            required
          >
            <Controller
              name="tang"
              control={control}
              render={({ field }) => {
                return (
                  <InputNumber
                    {...field}
                    min={1}
                    className="rounded-md w-full"
                    onChange={(val) => {
                      return field.onChange(val || 0);
                    }}
                  />
                );
              }}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Sức chứa (Người)"
            validateStatus={errors.sucChua ? 'error' : ''}
            help={errors.sucChua?.message}
            required
          >
            <Controller
              name="sucChua"
              control={control}
              render={({ field }) => {
                return (
                  <InputNumber
                    {...field}
                    min={1}
                    className="rounded-md w-full"
                    onChange={(val) => {
                      return field.onChange(val || 0);
                    }}
                  />
                );
              }}
            />
          </Form.Item>

          <Form.Item
            label="Số người hiện tại"
            validateStatus={errors.soNguoiO ? 'error' : ''}
            help={errors.soNguoiO?.message}
            required
          >
            <Controller
              name="soNguoiO"
              control={control}
              render={({ field }) => {
                return (
                  <InputNumber
                    {...field}
                    min={0}
                    className="rounded-md w-full"
                    onChange={(val) => {
                      return field.onChange(val || 0);
                    }}
                  />
                );
              }}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Trạng thái phòng"
          validateStatus={errors.trangThai ? 'error' : ''}
          help={errors.trangThai?.message}
          required
        >
          <Controller
            name="trangThai"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  options={[
                    { value: 'AVAILABLE', label: 'Còn trống' },
                    { value: 'FULL', label: 'Đã đầy' },
                    { value: 'MAINTENANCE', label: 'Bảo trì' },
                  ]}
                  className="rounded-md w-full"
                />
              );
            }}
          />
        </Form.Item>
      </Form>
    </DrawerUngDung>
  );
};

export default DrawerPhong;
