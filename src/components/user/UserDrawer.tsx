'use client';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Form, Input, Select, message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import AppDrawer from '../common/AppDrawer';
import { useStudentStore } from '../../store/studentStore';
import { ROLE_OPTIONS, STATUS_OPTIONS } from '../../constants';
import type { User } from '../../types/User';

const formSchema = z.object({
  username: z.string().min(4, { message: 'Tên đăng nhập tối thiểu 4 ký tự' }),
  fullName: z.string().min(3, { message: 'Họ tên tối thiểu 3 ký tự' }),
  email: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
  role: z.enum(['ADMIN', 'MANAGER', 'OPERATOR']),
  status: z.enum(['ACTIVE', 'INACTIVE']),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  username: '',
  fullName: '',
  email: '',
  role: 'OPERATOR',
  status: 'ACTIVE',
};

export const UserDrawer: React.FC = () => {
  const { userDrawerOpen, setUserDrawerOpen, selectedUser, setSelectedUser } = useStudentStore();
  const queryClient = useQueryClient();
  const isEdit = Boolean(selectedUser);

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
    if (!userDrawerOpen) return;

    reset(
      selectedUser
        ? {
            username: selectedUser.username,
            fullName: selectedUser.fullName,
            email: selectedUser.email,
            role: selectedUser.role,
            status: selectedUser.status,
          }
        : defaultValues,
    );
  }, [userDrawerOpen, selectedUser, reset]);

  const handleClose = () => {
    setSelectedUser(null);
    setUserDrawerOpen(false);
  };

  const updateUsersCache = (updater: (users: User[]) => User[]) => {
    queryClient.setQueriesData<User[]>({ queryKey: ['users'] }, (oldUsers) => updater(oldUsers ?? []));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (selectedUser) {
        updateUsersCache((users) =>
          users.map((user) => (user.id === selectedUser.id ? { ...user, ...data } : user)),
        );
        message.success('Cập nhật tài khoản hệ thống thành công!');
      } else {
        updateUsersCache((users) => {
          const nextIndex = users.length + 1;
          const newUser: User = {
            id: `U${String(nextIndex).padStart(3, '0')}`,
            ...data,
            createdAt: '2026-06-13',
          };

          return [newUser, ...users];
        });
        message.success('Thêm tài khoản hệ thống thành công!');
      }

      queryClient.invalidateQueries({ queryKey: ['users'] });
      handleClose();
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <AppDrawer
      title={isEdit ? 'Chỉnh sửa tài khoản' : 'Tạo tài khoản mới'}
      open={userDrawerOpen}
      onClose={handleClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={handleClose} className="rounded-lg">
            Hủy
          </Button>
          <Button type="primary" onClick={handleSubmit(onSubmit)} className="rounded-lg bg-[#1f5ca9] border-none">
            Lưu tài khoản
          </Button>
        </div>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Item label="Tên đăng nhập" validateStatus={errors.username ? 'error' : ''} help={errors.username?.message} required>
          <Controller name="username" control={control} render={({ field }) => <Input {...field} placeholder="Nhập tên đăng nhập" disabled={isEdit} className="rounded-md" />} />
        </Form.Item>

        <Form.Item label="Họ và tên" validateStatus={errors.fullName ? 'error' : ''} help={errors.fullName?.message} required>
          <Controller name="fullName" control={control} render={({ field }) => <Input {...field} placeholder="Nhập họ và tên đầy đủ" className="rounded-md" />} />
        </Form.Item>

        <Form.Item label="Địa chỉ email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message} required>
          <Controller name="email" control={control} render={({ field }) => <Input {...field} placeholder="Nhập email công vụ hoặc email sinh viên" className="rounded-md" />} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Vai trò" validateStatus={errors.role ? 'error' : ''} help={errors.role?.message} required>
            <Controller name="role" control={control} render={({ field }) => <Select {...field} options={ROLE_OPTIONS} className="rounded-md w-full" />} />
          </Form.Item>

          <Form.Item label="Trạng thái tài khoản" validateStatus={errors.status ? 'error' : ''} help={errors.status?.message} required>
            <Controller name="status" control={control} render={({ field }) => <Select {...field} options={STATUS_OPTIONS} className="rounded-md w-full" />} />
          </Form.Item>
        </div>
      </Form>
    </AppDrawer>
  );
};

export default UserDrawer;
