'use client';

import React, { useState } from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import PageHeader from '../../../components/common/PageHeader';
import SearchToolbar from '../../../components/common/SearchToolbar';
import DataTable from '../../../components/common/DataTable';
import StatusTag from '../../../components/common/StatusTag';
import ConfirmDelete from '../../../components/common/ConfirmDelete';
import StudentDrawer from '../../../components/student/StudentDrawer';
import { useStudents } from '../../../hooks/useStudents';
import { useStudentStore } from '../../../store/studentStore';
import { Avatar, Space, Button, Tooltip, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { Student } from '../../../types/Student';
import { exportToExcel } from '../../../utils/excel';
import { DORMITORY_OPTIONS, STATUS_OPTIONS } from '../../../constants';

export default function StudentsCategoryPage() {
  const [search, setSearch] = useState('');
  const [dormitoryId, setDormitoryId] = useState('');
  const [status, setStatus] = useState('');

  const { students, isLoadingStudents, deleteStudent } = useStudents({
    search,
    dormitoryId,
    status,
  });

  const { setStudentDrawerOpen, setSelectedStudent } = useStudentStore();

  const handleAddClick = () => {
    setSelectedStudent(null);
    setStudentDrawerOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setStudentDrawerOpen(true);
  };

  const handleExport = () => {
    const dataToExport = students.map((s, index) => ({
      'STT': index + 1,
      'Mã số sinh viên': s.mssv,
      'Họ và tên': s.fullName,
      'Ngày sinh': s.dateOfBirth,
      'Giới tính': s.gender,
      'Khu KTX': s.dormitoryName,
      'Phòng': s.roomName,
      'Phí chưa thanh toán': s.feeDebt,
      'Có mặt tại KTX': s.present ? 'CÓ' : 'KHÔNG',
      'Trạng thái': s.status === 'ACTIVE' ? 'Hoạt động' : s.status === 'BANNED' ? 'Bị hạn chế' : 'Tạm khóa',
    }));
    exportToExcel(dataToExport, `Danh_Sach_Sinh_Vien_${new Date().toISOString().split('T')[0]}`, 'Sinh viên');
  };

  const handleReset = () => {
    setSearch('');
    setDormitoryId('');
    setStatus('');
  };

  const columns: ColumnsType<Student> = [
    {
      title: 'Ảnh',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      width: 60,
      render: (url) => <Avatar src={url} size={36} />,
    },
    {
      title: 'Mã số sinh viên',
      dataIndex: 'mssv',
      key: 'mssv',
      sorter: (a, b) => a.mssv.localeCompare(b.mssv),
      render: (text) => <span className="font-mono text-zinc-700 text-xs font-semibold">{text}</span>,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      render: (text) => <span className="font-bold text-zinc-800 text-xs">{text}</span>,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (text) => <span className="text-zinc-500 text-xs">{text}</span>,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (text) => <span className="text-xs">{text}</span>,
    },
    {
      title: 'Khu KTX',
      dataIndex: 'dormitoryName',
      key: 'dormitoryName',
      render: (text) => <span className="text-zinc-500 text-xs">{text}</span>,
    },
    {
      title: 'Phòng',
      dataIndex: 'roomName',
      key: 'roomName',
      render: (text) => <span className="text-zinc-500 text-xs">{text}</span>,
    },
    {
      title: 'Nợ phí',
      dataIndex: 'feeDebt',
      key: 'feeDebt',
      render: (fee) => (
        <span className={`text-xs ${fee && fee > 0 ? 'text-rose-500 font-bold' : 'text-zinc-400'}`}>
          {fee && fee > 0 ? `${fee.toLocaleString()} đ` : '0 đ'}
        </span>
      ),
    },
    {
      title: 'Có mặt',
      dataIndex: 'present',
      key: 'present',
      render: (present) => (
        <span className={`text-xs font-semibold ${present ? 'text-emerald-500' : 'text-amber-500'}`}>
          {present ? 'Đang có mặt' : 'Đã đi ra'}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <StatusTag status={status} />,
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
              <ConfirmDelete onConfirm={() => deleteStudent(record.mssv)}>
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
        title="Danh mục Sinh viên"
        description="Quản lý hồ sơ cư trú và trạng thái ra vào của sinh viên KTX"
      />

      <SearchToolbar
        placeholder="Tìm theo mã số sinh viên hoặc họ tên..."
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={handleAddClick}
        onExportClick={handleExport}
        onResetClick={handleReset}
        addText="Thêm sinh viên"
        extraFilters={
          <Space size={10} className="flex-wrap">
            <Select
              placeholder="Lọc theo Khu KTX"
              value={dormitoryId || undefined}
              onChange={setDormitoryId}
              allowClear
              options={DORMITORY_OPTIONS}
              style={{ width: 140 }}
              className="rounded-lg"
            />
            <Select
              placeholder="Trạng thái"
              value={status || undefined}
              onChange={setStatus}
              allowClear
              options={STATUS_OPTIONS}
              style={{ width: 140 }}
              className="rounded-lg"
            />
          </Space>
        }
      />

      <DataTable<Student>
        columns={columns}
        dataSource={students}
        loading={isLoadingStudents}
        rowKey="mssv"
      />

      <StudentDrawer />
    </MainLayout>
  );
}
