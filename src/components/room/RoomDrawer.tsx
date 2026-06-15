'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input, Select, Button, Form, message, InputNumber } from 'antd';
import AppDrawer from '../common/AppDrawer';
import { useStudentStore } from '../../store/studentStore';
import { roomService } from '../../services/room.service';
import { DORMITORY_OPTIONS } from '../../constants';
import { useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  id: z.string().min(2, { message: 'Mã phòng tối thiểu 2 ký tự' }),
  name: z.string().min(3, { message: 'Tên phòng tối thiểu 3 ký tự' }),
  dormitoryId: z.string().nonempty({ message: 'Vui lòng chọn Khu KTX' }),
  floor: z.number().min(1, { message: 'Số tầng phải lớn hơn 0' }),
  capacity: z.number().min(1, { message: 'Sức chứa phải lớn hơn 0' }),
  currentOccupants: z.number().min(0, { message: 'Số người hiện tại không thể âm' }),
  status: z.enum(['AVAILABLE', 'FULL', 'MAINTENANCE']),
});

type FormValues = z.infer<typeof formSchema>;

export const RoomDrawer: React.FC = () => {
  const { roomDrawerOpen, setRoomDrawerOpen, selectedRoom, setSelectedRoom } = useStudentStore();
  const queryClient = useQueryClient();

  const isEdit = !!selectedRoom;

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
      dormitoryId: '',
      floor: 1,
      capacity: 8,
      currentOccupants: 0,
      status: 'AVAILABLE',
    },
  });

  useEffect(() => {
    if (roomDrawerOpen) {
      if (selectedRoom) {
        reset({
          id: selectedRoom.id,
          name: selectedRoom.name,
          dormitoryId: selectedRoom.dormitoryId,
          floor: selectedRoom.floor,
          capacity: selectedRoom.capacity,
          currentOccupants: selectedRoom.currentOccupants,
          status: selectedRoom.status,
        });
      } else {
        reset({
          id: '',
          name: '',
          dormitoryId: '',
          floor: 1,
          capacity: 8,
          currentOccupants: 0,
          status: 'AVAILABLE',
        });
      }
    }
  }, [roomDrawerOpen, selectedRoom, reset]);

  const handleClose = () => {
    setSelectedRoom(null);
    setRoomDrawerOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const dormOption = DORMITORY_OPTIONS.find(o => o.value === data.dormitoryId);
      const payload = {
        ...data,
        dormitoryName: dormOption ? dormOption.label : data.dormitoryId,
      };

      if (isEdit) {
        await roomService.updateRoom(selectedRoom!.id, payload);
        message.success('Cập nhật phòng thành công!');
      } else {
        await roomService.createRoom(payload);
        message.success('Thêm phòng thành công!');
      }
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      handleClose();
    } catch (err) {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <AppDrawer
      title={isEdit ? 'Chỉnh sửa Phòng' : 'Thêm mới Phòng'}
      open={roomDrawerOpen}
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
              render={({ field }) => (
                <Input {...field} placeholder="Nhập mã phòng" disabled={isEdit} className="rounded-md" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Tên phòng"
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
            required
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Tên phòng (ví dụ: Phòng 101)" className="rounded-md" />}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Khu ký túc xá"
            validateStatus={errors.dormitoryId ? 'error' : ''}
            help={errors.dormitoryId?.message}
            required
          >
            <Controller
              name="dormitoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Chọn Khu"
                  options={DORMITORY_OPTIONS}
                  className="rounded-md w-full"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Tầng"
            validateStatus={errors.floor ? 'error' : ''}
            help={errors.floor?.message}
            required
          >
            <Controller
              name="floor"
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

        <div className="grid grid-cols-2 gap-4">
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

          <Form.Item
            label="Số người hiện tại"
            validateStatus={errors.currentOccupants ? 'error' : ''}
            help={errors.currentOccupants?.message}
            required
          >
            <Controller
              name="currentOccupants"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  min={0}
                  className="rounded-md w-full"
                  onChange={(val) => field.onChange(val || 0)}
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Trạng thái phòng"
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
                  { value: 'AVAILABLE', label: 'Còn trống' },
                  { value: 'FULL', label: 'Đã đầy' },
                  { value: 'MAINTENANCE', label: 'Bảo trì' },
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

export default RoomDrawer;
