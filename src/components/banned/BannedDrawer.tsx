'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input, Select, Button, Form, message, DatePicker } from 'antd';
import AppDrawer from '../common/AppDrawer';
import { bannedService } from '../../services/banned.service';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

const formSchema = z.object({
  mssv: z.string().min(8, { message: 'Mã số sinh viên phải có ít nhất 8 ký tự' }),
  fullName: z.string().min(3, { message: 'Họ tên phải có ít nhất 3 ký tự' }),
  reason: z.string().min(5, { message: 'Vui lòng nhập lý do hạn chế cụ thể' }),
  bannedDate: z.string().nonempty({ message: 'Vui lòng chọn ngày hạn chế' }),
  expiryDate: z.string().nonempty({ message: 'Vui lòng chọn ngày hết hạn' }),
  status: z.enum(['ACTIVE', 'EXPIRED']),
});

type FormValues = z.infer<typeof formSchema>;

interface BannedDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const BannedDrawer: React.FC<BannedDrawerProps> = ({ open, onClose }) => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mssv: '',
      fullName: '',
      reason: '',
      bannedDate: dayjs().format('YYYY-MM-DD'),
      expiryDate: dayjs().add(14, 'day').format('YYYY-MM-DD'),
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        mssv: '',
        fullName: '',
        reason: '',
        bannedDate: dayjs().format('YYYY-MM-DD'),
        expiryDate: dayjs().add(14, 'day').format('YYYY-MM-DD'),
        status: 'ACTIVE',
      });
    }
  }, [open, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      await bannedService.banStudent(data);
      message.success('Đã thêm sinh viên vào danh sách hạn chế thành công!');
      queryClient.invalidateQueries({ queryKey: ['bannedStudents'] });
      onClose();
    } catch (err) {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <AppDrawer
      title="Thêm Sinh viên vào Danh sách hạn chế"
      open={open}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} className="rounded-lg">
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit(onSubmit)}
            className="rounded-lg bg-[#1f5ca9] hover:bg-[#1a4e8f] border-none"
          >
            Lưu hạn chế
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Item
          label="Mã số sinh viên (MSSV)"
          validateStatus={errors.mssv ? 'error' : ''}
          help={errors.mssv?.message}
          required
        >
          <Controller
            name="mssv"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Nhập mã số sinh viên" className="rounded-md" />}
          />
        </Form.Item>

        <Form.Item
          label="Họ và tên sinh viên"
          validateStatus={errors.fullName ? 'error' : ''}
          help={errors.fullName?.message}
          required
        >
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Nhập họ và tên" className="rounded-md" />}
          />
        </Form.Item>

        <Form.Item
          label="Lý do hạn chế"
          validateStatus={errors.reason ? 'error' : ''}
          help={errors.reason?.message}
          required
        >
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} placeholder="Lý do chi tiết (ví dụ: Về trễ quá nhiều lần, gây gổ đánh nhau...)" rows={3} className="rounded-md" />
            )}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Ngày bắt đầu hạn chế"
            validateStatus={errors.bannedDate ? 'error' : ''}
            help={errors.bannedDate?.message}
            required
          >
            <Controller
              name="bannedDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  placeholder="Ngày bắt đầu"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                  className="rounded-md w-full"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Ngày hết hạn hạn chế"
            validateStatus={errors.expiryDate ? 'error' : ''}
            help={errors.expiryDate?.message}
            required
          >
            <Controller
              name="expiryDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  placeholder="Ngày hết hạn"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                  className="rounded-md w-full"
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Trạng thái hiệu lực"
          validateStatus={errors.status ? 'error' : ''}
          help={errors.status?.message}
          required
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: 'ACTIVE', label: 'Đang áp dụng hình phạt' },
                  { value: 'EXPIRED', label: 'Đã hết hạn phạt / Bãi bỏ' },
                ]}
                className="rounded-md w-full"
              />
            )}
          />
        </Form.Item>
      </Form>
    </AppDrawer>
  );
};

export default BannedDrawer;
