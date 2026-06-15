'use client';

import React, { useState } from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import PageHeader from '../../../components/common/PageHeader';
import SearchToolbar from '../../../components/common/SearchToolbar';
import DataTable from '../../../components/common/DataTable';
import ConfirmDelete from '../../../components/common/ConfirmDelete';
import RoomDrawer from '../../../components/room/RoomDrawer';
import { useStudentStore } from '../../../store/studentStore';
import { roomService } from '../../../services/room.service';
import { Space, Button, Tooltip, message, Select, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { Room } from '../../../types/Room';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { exportToExcel } from '../../../utils/excel';
import { DORMITORY_OPTIONS } from '../../../constants';

export default function RoomsCategoryPage() {
  const [search, setSearch] = useState('');
  const [dormitoryId, setDormitoryId] = useState('');
  const { setRoomDrawerOpen, setSelectedRoom } = useStudentStore();
  const queryClient = useQueryClient();

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ['rooms', search, dormitoryId],
    queryFn: () => roomService.getRooms({ search, dormitoryId }),
  });

  const handleAddClick = () => {
    setSelectedRoom(null);
    setRoomDrawerOpen(true);
  };

  const handleEditClick = (room: Room) => {
    setSelectedRoom(room);
    setRoomDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await roomService.deleteRoom(id);
      message.success('Xóa phòng thành công!');
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    } catch (err) {
      message.error('Có lỗi xảy ra khi xóa.');
    }
  };

  const handleExport = () => {
    const dataToExport = rooms.map((r, index) => ({
      'STT': index + 1,
      'Mã phòng': r.id,
      'Tên phòng': r.name,
      'Khu KTX': r.dormitoryName,
      'Tầng': r.floor,
      'Sức chứa tối đa (Người)': r.capacity,
      'Số người hiện tại': r.currentOccupants,
      'Trạng thái': r.status === 'AVAILABLE' ? 'Còn trống' : r.status === 'FULL' ? 'Đã đầy' : 'Bảo trì',
    }));
    exportToExcel(dataToExport, `Danh_Sach_Phong_KTX_${new Date().toISOString().split('T')[0]}`, 'Danh sách phòng');
  };

  const handleReset = () => {
    setSearch('');
    setDormitoryId('');
  };

  const columns: ColumnsType<Room> = [
    {
      title: 'Mã phòng',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span className="font-mono font-bold text-xs text-zinc-700">{text}</span>,
    },
    {
      title: 'Tên phòng',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-bold text-xs text-zinc-800">{text}</span>,
    },
    {
      title: 'Khu KTX',
      dataIndex: 'dormitoryName',
      key: 'dormitoryName',
      render: (text) => <span className="text-zinc-500 text-xs">{text}</span>,
    },
    {
      title: 'Tầng',
      dataIndex: 'floor',
      key: 'floor',
      align: 'center',
      render: (num) => <span className="text-xs">Tầng {num}</span>,
    },
    {
      title: 'Số người hiện tại',
      key: 'occupancy',
      align: 'center',
      render: (_, record) => (
        <span className="text-xs font-semibold">
          {record.currentOccupants} / {record.capacity} người
        </span>
      ),
    },
    {
      title: 'Trạng thái phòng',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'AVAILABLE') {
          return <Tag color="success" className="rounded-full px-2.5">Còn trống</Tag>;
        }
        if (status === 'FULL') {
          return <Tag color="error" className="rounded-full px-2.5">Đã đầy</Tag>;
        }
        return <Tag color="warning" className="rounded-full px-2.5">Đang bảo trì</Tag>;
      },
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
        title="Quản lý Phòng Ký Túc Xá"
        description="Tra cứu phòng sinh hoạt, quản lý sức chứa và kiểm kê số người ở thực tế"
      />

      <SearchToolbar
        placeholder="Tìm theo mã phòng hoặc tên phòng..."
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={handleAddClick}
        onExportClick={handleExport}
        onResetClick={handleReset}
        addText="Thêm Phòng mới"
        extraFilters={
          <Select
            placeholder="Lọc theo Khu KTX"
            value={dormitoryId || undefined}
            onChange={setDormitoryId}
            allowClear
            options={DORMITORY_OPTIONS}
            style={{ width: 160 }}
            className="rounded-lg"
          />
        }
      />

      <DataTable<Room>
        columns={columns}
        dataSource={rooms}
        loading={isLoading}
        rowKey="id"
      />

      <RoomDrawer />
    </MainLayout>
  );
}
