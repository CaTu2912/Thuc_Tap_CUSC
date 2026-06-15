'use client';

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import ChartCard from '../common/ChartCard';
import { DormitoryPieChartData } from '../../types/Dashboard';

interface DormitoryPieChartProps {
  data?: DormitoryPieChartData[];
  loading?: boolean;
}

const COLORS = ['#1f5ca9', '#00afef', '#52C41A', '#FAAD14'];

export const DormitoryPieChart: React.FC<DormitoryPieChartProps> = ({ data = [], loading = false }) => {
  return (
    <ChartCard
      title="Phân bố Sinh viên theo Khu KTX"
      subtitle="Tỷ lệ phần trăm phân bố sinh viên đang cư trú"
      loading={loading}
      height={320}
    >
      {data.length === 0 ? (
        <span className="text-zinc-400">Không có dữ liệu</span>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} Sinh viên`, 'Số lượng']}
              contentStyle={{
                backgroundColor: '#FFF',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default DormitoryPieChart;
