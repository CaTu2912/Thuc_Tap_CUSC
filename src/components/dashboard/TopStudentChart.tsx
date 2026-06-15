'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import ChartCard from '../common/ChartCard';
import { TopAccessStudent } from '../../types/Statistic';

interface TopStudentChartProps {
  data?: TopAccessStudent[];
  loading?: boolean;
}

export const TopStudentChart: React.FC<TopStudentChartProps> = ({ data = [], loading = false }) => {
  // Map fields for Recharts
  const formattedData = data.slice(0, 5).map(item => ({
    name: item.fullName,
    count: item.accessCount,
    info: `${item.mssv} - ${item.dormitoryName}`
  }));

  return (
    <ChartCard
      title="Top 5 Sinh viên ra vào nhiều nhất"
      subtitle="Số lượt quét thẻ/vân tay ghi nhận trong tháng này"
      loading={loading}
      height={280}
    >
      {formattedData.length === 0 ? (
        <span className="text-zinc-400">Không có dữ liệu</span>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
            <XAxis type="number" stroke="#A0AEC0" fontSize={11} tickLine={false} />
            <YAxis
              dataKey="name"
              type="category"
              stroke="#4A5568"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip
              formatter={(value) => [`${value} Lượt`, 'Tần suất']}
              contentStyle={{
                backgroundColor: '#FFF',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              labelFormatter={(name) => `Sinh viên: ${name}`}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={14}>
              {formattedData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#1f5ca9' : '#00afef'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default TopStudentChart;
