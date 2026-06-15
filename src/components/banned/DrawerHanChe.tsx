'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input, Select, Button, Form, message, DatePicker } from 'antd';
import DrawerUngDung from '../common/DrawerUngDung';
import { dichVuHanCheRaVao } from '../../services/hanCheRaVao.service';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

// Khai báo sơ đồ kiểm tra tính hợp lệ của biểu mẫu phạt (Zod Schema)
const soDoBieuMau = z.object({
  mssv: z.string().min(8, { message: 'Mã số sinh viên phải có ít nhất 8 ký tự' }),
  hoVaTen: z.string().min(3, { message: 'Họ tên phải có ít nhất 3 ký tự' }),
  lyDo: z.string().min(5, { message: 'Vui lòng nhập lý do hạn chế cụ thể' }),
  ngayHanChe: z.string().nonempty({ message: 'Vui lòng chọn ngày hạn chế' }),
  ngayHetHan: z.string().nonempty({ message: 'Vui lòng chọn ngày hết hạn' }),
  trangThai: z.enum(['ACTIVE', 'EXPIRED']),
});

type GiaTriBieuMau = z.infer<typeof soDoBieuMau>;

// Giao diện thuộc tính của Drawer quản lý hạn chế ra vào
interface ThuocTinhDrawerHanChe {
  // Trạng thái mở/đóng của drawer
  mo: boolean;

  // Hàm xử lý khi đóng drawer
  khiDong: () => void;
}

/**
 * Component Drawer lập lệnh hạn chế ra vào của sinh viên (DrawerHanChe).
 * Chức năng: Cho phép quản trị viên nhập thông tin kỷ luật hạn chế ra vào của sinh viên, kiểm tra dữ liệu và gửi lên máy chủ giả lập.
 */
export const DrawerHanChe: React.FC<ThuocTinhDrawerHanChe> = ({ mo, khiDong }) => {
  const boQuanLyTruyVan = useQueryClient();

  // Khởi tạo react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GiaTriBieuMau>({
    resolver: zodResolver(soDoBieuMau),
    defaultValues: {
      mssv: '',
      hoVaTen: '',
      lyDo: '',
      ngayHanChe: dayjs().format('YYYY-MM-DD'),
      ngayHetHan: dayjs().add(14, 'day').format('YYYY-MM-DD'),
      trangThai: 'ACTIVE',
    },
  });

  // Tự động thiết lập lại dữ liệu mặc định khi drawer được mở
  useEffect(() => {
    if (mo) {
      reset({
        mssv: '',
        hoVaTen: '',
        lyDo: '',
        ngayHanChe: dayjs().format('YYYY-MM-DD'),
        ngayHetHan: dayjs().add(14, 'day').format('YYYY-MM-DD'),
        trangThai: 'ACTIVE',
      });
    }
  }, [mo, reset]);

  // Hàm xử lý gửi biểu mẫu
  const khiGửiBieuMau = async (duLieu: GiaTriBieuMau) => {
    try {
      // Gọi dịch vụ thêm lệnh cấm ra vào mới
      await dichVuHanCheRaVao.hanCheSinhVien(duLieu);
      message.success('Đã thêm sinh viên vào danh sách hạn chế thành công!');
      
      // Yêu cầu tải lại danh sách sinh viên bị hạn chế ở các thành phần liên quan
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['bannedStudents'] });
      khiDong();
    } catch (loi) {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <DrawerUngDung
      title="Thêm Sinh viên vào Danh sách hạn chế"
      open={mo}
      onClose={khiDong}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={khiDong} className="rounded-lg">
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit(khiGửiBieuMau)}
            className="rounded-lg bg-[#1f5ca9] hover:bg-[#1a4e8f] border-none"
          >
            Lưu hạn chế
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(khiGửiBieuMau)} className="space-y-4">
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
              return <Input {...field} placeholder="Nhập mã số sinh viên" className="rounded-md" />;
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
              return <Input {...field} placeholder="Nhập họ và tên" className="rounded-md" />;
            }}
          />
        </Form.Item>

        <Form.Item
          label="Lý do hạn chế"
          validateStatus={errors.lyDo ? 'error' : ''}
          help={errors.lyDo?.message}
          required
        >
          <Controller
            name="lyDo"
            control={control}
            render={({ field }) => {
              return (
                <Input.TextArea {...field} placeholder="Lý do chi tiết (ví dụ: Về trễ quá nhiều lần, gây gổ đánh nhau...)" rows={3} className="rounded-md" />
              );
            }}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Ngày bắt đầu hạn chế"
            validateStatus={errors.ngayHanChe ? 'error' : ''}
            help={errors.ngayHanChe?.message}
            required
          >
            <Controller
              name="ngayHanChe"
              control={control}
              render={({ field }) => {
                return (
                  <DatePicker
                    placeholder="Ngày bắt đầu"
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

          <Form.Item
            label="Ngày hết hạn hạn chế"
            validateStatus={errors.ngayHetHan ? 'error' : ''}
            help={errors.ngayHetHan?.message}
            required
          >
            <Controller
              name="ngayHetHan"
              control={control}
              render={({ field }) => {
                return (
                  <DatePicker
                    placeholder="Ngày hết hạn"
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
        </div>

        <Form.Item
          label="Trạng thái hiệu lực"
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
                    { value: 'ACTIVE', label: 'Đang áp dụng hình phạt' },
                    { value: 'EXPIRED', label: 'Đã hết hạn phạt / Bãi bỏ' },
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

export default DrawerHanChe;
