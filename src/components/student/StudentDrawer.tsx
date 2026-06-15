'use client';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, DatePicker, Form, Input, Select, message } from 'antd';
import dayjs from 'dayjs';
import AppDrawer from '../common/AppDrawer';
import { useStudentStore } from '../../store/studentStore';
import { useStudents } from '../../hooks/useStudents';
import { DORMITORY_OPTIONS, GENDER_OPTIONS, STATUS_OPTIONS } from '../../constants';

const formSchema = z.object({
  mssv: z.string().min(8, { message: 'Mã số sinh viên phải có ít nhất 8 ký tự' }),
  fullName: z.string().min(3, { message: 'Họ tên phải có ít nhất 3 ký tự' }),
  dateOfBirth: z.string().nonempty({ message: 'Vui lòng chọn ngày sinh' }),
  gender: z.enum(['Nam', 'Nữ'], { message: 'Vui lòng chọn giới tính' }),
  dormitoryId: z.string().nonempty({ message: 'Vui lòng chọn khu KTX' }),
  roomId: z.string().nonempty({ message: 'Vui lòng chọn phòng' }),
  status: z.enum(['ACTIVE', 'INACTIVE', 'BANNED']),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  mssv: '',
  fullName: '',
  dateOfBirth: '',
  gender: 'Nam',
  dormitoryId: '',
  roomId: '',
  status: 'ACTIVE',
};

export const StudentDrawer: React.FC = () => {
  const { studentDrawerOpen, setStudentDrawerOpen, selectedStudent, setSelectedStudent } = useStudentStore();
  const { createStudent, updateStudent } = useStudents();
  const isEdit = Boolean(selectedStudent);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!studentDrawerOpen) return;

    if (selectedStudent) {
      reset({
        mssv: selectedStudent.mssv,
        fullName: selectedStudent.fullName,
        dateOfBirth: selectedStudent.dateOfBirth,
        gender: selectedStudent.gender,
        dormitoryId: selectedStudent.dormitoryId,
        roomId: selectedStudent.roomId,
        status: selectedStudent.status,
      });
      return;
    }

    reset(defaultValues);
  }, [studentDrawerOpen, selectedStudent, reset]);

  const handleClose = () => {
    setSelectedStudent(null);
    setStudentDrawerOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const dormitory = DORMITORY_OPTIONS.find((option) => option.value === data.dormitoryId);
      const studentPayload = {
        ...data,
        dormitoryName: dormitory?.label ?? data.dormitoryId,
        roomName: `Phòng ${data.roomId}`,
        avatarUrl: selectedStudent?.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        feeDebt: selectedStudent?.feeDebt || 0,
        present: selectedStudent?.present ?? true,
        lastAccessTime: selectedStudent?.lastAccessTime || dayjs().format('YYYY-MM-DD HH:mm:ss'),
      };

      if (selectedStudent) {
        await updateStudent({ mssv: selectedStudent.mssv, data: studentPayload });
        message.success('Cập nhật sinh viên thành công!');
      } else {
        await createStudent(studentPayload);
        message.success('Thêm sinh viên thành công!');
      }

      handleClose();
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <AppDrawer
      title={isEdit ? 'Chỉnh sửa thông tin sinh viên' : 'Đăng ký sinh viên mới'}
      open={studentDrawerOpen}
      onClose={handleClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={handleClose} className="rounded-lg">
            Hủy
          </Button>
          <Button type="primary" onClick={handleSubmit(onSubmit)} className="rounded-lg bg-[#1f5ca9] border-none">
            Lưu thông tin
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Item label="Mã số sinh viên (MSSV)" validateStatus={errors.mssv ? 'error' : ''} help={errors.mssv?.message} required>
          <Controller name="mssv" control={control} render={({ field }) => <Input {...field} placeholder="Nhập mã số sinh viên" disabled={isEdit} className="rounded-md" />} />
        </Form.Item>

        <Form.Item label="Họ và tên" validateStatus={errors.fullName ? 'error' : ''} help={errors.fullName?.message} required>
          <Controller name="fullName" control={control} render={({ field }) => <Input {...field} placeholder="Nhập họ tên" className="rounded-md" />} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Ngày sinh" validateStatus={errors.dateOfBirth ? 'error' : ''} help={errors.dateOfBirth?.message} required>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker
                  placeholder="Chọn ngày sinh"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                  className="rounded-md w-full"
                />
              )}
            />
          </Form.Item>

          <Form.Item label="Giới tính" validateStatus={errors.gender ? 'error' : ''} help={errors.gender?.message} required>
            <Controller name="gender" control={control} render={({ field }) => <Select {...field} placeholder="Giới tính" options={GENDER_OPTIONS} className="rounded-md w-full" />} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Khu ký túc xá" validateStatus={errors.dormitoryId ? 'error' : ''} help={errors.dormitoryId?.message} required>
            <Controller name="dormitoryId" control={control} render={({ field }) => <Select {...field} placeholder="Chọn khu" options={DORMITORY_OPTIONS} className="rounded-md w-full" />} />
          </Form.Item>

          <Form.Item label="Phòng" validateStatus={errors.roomId ? 'error' : ''} help={errors.roomId?.message} required>
            <Controller name="roomId" control={control} render={({ field }) => <Input {...field} placeholder="Nhập phòng" className="rounded-md" />} />
          </Form.Item>
        </div>

        <Form.Item label="Trạng thái" validateStatus={errors.status ? 'error' : ''} help={errors.status?.message} required>
          <Controller name="status" control={control} render={({ field }) => <Select {...field} placeholder="Chọn trạng thái" options={STATUS_OPTIONS} className="rounded-md w-full" />} />
        </Form.Item>
      </Form>
    </AppDrawer>
  );
};

export default StudentDrawer;
