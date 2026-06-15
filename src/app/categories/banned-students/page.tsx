'use client';

import React, { useState } from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import PageHeader from '../../../components/common/PageHeader';
import SearchToolbar from '../../../components/common/SearchToolbar';
import DataTable from '../../../components/common/DataTable';
import StatusTag from '../../../components/common/StatusTag';
import ConfirmDelete from '../../../components/common/ConfirmDelete';
import BannedDrawer from '../../../components/banned/BannedDrawer';
import { bannedService } from '../../../services/banned.service';
import { Space, Button, Tooltip, message, Tag } from 'antd';
import { CheckOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { BannedStudentStats } from '../../../types/Statistic';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { exportToExcel } from '../../../utils/excel';

export default function BannedStudentsCategoryPage() {
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: bannedRecords = [], isLoading } = useQuery({
    queryKey: ['bannedStudents', search],
    queryFn: () => bannedService.getBannedStudents({ search }),
  });

  const handleLiftBan = async (mssv: string) => {
    try {
      await bannedService.liftBan(mssv);
      message.success('Gỡ bỏ hạn chế thành công!');
      queryClient.invalidateQueries({ queryKey: ['bannedStudents'] });
    } catch (err) {
      message.error('Có lỗi xảy ra.');
    }
  };

  const handleDelete = async (mssv: string) => {
    try {
      await bannedService.deleteBannedRecord(mssv);
      message.success('Xóa bản ghi hạn chế thành công!');
      queryClient.invalidateQueries({ queryKey: ['bannedStudents'] });
    } catch (err) {
      message.error('Có lỗi xảy ra khi xóa.');
    }
  };

  const handleExport = () => {
    const dataToExport = bannedRecords.map((b, index) => ({
      'STT': index + 1,
      'Mã số sinh viên': b.mssv,
      'Họ và tên': b.fullName,
      'Lý do hạn chế': b.reason,
      'Ngày hạn chế': b.bannedDate,
      'Ngày hết hạn hạn chế': b.expiryDate,
      'Trạng thái': b.status === 'ACTIVE' ? 'Đang hiệu lực' : 'Đã hết hạn',
    }));
    exportToExcel(dataToExport, `Danh_Sach_Han_Che_Ra_Vao_${new Date().toISOString().split('T')[0]}`, 'Danh sách hạn chế');
  };

  const columns: ColumnsType<BannedStudentStats> = [
    {
      title: 'Mã số sinh viên',
      dataIndex: 'mssv',
      key: 'mssv',
      render: (text) => <span className="font-mono font-bold text-xs text-zinc-700">{text}</span>,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <span className="font-bold text-xs text-zinc-800">{text}</span>,
    },
    {
      title: 'Lý do hạn chế',
      dataIndex: 'reason',
      key: 'reason',
      render: (text) => <span className="text-xs text-zinc-500 block max-w-sm truncate" title={text}>{text}</span>,
    },
    {
      title: 'Ngày bắt đầu hạn chế',
      dataIndex: 'bannedDate',
      key: 'bannedDate',
      render: (text) => <span className="text-xs text-zinc-600">{text}</span>,
    },
    {
      title: 'Ngày hết hạn hạn chế',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (text) => <span className="text-xs text-zinc-600 font-medium">{text}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'ACTIVE') {
          return <Tag color="error" className="rounded-full px-2.5">Đang hiệu lực</Tag>;
        }
        return <Tag color="default" className="rounded-full px-2.5">Đã hết hạn / Bãi bỏ</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size={8}>
          {record.status === 'ACTIVE' && (
            <Tooltip title="Gỡ bỏ hạn chế">
              <Button
                type="text"
                icon={<CheckOutlined />}
                onClick={() => handleLiftBan(record.mssv)}
                className="text-emerald-500 hover:bg-emerald-50"
              />
            </Tooltip>
          )}
          <Tooltip title="Xóa bản ghi">
            <div>
              <ConfirmDelete onConfirm={() => handleDelete(record.mssv)}>
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
        title="Danh sách sinh viên bị hạn chế ra vào"
        description="Quản lý các trường hợp kỷ luật, hạn chế hoặc đình chỉ tạm thời ra vào ký túc xá"
      />

      <SearchToolbar
        placeholder="Tìm theo mã số sinh viên hoặc tên sinh viên..."
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setDrawerOpen(true)}
        onExportClick={handleExport}
        onResetClick={() => setSearch('')}
        addText="Thêm hạn chế"
      />

      <DataTable<BannedStudentStats>
        columns={columns}
        dataSource={bannedRecords}
        loading={isLoading}
        rowKey="mssv"
      />

      <BannedDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </MainLayout>
  );
}
