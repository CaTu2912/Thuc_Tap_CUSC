'use client';

import React from 'react';
import { TeamOutlined, LoginOutlined, LogoutOutlined, DollarOutlined, StopOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import StatisticCard from '../common/StatisticCard';
import { DashboardKPIs } from '../../types/Dashboard';

interface DashboardCardsProps {
  kpis?: DashboardKPIs;
  loading?: boolean;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({
  kpis = {
    totalStudents: 0,
    presentStudents: 0,
    absentStudents: 0,
    feeDebtStudents: 0,
    bannedStudents: 0,
    strangersDetectedToday: 0,
  },
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 mb-6">
      <StatisticCard
        title="Tổng sinh viên"
        value={kpis.totalStudents}
        icon={<TeamOutlined />}
        color="#1f5ca9" // Primary CTU
        trend={{ type: 'up', value: '1.2%' }}
      />
      <StatisticCard
        title="Đang có mặt"
        value={kpis.presentStudents}
        icon={<LoginOutlined />}
        color="#52C41A" // Success
        trend={{ type: 'up', value: '2.5%' }}
      />
      <StatisticCard
        title="Đã ra ngoài"
        value={kpis.absentStudents}
        icon={<LogoutOutlined />}
        color="#FAAD14" // Warning
        trend={{ type: 'down', value: '0.8%' }}
      />
      <StatisticCard
        title="Chưa hoàn tất phí"
        value={kpis.feeDebtStudents}
        icon={<DollarOutlined />}
        color="#FF4D4F" // Danger
        trend={{ type: 'down', value: '5.2%' }}
      />
      <StatisticCard
        title="Sinh viên bị hạn chế"
        value={kpis.bannedStudents}
        icon={<StopOutlined />}
        color="#4A5568" // Dark slate
      />
      <StatisticCard
        title="Người lạ hôm nay"
        value={kpis.strangersDetectedToday}
        icon={<EyeInvisibleOutlined />}
        color="#D69E2E" // Amber
        trend={{ type: 'up', value: '10%' }}
      />
    </div>
  );
};

export default DashboardCards;