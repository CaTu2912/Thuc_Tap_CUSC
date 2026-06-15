'use client';

import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartCard from '@/components/common/ChartCard';
import type { AccessStatsByDormitory, AccessStatsByTime } from '@/types/Statistic';

type TimeframeRow = AccessStatsByTime | AccessStatsByDormitory;

interface TimeframeChartProps {
  title: string;
  data: TimeframeRow[];
  loading: boolean;
  isDormitory: boolean;
}

export const TimeframeChart: React.FC<TimeframeChartProps> = ({
  title,
  data,
  loading,
  isDormitory,
}) => {
  return (
    <ChartCard title={title} loading={loading} height={320}>
      <ResponsiveContainer width="100%" height="100%" minHeight={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey={isDormitory ? 'dormitoryName' : 'label'}
            stroke="#A0AEC0"
            fontSize={11}
            tickLine={false}
          />
          <YAxis stroke="#A0AEC0" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFF',
              border: 'none',
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Bar name="Lượt vào" dataKey="inCount" fill="#52C41A" radius={[4, 4, 0, 0]} barSize={18} />
          <Bar name="Lượt ra" dataKey="outCount" fill="#1f5ca9" radius={[4, 4, 0, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default TimeframeChart;
