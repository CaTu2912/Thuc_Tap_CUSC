'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { useDashboardStore } from '@/store/dashboardStore';
import { Table, Button, Badge, Space, Input, Select, Card, Tooltip, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Alert } from '@/types/Alert';
import {
  CheckOutlined,
  DownloadOutlined,
  SearchOutlined,
  SyncOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { exportToExcel } from '@/utils/excel';

export default function AlertsPage() {
  const { latestAlerts, resolveAlert } = useDashboardStore();
  const [searchText, setSearchText] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const handleExport = () => {
    const dataToExport = latestAlerts.map((a, index) => ({
      STT: index + 1,
      'Mã cảnh báo': a.id,
      'Thời gian': a.timestamp,
      'Nội dung cảnh báo': a.message,
      'Vị trí': a.location,
      'Mức độ': a.severity === 'CRITICAL' ? 'Khẩn cấp' : a.severity === 'WARNING' ? 'Cảnh báo' : 'Thông tin',
      'Trạng thái': a.resolved ? 'Đã xử lý' : 'Chưa xử lý',
    }));
    exportToExcel(
      dataToExport,
      `Lich_Su_Canh_Bao_An_Ninh_${new Date().toISOString().split('T')[0]}`,
      'Cảnh báo An ninh'
    );
  };

  const handleResetFilters = () => {
    setSearchText('');
    setSeverityFilter('ALL');
    setStatusFilter('ALL');
  };

  const filteredAlerts = latestAlerts.filter((alert) => {
    const matchesSearch =
      alert.message.toLowerCase().includes(searchText.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchText.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchText.toLowerCase());

    const matchesSeverity = severityFilter === 'ALL' || alert.severity === severityFilter;
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'RESOLVED' && alert.resolved) ||
      (statusFilter === 'UNRESOLVED' && !alert.resolved);

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  // KPI calculations
  const totalAlerts = latestAlerts.length;
  const unresolvedAlertsCount = latestAlerts.filter((a) => !a.resolved).length;
  const resolvedAlertsCount = latestAlerts.filter((a) => a.resolved).length;

  const columns: ColumnsType<Alert> = [
    {
      title: 'Mã số',
      dataIndex: 'id',
      key: 'id',
      width: 90,
      render: (text) => <span className="font-mono font-bold text-xs text-zinc-700">{text}</span>,
    },
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 150,
      render: (text) => <span className="text-zinc-600 text-xs font-sans font-medium">{text}</span>,
    },
    {
      title: 'Nội dung cảnh báo',
      dataIndex: 'message',
      key: 'message',
      render: (text, record) => (
        <div className="flex flex-col font-sans">
          <span className={`text-xs font-semibold ${record.severity === 'CRITICAL' ? 'text-rose-600' : record.severity === 'WARNING' ? 'text-amber-600' : 'text-blue-600'}`}>
            {text}
          </span>
          <span className="text-[11px] text-zinc-400 mt-0.5">Khu vực phát hiện: {record.location}</span>
        </div>
      ),
    },
    {
      title: 'Mức độ',
      dataIndex: 'severity',
      key: 'severity',
      width: 120,
      render: (severity: string) => {
        if (severity === 'CRITICAL') {
          return (
            <Tag color="error" className="rounded-full px-3 py-0.5 border-none text-[11px] font-semibold flex items-center gap-1 w-max">
              <AlertOutlined /> Khẩn cấp
            </Tag>
          );
        } else if (severity === 'WARNING') {
          return (
            <Tag color="warning" className="rounded-full px-3 py-0.5 border-none text-[11px] font-semibold flex items-center gap-1 w-max">
              <AlertOutlined /> Cảnh báo
            </Tag>
          );
        }
        return (
          <Tag color="blue" className="rounded-full px-3 py-0.5 border-none text-[11px] font-semibold flex items-center gap-1 w-max">
            <InfoCircleOutlined /> Thông tin
          </Tag>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'resolved',
      key: 'resolved',
      width: 120,
      render: (resolved: boolean) => (
        <Badge
          status={resolved ? 'success' : 'default'}
          text={<span className="text-xs font-medium text-zinc-600">{resolved ? 'Đã xử lý' : 'Chưa xử lý'}</span>}
        />
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          {!record.resolved ? (
            <Button
              type="primary"
              size="small"
              icon={<CheckOutlined className="text-[10px]" />}
              onClick={() => resolveAlert(record.id)}
              className="bg-emerald-500 hover:bg-emerald-600 border-none text-xs rounded-lg flex items-center gap-1 px-3 py-1"
            >
              Xử lý
            </Button>
          ) : (
            <span className="text-zinc-400 text-xs flex items-center gap-1 font-medium font-sans">
              <CheckCircleOutlined className="text-emerald-500" /> Đã hoàn tất
            </span>
          )}
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Quản lý Cảnh báo An ninh"
        description="Theo dõi và xử lý các sự cố an ninh, cảnh báo ra vào bất thường tại KTX Đại học Cần Thơ"
        extra={
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleExport}
            className="rounded-lg bg-[#1f5ca9] hover:bg-[#1a4e8f] flex items-center h-10 px-4 font-sans font-semibold text-sm border-none shadow-sm"
          >
            Xuất dữ liệu Excel
          </Button>
        }
      />

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card variant="borderless" className="shadow-xs border border-zinc-100 rounded-xl bg-gradient-to-br from-red-50 to-white">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-zinc-400 text-xs font-medium uppercase font-sans">Cảnh báo chưa xử lý</div>
              <div className="text-2xl font-bold text-rose-600 mt-1 font-sans" style={{ fontFamily: 'var(--font-k2d)' }}>
                {unresolvedAlertsCount}
              </div>
            </div>
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center text-rose-500">
              <AlertOutlined className="text-lg animate-pulse" />
            </div>
          </div>
        </Card>

        <Card variant="borderless" className="shadow-xs border border-zinc-100 rounded-xl bg-gradient-to-br from-emerald-50 to-white">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-zinc-400 text-xs font-medium uppercase font-sans">Cảnh báo đã xử lý</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-sans" style={{ fontFamily: 'var(--font-k2d)' }}>
                {resolvedAlertsCount}
              </div>
            </div>
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500">
              <CheckCircleOutlined className="text-lg" />
            </div>
          </div>
        </Card>

        <Card variant="borderless" className="shadow-xs border border-zinc-100 rounded-xl bg-gradient-to-br from-blue-50 to-white">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-zinc-400 text-xs font-medium uppercase font-sans">Tổng số cảnh báo hôm nay</div>
              <div className="text-2xl font-bold text-blue-600 mt-1 font-sans" style={{ fontFamily: 'var(--font-k2d)' }}>
                {totalAlerts}
              </div>
            </div>
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
              <InfoCircleOutlined className="text-lg" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-4 rounded-xl border border-zinc-100 shadow-xs mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <Input
            placeholder="Tìm theo mã, nội dung hoặc vị trí..."
            prefix={<SearchOutlined className="text-zinc-400" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-80 h-10 rounded-lg font-sans"
          />

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-zinc-500 whitespace-nowrap font-medium font-sans">Mức độ:</span>
            <Select
              value={severityFilter}
              onChange={setSeverityFilter}
              className="w-full md:w-36 h-10 rounded-lg font-sans"
              classNames={{ popup: { root: 'font-sans' } }}
              options={[
                { value: 'ALL', label: 'Tất cả' },
                { value: 'CRITICAL', label: 'Khẩn cấp' },
                { value: 'WARNING', label: 'Cảnh báo' },
                { value: 'INFO', label: 'Thông tin' },
              ]}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-zinc-500 whitespace-nowrap font-medium font-sans">Trạng thái:</span>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full md:w-36 h-10 rounded-lg font-sans"
              classNames={{ popup: { root: 'font-sans' } }}
              options={[
                { value: 'ALL', label: 'Tất cả' },
                { value: 'UNRESOLVED', label: 'Chưa xử lý' },
                { value: 'RESOLVED', label: 'Đã xử lý' },
              ]}
            />
          </div>
        </div>

        <Button
          onClick={handleResetFilters}
          icon={<SyncOutlined />}
          className="rounded-lg h-10 px-4 text-xs font-semibold text-zinc-600 hover:text-zinc-800 border-zinc-200 w-full md:w-auto font-sans flex items-center justify-center gap-1"
        >
          Đặt lại bộ lọc
        </Button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden">
        <Table<Alert>
          columns={columns}
          dataSource={filteredAlerts}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            className: 'px-4 py-3 border-t border-zinc-100 font-sans',
          }}
          size="middle"
        />
      </div>
    </MainLayout>
  );
}
