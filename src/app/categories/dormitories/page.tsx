'use client';

import React, { useState } from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import PageHeader from '../../../components/common/PageHeader';
import SearchToolbar from '../../../components/common/SearchToolbar';
import DataTable from '../../../components/common/DataTable';
import StatusTag from '../../../components/common/StatusTag';
import ConfirmDelete from '../../../components/common/ConfirmDelete';
import DormitoryDrawer from '../../../components/dormitory/DormitoryDrawer';
import { useStudentStore } from '../../../store/studentStore';
import { useStudents } from '../../../hooks/useStudents';
import { dormitoryService } from '../../../services/dormitory.service';
import { Space, Button, Tooltip, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { Dormitory } from '../../../types/Dormitory';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { exportToExcel } from '../../../utils/excel';

export default function DormitoriesCategoryPage() {
  const [search, setSearch] = useState('');
  const { setDormitoryDrawerOpen, setSelectedDormitory } = useStudentStore();
  const queryClient = useQueryClient();

  const { data: dormitories = [], isLoading } = useQuery({
    queryKey: ['dormitories', search],
    queryFn: () => dormitoryService.getDormitories({ search }),
  });

  const handleAddClick = () => {
    setSelectedDormitory(null);
    setDormitoryDrawerOpen(true);
  };

  const handleEditClick = (dorm: Dormitory) => {
    setSelectedDormitory(dorm);
    setDormitoryDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await dormitoryService.deleteDormitory(id);
      message.success('Xóa khu ký túc xá thành công!');
      queryClient.invalidateQueries({ queryKey: ['dormitories'] });
    } catch (err) {
      message.error('Có lỗi xảy ra khi xóa.');
    }
  };

  const handleExport = () => {
    const dataToExport = dormitories.map((d, index) => ({
      'STT': index + 1,
      'Mã Khu KTX': d.id,
      'Tên Khu KTX': d.name,
      'Số lượng phòng': d.numberOfRooms,
      'Sức chứa tối đa (Người)': d.capacity,
      'Trạng thái': d.status === 'ACTIVE' ? 'Đang hoạt động' : 'Tạm ngưng',
    }));
    exportToExcel(dataToExport, `Danh_Sach_Khu_KTX_${new Date().toISOString().split('T')[0]}`, 'Khu KTX');
  };

  const columns: ColumnsType<Dormitory> = [
    {
      title: 'Mã Khu KTX',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span className="font-mono font-bold text-xs text-zinc-700">{text}</span>,
    },
    {
      title: 'Tên Khu KTX',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-bold text-xs text-zinc-800">{text}</span>,
    },
    {
      title: 'Số lượng phòng',
      dataIndex: 'numberOfRooms',
      key: 'numberOfRooms',
      align: 'center',
      render: (num) => <span className="text-xs font-semibold">{num} phòng</span>,
    },
    {
      title: 'Sức chứa tối đa',
      dataIndex: 'capacity',
      key: 'capacity',
      align: 'center',
      render: (cap) => <span className="text-xs font-semibold">{cap} người</span>,
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
        title="Quản lý Khu Ký Túc Xá"
        description="Danh sách các khu ký túc xá trực thuộc quản lý Đại học Cần Thơ"
      />

      <SearchToolbar
        placeholder="Tìm theo mã hoặc tên khu..."
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={handleAddClick}
        onExportClick={handleExport}
        onResetClick={() => setSearch('')}
        addText="Thêm Khu KTX"
      />

      <DataTable<Dormitory>
        columns={columns}
        dataSource={dormitories}
        loading={isLoading}
        rowKey="id"
      />

      <DormitoryDrawer />
    </MainLayout>
  );
}
