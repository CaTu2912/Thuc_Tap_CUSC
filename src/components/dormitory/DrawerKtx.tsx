'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input, Select, Button, Form, message, InputNumber } from 'antd';
import DrawerUngDung from '../common/DrawerUngDung';
import { dungKhoSinhVien } from '../../store/khoSinhVien';
import { dichVuKtx } from '../../services/ktx.service';
import { useQueryClient } from '@tanstack/react-query';

// Khai báo sơ đồ kiểm tra tính hợp lệ của biểu mẫu khu nhà (Zod Schema)
const soDoBieuMau = z.object({
  id: z.string().min(2, { message: 'Mã KTX tối thiểu 2 ký tự' }),
  tenKtx: z.string().min(3, { message: 'Tên KTX tối thiểu 3 ký tự' }),
  soPhong: z.number().min(1, { message: 'Số phòng phải lớn hơn 0' }),
  sucChua: z.number().min(1, { message: 'Sức chứa phải lớn hơn 0' }),
  trangThai: z.enum(['ACTIVE', 'INACTIVE']),
});

type GiaTriBieuMau = z.infer<typeof soDoBieuMau>;

/**
 * Component Drawer lập/sửa thông tin khu nhà ký túc xá (DrawerKtx).
 * Chức năng: Cho phép người dùng thêm khu nhà mới hoặc cập nhật thông tin khu nhà hiện tại.
 */
export const DrawerKtx: React.FC = () => {
  const { moDrawerKtx, datMoDrawerKtx, ktxDuocChon, datKtxDuocChon } = dungKhoSinhVien();
  const boQuanLyTruyVan = useQueryClient();

  const laChinhSua = ! ! ktxDuocChon;

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
      tenKtx: '',
      soPhong: 10,
      sucChua: 80,
      trangThai: 'ACTIVE',
    },
  });

  // Tự động gán dữ liệu khu nhà được chọn vào biểu mẫu khi mở
  useEffect(() => {
    if (moDrawerKtx) {
      if (ktxDuocChon) {
        reset({
          id: ktxDuocChon.id,
          tenKtx: ktxDuocChon.tenKtx,
          soPhong: ktxDuocChon.soPhong,
          sucChua: ktxDuocChon.sucChua,
          trangThai: ktxDuocChon.trangThai,
        });
      } else {
        reset({
          id: '',
          tenKtx: '',
          soPhong: 10,
          sucChua: 80,
          trangThai: 'ACTIVE',
        });
      }
    }
  }, [moDrawerKtx, ktxDuocChon, reset]);

  // Hàm xử lý đóng drawer
  const xuLyDong = () => {
    datKtxDuocChon(null);
    datMoDrawerKtx(false);
  };

  // Hàm xử lý khi gửi biểu mẫu dữ liệu khu nhà
  const khiGửiBieuMau = async (duLieu: GiaTriBieuMau) => {
    try {
      if (laChinhSua) {
        // Cập nhật khu nhà hiện hữu
        await dichVuKtx.capNhatKtx(ktxDuocChon!.id, duLieu);
        message.success('Cập nhật khu ký túc xá thành công!');
      } else {
        // Tạo khu nhà mới
        await dichVuKtx.taoKtx(duLieu);
        message.success('Thêm khu ký túc xá thành công!');
      }
      // Yêu cầu làm mới dữ liệu
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['dormitories'] });
      xuLyDong();
    } catch (loi) {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <DrawerUngDung
      title={laChinhSua ? 'Chỉnh sửa Khu KTX' : 'Thêm mới Khu KTX'}
      open={moDrawerKtx}
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
        <Form.Item
          label="Mã khu KTX"
          validateStatus={errors.id ? 'error' : ''}
          help={errors.id?.message}
          required
        >
          <Controller
            name="id"
            control={control}
            render={({ field }) => {
              return <Input {...field} placeholder="Nhập mã khu (ví dụ: KTXA)" disabled={laChinhSua} className="rounded-md" />;
            }}
          />
        </Form.Item>

        <Form.Item
          label="Tên khu KTX"
          validateStatus={errors.tenKtx ? 'error' : ''}
          help={errors.tenKtx?.message}
          required
        >
          <Controller
            name="tenKtx"
            control={control}
            render={({ field }) => {
              return <Input {...field} placeholder="Nhập tên khu (ví dụ: Khu A)" className="rounded-md" />;
            }}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Số phòng"
            validateStatus={errors.soPhong ? 'error' : ''}
            help={errors.soPhong?.message}
            required
          >
            <Controller
              name="soPhong"
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
        </div>

        <Form.Item
          label="Trạng thái hoạt động"
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
                    { value: 'ACTIVE', label: 'Đang hoạt động' },
                    { value: 'INACTIVE', label: 'Tạm ngưng nhận sinh viên' },
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

export default DrawerKtx;
