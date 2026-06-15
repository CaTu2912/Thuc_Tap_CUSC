'use client';

import React from 'react';
import { Skeleton, Card } from 'antd';

interface LoadingSkeletonProps {
  type?: 'table' | 'card' | 'chart' | 'list';
  rows?: number;
  cardsCount?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'table',
  rows = 5,
  cardsCount = 3,
}) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 mb-6">
        {Array.from({ length: cardsCount }).map((_, idx) => (
          <Card key={idx} className="rounded-xl border border-zinc-100 shadow-xs" styles={{ body: { padding: '20px 24px' } }}>
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <Card className="rounded-xl border border-zinc-100 shadow-xs p-4 w-full h-[350px] flex flex-col justify-between">
        <Skeleton.Input active size="small" style={{ width: 120 }} />
        <Skeleton active paragraph={{ rows: 6 }} title={false} />
      </Card>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-zinc-100 flex items-center gap-4">
            <Skeleton.Avatar active size="large" />
            <div className="flex-1">
              <Skeleton active paragraph={{ rows: 1 }} title={false} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default is table
  return (
    <div className="bg-white p-6 rounded-xl border border-zinc-100 shadow-xs space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Skeleton.Input active size="default" style={{ width: 200 }} />
        <Skeleton.Button active size="default" style={{ width: 100 }} />
      </div>
      {Array.from({ length: rows }).map((_, idx) => (
        <Skeleton key={idx} active paragraph={{ rows: 1 }} title={false} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
