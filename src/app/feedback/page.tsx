'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import FeedbackFilter from '@/components/feedback/FeedbackFilter';
import FeedbackTable from '@/components/feedback/FeedbackTable';
import { feedbackService } from '@/services/feedback.service';
import { useAuthStore } from '@/store/authStore';
import { message } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { exportToExcel } from '@/utils/excel';
import type { Feedback } from '@/types/Feedback';

export default function FeedbackPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ['feedbacks', search, status],
    queryFn: () =>
      feedbackService.getFeedbacks({
        search,
        status: status ? (status as Feedback['status']) : undefined,
      }),
  });

  const invalidateFeedbacks = () => {
    queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
    queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
  };

  const handleResolve = async (id: string) => {
    try {
      await feedbackService.resolveFeedback(id, user?.fullName || 'Admin');
      message.success('Cập nhật trạng thái giải quyết thành công!');
      invalidateFeedbacks();
    } catch {
      message.error('Có lỗi xảy ra.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await feedbackService.deleteFeedback(id);
      message.success('Xóa phản hồi thành công!');
      invalidateFeedbacks();
    } catch {
      message.error('Có lỗi xảy ra khi xóa.');
    }
  };

  const handleExport = () => {
    const dataToExport = feedbacks.map((f, index) => ({
      STT: index + 1,
      'Mã số sinh viên': f.mssv,
      'Họ và tên': f.fullName,
      'Nội dung phản hồi': f.content,
      'Thời điểm gửi': f.timestamp,
      'Trạng thái': f.status === 'PENDING' ? 'Chờ giải quyết' : 'Đã giải quyết',
      'Người giải quyết': f.resolvedBy || '',
      'Ngày giải quyết': f.resolvedAt || '',
    }));
    exportToExcel(
      dataToExport,
      `Danh_Sach_Phan_Hoi_MyCTU_${new Date().toISOString().split('T')[0]}`,
      'Phản hồi'
    );
  };

  const handleReset = () => {
    setSearch('');
    setStatus('');
  };

  return (
    <MainLayout>
      <PageHeader
        title="Danh sách phản hồi từ ứng dụng MyCTU"
        description="Tiếp nhận và điều chỉnh các khiếu nại sai lệch thông tin ghi nhận ra vào từ sinh viên Đại học Cần Thơ"
      />

      <FeedbackFilter
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onExport={handleExport}
        onReset={handleReset}
      />

      <FeedbackTable
        data={feedbacks}
        loading={isLoading}
        onResolve={handleResolve}
        onDelete={handleDelete}
      />
    </MainLayout>
  );
}
