'use client';

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ChartCard from '../common/ChartCard';
import { AccessChartData } from '../../types/Dashboard';

interface AccessChartProps {
  data?: AccessChartData[];
  loading?: boolean;
}

export const AccessChart: React.FC<AccessChartProps> = ({ data = [], loading = false }) => {
  return (
    <ChartCard
      title="Tần suất Ra/Vào KTX theo giờ"
      subtitle="Số lượt sinh viên quét vân tay/nhận diện khuôn mặt vào và ra trong ngày"
      loading={loading}
      height={320}
    >
      {data.length === 0 ? (
        <span className="text-zinc-400">Không có dữ liệu</span>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#52C41A" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#52C41A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00BAC" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1f5ca9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="time" stroke="#A0AEC0" fontSize={12} tickLine={false} />
            <YAxis stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFF',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Area
              type="monotone"
              name="Lượt Vào"
              dataKey="inCount"
              stroke="#52C41A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIn)"
            />
            <Area
              type="monotone"
              name="Lượt Ra"
              dataKey="outCount"
              stroke="#1f5ca9"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOut)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default AccessChart;
