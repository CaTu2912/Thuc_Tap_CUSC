'use client';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Form, Input, Select, message } from 'antd';
import AppDrawer from '../common/AppDrawer';
import { useHistoryStore } from '../../store/historyStore';
import { useHistory } from '../../hooks/useHistory';
import { DORMITORY_OPTIONS } from '../../constants';

const formSchema = z.object({
  mssv: z.string().min(8, { message: 'Mã số sinh viên phải gồm ít nhất 8 ký tự' }),
  fullName: z.string().min(3, { message: 'Họ tên sinh viên phải gồm ít nhất 3 ký tự' }),
  dormitoryId: z.string().nonempty({ message: 'Vui lòng chọn Khu KTX' }),
  roomId: z.string().nonempty({ message: 'Vui lòng chọn phòng' }),
  type: z.enum(['IN', 'OUT'], { message: 'Vui lòng chọn loại ghi nhận' }),
  device: z.string().nonempty({ message: 'Vui lòng nhập thiết bị ghi nhận' }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const HistoryDrawer: React.FC = () => {
  const { formDrawerOpen, setFormDrawerOpen } = useHistoryStore();
  const { createHistory, isCreating } = useHistory();

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
      dormitoryId: '',
      roomId: '',
      type: 'IN',
      device: 'Cổng chính - Cam 01',
      notes: '',
    },
  });

  useEffect(() => {
    if (!formDrawerOpen) reset();
  }, [formDrawerOpen, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const dormitory = DORMITORY_OPTIONS.find((option) => option.value === data.dormitoryId);
      await createHistory({
        mssv: data.mssv,
        fullName: data.fullName,
        dormitoryId: data.dormitoryId,
        dormitoryName: dormitory?.label ?? data.dormitoryId,
        roomId: data.roomId,
        roomName: `Phòng ${data.roomId}`,
        type: data.type,
        device: data.device,
        notes: data.notes,
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      });
      message.success('Thêm lịch sử ra vào thành công!');
      setFormDrawerOpen(false);
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <AppDrawer
      title="Ghi nhận lịch sử ra vào mới"
      open={formDrawerOpen}
      onClose={() => setFormDrawerOpen(false)}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={() => setFormDrawerOpen(false)} className="rounded-lg">
            Hủy
          </Button>
          <Button type="primary" onClick={handleSubmit(onSubmit)} loading={isCreating} className="rounded-lg bg-[#1f5ca9] border-none">
            Lưu ghi nhận
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Item label="Mã số sinh viên (MSSV)" validateStatus={errors.mssv ? 'error' : ''} help={errors.mssv?.message} required>
          <Controller name="mssv" control={control} render={({ field }) => <Input {...field} placeholder="Nhập mã số sinh viên (ví dụ: B2003789)" className="rounded-md" />} />
        </Form.Item>

        <Form.Item label="Họ và tên sinh viên" validateStatus={errors.fullName ? 'error' : ''} help={errors.fullName?.message} required>
          <Controller name="fullName" control={control} render={({ field }) => <Input {...field} placeholder="Nhập họ và tên sinh viên" className="rounded-md" />} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Khu ký túc xá" validateStatus={errors.dormitoryId ? 'error' : ''} help={errors.dormitoryId?.message} required>
            <Controller name="dormitoryId" control={control} render={({ field }) => <Select {...field} placeholder="Chọn khu" options={DORMITORY_OPTIONS} className="rounded-md w-full" />} />
          </Form.Item>

          <Form.Item label="Phòng" validateStatus={errors.roomId ? 'error' : ''} help={errors.roomId?.message} required>
            <Controller name="roomId" control={control} render={({ field }) => <Input {...field} placeholder="Nhập phòng (ví dụ: 101)" className="rounded-md" />} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Loại ghi nhận" validateStatus={errors.type ? 'error' : ''} help={errors.type?.message} required>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Vào hoặc ra"
                  options={[
                    { value: 'IN', label: 'Vào ký túc xá' },
                    { value: 'OUT', label: 'Ra ngoài' },
                  ]}
                  className="rounded-md w-full"
                />
              )}
            />
          </Form.Item>

          <Form.Item label="Thiết bị quét" validateStatus={errors.device ? 'error' : ''} help={errors.device?.message} required>
            <Controller name="device" control={control} render={({ field }) => <Input {...field} placeholder="Tên thiết bị ghi nhận" className="rounded-md" />} />
          </Form.Item>
        </div>

        <Form.Item label="Ghi chú thêm" validateStatus={errors.notes ? 'error' : ''} help={errors.notes?.message}>
          <Controller name="notes" control={control} render={({ field }) => <Input.TextArea {...field} placeholder="Ghi chú sự kiện nếu có" rows={3} className="rounded-md" />} />
        </Form.Item>
      </Form>
    </AppDrawer>
  );
};

export default HistoryDrawer;
