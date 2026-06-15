'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import DashboardCards from '@/components/dashboard/DashboardCards';
import AccessChart from '@/components/dashboard/AccessChart';
import DormitoryPieChart from '@/components/dashboard/DormitoryPieChart';
import StrangerChart from '@/components/dashboard/StrangerChart';
import ForbiddenStudentChart from '@/components/dashboard/ForbiddenStudentChart';
import TopStudentChart from '@/components/dashboard/TopStudentChart';
import LatestHistoryTable from '@/components/dashboard/LatestHistoryTable';
import LatestAlertTable from '@/components/dashboard/LatestAlertTable';
import AbsentStudentTable from '@/components/dashboard/AbsentStudentTable';
import PresentStudentTable from '@/components/dashboard/PresentStudentTable';
import FeedbackTable from '@/components/dashboard/FeedbackTable';
import { useDashboard } from '@/hooks/useDashboard';
import { useStatistics } from '@/hooks/useStatistics';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

export default function DashboardPage() {
  const { dashboardData, accessChartData, dormitoryPieData, strangerChartData, isLoading } =
    useDashboard();
  const { topStudents } = useStatistics();

  if (isLoading) {
    return (
      <MainLayout>
        <PageHeader
          title="Tổng quan hệ thống"
          description="Báo cáo số liệu thời gian thực ra vào KTX"
        />
        <LoadingSkeleton type="card" cardsCount={6} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LoadingSkeleton type="chart" />
          <LoadingSkeleton type="chart" />
          <LoadingSkeleton type="chart" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        title="Tổng quan hệ thống"
        description="Báo cáo giám sát thời gian thực & trạng thái an ninh KTX Đại học Cần Thơ"
      />

      <DashboardCards kpis={dashboardData?.kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <AccessChart data={accessChartData} />
        </div>
        <DormitoryPieChart data={dormitoryPieData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StrangerChart data={strangerChartData} />
        <ForbiddenStudentChart />
        <TopStudentChart data={topStudents} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LatestHistoryTable data={dashboardData?.latestHistory || []} />
        <LatestAlertTable data={dashboardData?.latestAlerts || []} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AbsentStudentTable data={dashboardData?.absentStudents || []} />
        <PresentStudentTable data={dashboardData?.presentStudents || []} />
      </div>

      <div className="mb-6">
        <FeedbackTable data={dashboardData?.latestFeedbacks || []} />
      </div>
    </MainLayout>
  );
}
