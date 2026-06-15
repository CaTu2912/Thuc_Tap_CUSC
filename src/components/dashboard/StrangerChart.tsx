'use client';

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartCard from '../common/ChartCard';
import { StrangerChartData } from '../../types/Dashboard';

interface StrangerChartProps {
  data?: StrangerChartData[];
  loading?: boolean;
}

export const StrangerChart: React.FC<StrangerChartProps> = ({ data = [], loading = false }) => {
  return (
    <ChartCard
      title="Người lạ phát hiện gần đây"
      subtitle="Số lượt hệ thống phát hiện khuôn mặt không thuộc KTX trong 7 ngày qua"
      loading={loading}
      height={280}
    >
      {data.length === 0 ? (
        <span className="text-zinc-400">Không có dữ liệu</span>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="date" stroke="#A0AEC0" fontSize={11} tickLine={false} />
            <YAxis stroke="#A0AEC0" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(value) => [`${value} Người`, 'Số lượng']}
              contentStyle={{
                backgroundColor: '#FFF',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#FAAD14"
              strokeWidth={3}
              activeDot={{ r: 6 }}
              dot={{ strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default StrangerChart;
