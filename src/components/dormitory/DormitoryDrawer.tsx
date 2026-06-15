'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input, Select, Button, Form, message, InputNumber } from 'antd';
import AppDrawer from '../common/AppDrawer';
import { useStudentStore } from '../../store/studentStore';
import { dormitoryService } from '../../services/dormitory.service';
import { useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  id: z.string().min(2, { message: 'Mã KTX tối thiểu 2 ký tự' }),
  name: z.string().min(3, { message: 'Tên KTX tối thiểu 3 ký tự' }),
  numberOfRooms: z.number().min(1, { message: 'Số phòng phải lớn hơn 0' }),
  capacity: z.number().min(1, { message: 'Sức chứa phải lớn hơn 0' }),
  status: z.enum(['ACTIVE', 'INACTIVE']),
});

type FormValues = z.infer<typeof formSchema>;

export const DormitoryDrawer: React.FC = () => {
  const { dormitoryDrawerOpen, setDormitoryDrawerOpen, selectedDormitory, setSelectedDormitory } = useStudentStore();
  const queryClient = useQueryClient();

  const isEdit = !!selectedDormitory;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      name: '',
      numberOfRooms: 10,
      capacity: 80,
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    if (dormitoryDrawerOpen) {
      if (selectedDormitory) {
        reset({
          id: selectedDormitory.id,
          name: selectedDormitory.name,
          numberOfRooms: selectedDormitory.numberOfRooms,
          capacity: selectedDormitory.capacity,
          status: selectedDormitory.status,
        });
      } else {
        reset({
          id: '',
          name: '',
          numberOfRooms: 10,
          capacity: 80,
          status: 'ACTIVE',
        });
      }
    }
  }, [dormitoryDrawerOpen, selectedDormitory, reset]);

  const handleClose = () => {
    setSelectedDormitory(null);
    setDormitoryDrawerOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEdit) {
        await dormitoryService.updateDormitory(selectedDormitory!.id, data);
        message.success('Cập nhật khu ký túc xá thành công!');
      } else {
        await dormitoryService.createDormitory(data);
        message.success('Thêm khu ký túc xá thành công!');
      }
      queryClient.invalidateQueries({ queryKey: ['dormitories'] });
      handleClose();
    } catch (err) {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <AppDrawer
      title={isEdit ? 'Chỉnh sửa Khu KTX' : 'Thêm mới Khu KTX'}
      open={dormitoryDrawerOpen}
      onClose={handleClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={handleClose} className="rounded-lg">
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit(onSubmit)}
            className="rounded-lg bg-[#1f5ca9] hover:bg-[#1a4e8f] border-none"
          >
            Lưu thông tin
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Item
          label="Mã khu KTX"
          validateStatus={errors.id ? 'error' : ''}
          help={errors.id?.message}
          required
        >
          <Controller
            name="id"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Nhập mã khu (ví dụ: KTXA)" disabled={isEdit} className="rounded-md" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Tên khu KTX"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
          required
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Nhập tên khu (ví dụ: Khu A)" className="rounded-md" />}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Số phòng"
            validateStatus={errors.numberOfRooms ? 'error' : ''}
            help={errors.numberOfRooms?.message}
            required
          >
            <Controller
              name="numberOfRooms"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  min={1}
                  className="rounded-md w-full"
                  onChange={(val) => field.onChange(val || 0)}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Sức chứa (Người)"
            validateStatus={errors.capacity ? 'error' : ''}
            help={errors.capacity?.message}
            required
          >
            <Controller
              name="capacity"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  min={1}
                  className="rounded-md w-full"
                  onChange={(val) => field.onChange(val || 0)}
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Trạng thái hoạt động"
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
                  { value: 'ACTIVE', label: 'Đang hoạt động' },
                  { value: 'INACTIVE', label: 'Tạm ngưng nhận sinh viên' },
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

export default DormitoryDrawer;
