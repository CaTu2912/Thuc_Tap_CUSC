'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import HistoryFilter from '@/components/history/HistoryFilter';
import HistoryTable from '@/components/history/HistoryTable';
import HistoryDrawer from '@/components/history/HistoryDrawer';
import HistoryDetailDrawer from '@/components/history/HistoryDetailDrawer';
import { useHistory } from '@/hooks/useHistory';
import { useHistoryStore } from '@/store/historyStore';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { exportToExcel } from '@/utils/excel';

export default function HistoryPage() {
  const { histories, isLoading, refetch, deleteHistory } = useHistory();
  const triggerOpenForm = useHistoryStore((state) => state.setFormDrawerOpen);

  const handleSearch = () => {
    refetch();
  };

  const handleExport = () => {
    const dataToExport = histories.map((h, index) => ({
      STT: index + 1,
      'Thời gian': h.timestamp,
      'Mã số sinh viên': h.mssv,
      'Họ và tên': h.fullName,
      Loại: h.type === 'IN' ? 'Vào KTX' : 'Ra ngoài',
      'Khu KTX': h.dormitoryName,
      Phòng: h.roomName,
      'Thiết bị ghi nhận': h.device,
      'Ghi chú': h.notes || '',
    }));
    exportToExcel(
      dataToExport,
      `Lich_Su_Ra_Vao_KTX_${new Date().toISOString().split('T')[0]}`,
      'Lịch sử'
    );
  };

  return (
    <MainLayout>
      <PageHeader
        title="Lịch sử Quét thẻ Ra/Vào"
        description="Tra cứu và ghi nhận lịch sử ra vào ký túc xá Đại học Cần Thơ"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => triggerOpenForm(true)}
            className="rounded-lg bg-[#1f5ca9] hover:bg-[#1a4e8f] flex items-center h-10 px-4"
          >
            Thêm lượt Ra/Vào mới
          </Button>
        }
      />

      <HistoryFilter onSearch={handleSearch} onExport={handleExport} />
      <div className="mt-4">
        <HistoryTable data={histories} loading={isLoading} onDelete={deleteHistory} />
      </div>

      <HistoryDrawer />
      <HistoryDetailDrawer />
    </MainLayout>
  );
}
