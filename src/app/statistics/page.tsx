'use client';

import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import TimeframeChart from '@/components/statistics/TimeframeChart';
import TimeframeTable from '@/components/statistics/TimeframeTable';
import StatisticTable from '@/components/statistics/StatisticTable';
import { topStudentColumns } from '@/components/statistics/TopStudentTable';
import { absentStudentColumns } from '@/components/statistics/AbsentStudentStatsTable';
import { strangerStatsColumns } from '@/components/statistics/StrangerStatsTable';
import { bannedStudentStatsColumns } from '@/components/statistics/BannedStudentStatsTable';
import { useStatistics } from '@/hooks/useStatistics';
import { useStatisticsStore } from '@/store/statisticsStore';

const CHART_TITLES = {
  DAY: 'Thống kê theo ngày',
  MONTH: 'Thống kê theo tháng',
  YEAR: 'Thống kê theo năm',
  DORMITORY: 'Thống kê theo khu KTX',
} as const;

export default function StatisticsPage() {
  const { timeframe, setTimeframe } = useStatisticsStore();
  const {
    timeframeStats,
    topStudents,
    absentStudents,
    strangerStats,
    bannedStudentStats,
    isLoading,
  } = useStatistics();

  const handleTimeframeChange = (event: RadioChangeEvent) => {
    setTimeframe(event.target.value);
  };

  const isDormitory = timeframe === 'DORMITORY';

  return (
    <MainLayout>
      <PageHeader
        title="Thống kê"
        description="Báo cáo phân tích tần suất ra vào và chỉ số an ninh trong Ký túc xá Đại học Cần Thơ"
        extra={
          <Radio.Group value={timeframe} onChange={handleTimeframeChange} className="rounded-lg">
            <Radio.Button value="DAY">Theo ngày</Radio.Button>
            <Radio.Button value="MONTH">Theo tháng</Radio.Button>
            <Radio.Button value="YEAR">Theo năm</Radio.Button>
            <Radio.Button value="DORMITORY">Theo khu KTX</Radio.Button>
          </Radio.Group>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <TimeframeChart
            title={CHART_TITLES[timeframe]}
            data={timeframeStats}
            loading={isLoading}
            isDormitory={isDormitory}
          />
        </div>
        <TimeframeTable data={timeframeStats} loading={isLoading} isDormitory={isDormitory} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StatisticTable
          title="Top sinh viên ra vào nhiều nhất"
          dataSource={topStudents}
          rowKey="mssv"
          loading={isLoading}
          columns={topStudentColumns}
        />
        <StatisticTable
          title="Sinh viên vắng mặt lâu ngày"
          dataSource={absentStudents}
          rowKey="mssv"
          loading={isLoading}
          columns={absentStudentColumns}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatisticTable
          title="Người lạ phát hiện"
          dataSource={strangerStats}
          rowKey="date"
          loading={isLoading}
          columns={strangerStatsColumns}
        />
        <StatisticTable
          title="Sinh viên bị hạn chế"
          dataSource={bannedStudentStats}
          rowKey="mssv"
          loading={isLoading}
          columns={bannedStudentStatsColumns}
        />
      </div>
    </MainLayout>
  );
}
