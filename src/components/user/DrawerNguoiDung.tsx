'use client';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Form, Input, Select, message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import DrawerUngDung from '../common/DrawerUngDung';
import { dungKhoSinhVien } from '../../store/khoSinhVien';
import { LUA_CHON_VAI_TRO, LUA_CHON_TRANG_THAI } from '../../constants';
import type { NguoiDung } from '../../types/NguoiDung';

// Khai báo sơ đồ kiểm tra tính hợp lệ của biểu mẫu tài khoản hệ thống (Zod Schema)
const soDoBieuMau = z.object({
  tenDangNhap: z.string().min(4, { message: 'Tên đăng nhập tối thiểu 4 ký tự' }),
  hoVaTen: z.string().min(3, { message: 'Họ tên tối thiểu 3 ký tự' }),
  email: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
  vaiTro: z.enum(['ADMIN', 'MANAGER', 'OPERATOR']),
  trangThai: z.enum(['ACTIVE', 'INACTIVE']),
});

type GiaTriBieuMau = z.infer<typeof soDoBieuMau>;

// Giá trị mặc định ban đầu của biểu mẫu tài khoản
const giaTriMacDinh: GiaTriBieuMau = {
  tenDangNhap: '',
  hoVaTen: '',
  email: '',
  vaiTro: 'OPERATOR',
  trangThai: 'ACTIVE',
};

/**
 * Component Drawer lập/sửa tài khoản quản trị hệ thống (DrawerNguoiDung).
 * Chức năng: Cho phép quản trị viên cấp phát tài khoản mới hoặc cập nhật thông tin và vai trò của tài khoản hiện tại.
 */
export const DrawerNguoiDung: React.FC = () => {
  const { moDrawerNguoiDung, datMoDrawerNguoiDung, nguoiDungDuocChon, datNguoiDungDuocChon } = dungKhoSinhVien();
  const boQuanLyTruyVan = useQueryClient();
  const laChinhSua = Boolean(nguoiDungDuocChon);

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

  // Nạp dữ liệu tài khoản được chọn vào biểu mẫu khi mở
  useEffect(() => {
    if (! moDrawerNguoiDung) {
      return;
    }

    reset(
      nguoiDungDuocChon
        ? {
            tenDangNhap: nguoiDungDuocChon.tenDangNhap,
            hoVaTen: nguoiDungDuocChon.hoVaTen,
            email: nguoiDungDuocChon.email,
            vaiTro: nguoiDungDuocChon.vaiTro,
            trangThai: nguoiDungDuocChon.trangThai,
          }
        : giaTriMacDinh,
    );
  }, [moDrawerNguoiDung, nguoiDungDuocChon, reset]);

  // Hàm xử lý đóng drawer
  const xuLyDong = () => {
    datNguoiDungDuocChon(null);
    datMoDrawerNguoiDung(false);
  };

  // Hàm cập nhật bộ nhớ cache danh sách người dùng của React Query
  const capNhatBoNhoDemNguoiDung = (capNhat: (danhSach: NguoiDung[]) => NguoiDung[]) => {
    boQuanLyTruyVan.setQueriesData<NguoiDung[]>({ queryKey: ['users'] }, (danhSachCu) => {
      return capNhat(danhSachCu ?? []);
    });
  };

  // Hàm xử lý khi gửi biểu mẫu dữ liệu tài khoản
  const khiGửiBieuMau = async (duLieu: GiaTriBieuMau) => {
    try {
      if (nguoiDungDuocChon) {
        // Cập nhật tài khoản hiện hành trong bộ nhớ cache
        capNhatBoNhoDemNguoiDung((danhSach) => {
          return danhSach.map((nguoiDung) => {
            return nguoiDung.id === nguoiDungDuocChon.id ? { ...nguoiDung, ...duLieu } : nguoiDung;
          });
        });
        message.success('Cập nhật tài khoản hệ thống thành công!');
      } else {
        // Cấp phát tài khoản mới
        capNhatBoNhoDemNguoiDung((danhSach) => {
          const chiSoTiepTheo = danhSach.length + 1;
          const nguoiDungMoi: NguoiDung = {
            id: `U${String(chiSoTiepTheo).padStart(3, '0')}`,
            ...duLieu,
            ngayTao: '2026-06-13',
          };

          return [nguoiDungMoi, ...danhSach];
        });
        message.success('Thêm tài khoản hệ thống thành công!');
      }

      // Đánh dấu hết hạn cache để đồng bộ lại dữ liệu
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['users'] });
      xuLyDong();
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <DrawerUngDung
      title={laChinhSua ? 'Chỉnh sửa tài khoản' : 'Tạo tài khoản mới'}
      open={moDrawerNguoiDung}
      onClose={xuLyDong}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={xuLyDong} className="rounded-lg">
            Hủy
          </Button>
          <Button type="primary" onClick={handleSubmit(khiGửiBieuMau)} className="rounded-lg bg-[#1f5ca9] border-none">
            Lưu tài khoản
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(khiGửiBieuMau)} className="space-y-4">
        <Form.Item label="Tên đăng nhập" validateStatus={errors.tenDangNhap ? 'error' : ''} help={errors.tenDangNhap?.message} required>
          <Controller name="tenDangNhap" control={control} render={({ field }) => {
            return <Input {...field} placeholder="Nhập tên đăng nhập" disabled={laChinhSua} className="rounded-md" />;
          }} />
        </Form.Item>

        <Form.Item label="Họ và tên" validateStatus={errors.hoVaTen ? 'error' : ''} help={errors.hoVaTen?.message} required>
          <Controller name="hoVaTen" control={control} render={({ field }) => {
            return <Input {...field} placeholder="Nhập họ và tên đầy đủ" className="rounded-md" />;
          }} />
        </Form.Item>

        <Form.Item label="Địa chỉ email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message} required>
          <Controller name="email" control={control} render={({ field }) => {
            return <Input {...field} placeholder="Nhập email công vụ hoặc email sinh viên" className="rounded-md" />;
          }} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Vai trò" validateStatus={errors.vaiTro ? 'error' : ''} help={errors.vaiTro?.message} required>
            <Controller name="vaiTro" control={control} render={({ field }) => {
              return <Select {...field} options={LUA_CHON_VAI_TRO} className="rounded-md w-full" />;
            }} />
          </Form.Item>

          <Form.Item label="Trạng thái tài khoản" validateStatus={errors.trangThai ? 'error' : ''} help={errors.trangThai?.message} required>
            <Controller name="trangThai" control={control} render={({ field }) => {
              return <Select {...field} options={LUA_CHON_TRANG_THAI} className="rounded-md w-full" />;
            }} />
          </Form.Item>
        </div>
      </Form>
    </DrawerUngDung>
  );
};

export default DrawerNguoiDung;
