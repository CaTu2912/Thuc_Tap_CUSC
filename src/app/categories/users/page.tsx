'use client';

import React, { useState } from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import PageHeader from '../../../components/common/PageHeader';
import SearchToolbar from '../../../components/common/SearchToolbar';
import DataTable from '../../../components/common/DataTable';
import StatusTag from '../../../components/common/StatusTag';
import ConfirmDelete from '../../../components/common/ConfirmDelete';
import UserDrawer from '../../../components/user/UserDrawer';
import { useStudentStore } from '../../../store/studentStore';
import { Space, Button, Tooltip, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { User } from '../../../types/User';
import { mockUsers } from '../../../mocks/student.mock';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { exportToExcel } from '../../../utils/excel';

export default function UsersCategoryPage() {
  const [search, setSearch] = useState('');
  const { setUserDrawerOpen, setSelectedUser } = useStudentStore();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', search],
    queryFn: async () => {
      // Simulate API call to fetch users
      let result = [...mockUsers];
      if (search) {
        result = result.filter(u => 
          u.username.toLowerCase().includes(search.toLowerCase()) ||
          u.fullName.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
        );
      }
      return result;
    },
  });

  const handleAddClick = () => {
    setSelectedUser(null);
    setUserDrawerOpen(true);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setUserDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // In mock data, delete from mockUsers
      const idx = mockUsers.findIndex(u => u.id === id);
      if (idx !== -1) {
        mockUsers.splice(idx, 1);
      }
      message.success('Xóa tài khoản hệ thống thành công!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    } catch (err) {
      message.error('Có lỗi xảy ra khi xóa.');
    }
  };

  const handleExport = () => {
    const dataToExport = users.map((u, index) => ({
      'STT': index + 1,
      'Tên tài khoản': u.username,
      'Họ và tên': u.fullName,
      'Địa chỉ Email': u.email,
      'Vai trò': u.role === 'ADMIN' ? 'Quản trị hệ thống' : u.role === 'MANAGER' ? 'Điều phối viên' : 'Trực ban',
      'Trạng thái': u.status === 'ACTIVE' ? 'Đang hoạt động' : 'Tạm khóa',
      'Ngày tạo tài khoản': u.createdAt,
    }));
    exportToExcel(dataToExport, `Danh_Sach_Tai_Khoan_He_Thong_${new Date().toISOString().split('T')[0]}`, 'Tài khoản');
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <span className="font-semibold text-xs text-zinc-700">{text}</span>,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <span className="font-bold text-xs text-zinc-800">{text}</span>,
    },
    {
      title: 'Địa chỉ Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span className="text-xs text-zinc-500">{text}</span>,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        if (role === 'ADMIN') return <span className="text-xs text-rose-500 font-bold">Quản trị hệ thống</span>;
        if (role === 'MANAGER') return <span className="text-xs text-blue-500 font-bold">Điều phối viên</span>;
        return <span className="text-xs text-zinc-500 font-medium">Trực ban</span>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <span className="text-xs text-zinc-400">{text}</span>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Space size={8}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditClick(record)}
              className="text-[#1f5ca9] hover:bg-sky-50"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <div>
              <ConfirmDelete onConfirm={() => handleDelete(record.id)}>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  className="hover:bg-red-50"
                />
              </ConfirmDelete>
            </div>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Quản lý Tài Khoản Hệ Thống"
        description="Phân quyền tài khoản quản lý và giám sát vận hành các thiết bị ra vào"
      />

      <SearchToolbar
        placeholder="Tìm theo tài khoản, tên hoặc email..."
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={handleAddClick}
        onExportClick={handleExport}
        onResetClick={() => setSearch('')}
        addText="Thêm tài khoản"
      />

      <DataTable<User>
        columns={columns}
        dataSource={users}
        loading={isLoading}
        rowKey="id"
      />

      <UserDrawer />
    </MainLayout>
  );
}
