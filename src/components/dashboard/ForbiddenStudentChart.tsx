'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import ChartCard from '../common/ChartCard';

interface ForbiddenStudentChartProps {
  loading?: boolean;
}

const mockForbiddenData = [
  { dormitoryName: 'Khu A', count: 8 },
  { dormitoryName: 'Khu B', count: 3 },
  { dormitoryName: 'Khu C', count: 1 },
  { dormitoryName: 'Khu D', count: 5 },
];

export const ForbiddenStudentChart: React.FC<ForbiddenStudentChartProps> = ({ loading = false }) => {
  return (
    <ChartCard
      title="Cảnh báo cố tình xâm nhập theo Khu"
      subtitle="Số lượt phát hiện sinh viên đang bị hạn chế cố gắng quét thẻ vào KTX"
      loading={loading}
      height={280}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mockForbiddenData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="dormitoryName" stroke="#A0AEC0" fontSize={11} tickLine={false} />
          <YAxis stroke="#A0AEC0" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value) => [`${value} Lần`, 'Số lượt phát hiện']}
            contentStyle={{
              backgroundColor: '#FFF',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
          <Bar dataKey="count" fill="#FF4D4F" radius={[4, 4, 0, 0]} barSize={20}>
            {mockForbiddenData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#FF4D4F' : '#FAAD14'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default ForbiddenStudentChart;
