'use client';

import React from 'react';
import { Card, Descriptions, Image as AntdImage, Button } from 'antd';
import AppDrawer from '../common/AppDrawer';
import { useHistoryStore } from '../../store/historyStore';
import StatusTag from '../common/StatusTag';

export const HistoryDetailDrawer: React.FC = () => {
  const { detailDrawerOpen, setDetailDrawerOpen, selectedHistory } = useHistoryStore();

  if (!selectedHistory) return null;

  return (
    <AppDrawer
      title="Chi tiết Lịch sử Ra/Vào"
      open={detailDrawerOpen}
      onClose={() => setDetailDrawerOpen(false)}
      width={600}
      footer={
        <div className="flex justify-end">
          <Button onClick={() => setDetailDrawerOpen(false)} className="rounded-lg">
            Đóng cửa sổ
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Photo Comparison Section */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            title={<span className="text-xs font-bold text-zinc-500">Ảnh Hồ sơ Sinh viên</span>}
            variant="borderless"
            className="bg-zinc-50/50 border border-zinc-100 rounded-lg overflow-hidden text-center"
            styles={{ body: { padding: '12px' } }}
          >
            <AntdImage
              src={selectedHistory.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=250'}
              alt="Hồ sơ"
              className="rounded-md object-cover max-h-[180px] mx-auto"
            />
          </Card>

          <Card
            title={<span className="text-xs font-bold text-zinc-500">Ảnh chụp Camera</span>}
            variant="borderless"
            className="bg-zinc-50/50 border border-zinc-100 rounded-lg overflow-hidden text-center"
            styles={{ body: { padding: '12px' } }}
          >
            <AntdImage
              src={selectedHistory.captureUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=250'}
              alt="Camera chụp"
              className="rounded-md object-cover max-h-[180px] mx-auto"
            />
          </Card>
        </div>

        {/* Detailed Information Descriptions */}
        <Card variant="borderless" className="border border-zinc-100 rounded-lg shadow-2xs">
          <Descriptions title="Thông tin chi tiết" column={1} bordered size="small" labelStyle={{ fontWeight: 600, width: '150px' }}>
            <Descriptions.Item label="Mã số sinh viên (MSSV)">
              <span className="font-mono font-bold text-zinc-700">{selectedHistory.mssv}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Họ và tên">
              <span className="font-bold text-zinc-800">{selectedHistory.fullName}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Khu ký túc xá">
              {selectedHistory.dormitoryName}
            </Descriptions.Item>
            <Descriptions.Item label="Phòng sinh hoạt">
              {selectedHistory.roomName}
            </Descriptions.Item>
            <Descriptions.Item label="Loại sự kiện">
              <StatusTag status={selectedHistory.type} />
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian ghi nhận">
              {selectedHistory.timestamp}
            </Descriptions.Item>
            <Descriptions.Item label="Thiết bị ghi nhận">
              {selectedHistory.device}
            </Descriptions.Item>
            <Descriptions.Item label="Ghi chú hệ thống">
              <span className="text-zinc-500 italic text-xs">
                {selectedHistory.notes || 'Không có ghi chú thêm.'}
              </span>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </AppDrawer>
  );
};

export default HistoryDetailDrawer;
