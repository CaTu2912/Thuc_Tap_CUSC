'use client';

import React from 'react';
import DataTable from '@/components/common/DataTable';
import { getFeedbackColumns } from '@/components/feedback/FeedbackColumns';
import type { Feedback } from '@/types/Feedback';

interface FeedbackTableProps {
  data: Feedback[];
  loading: boolean;
  onResolve: (id: string) => void;
  onDelete: (id: string) => void;
}

export const FeedbackTable: React.FC<FeedbackTableProps> = ({
  data,
  loading,
  onResolve,
  onDelete,
}) => {
  const columns = getFeedbackColumns({ onResolve, onDelete });

  return (
    <DataTable<Feedback>
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
    />
  );
};

export default FeedbackTable;
