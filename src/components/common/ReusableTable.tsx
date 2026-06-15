'use client';

import React from 'react';
import DataTable from './DataTable';
import { TableProps } from 'antd';

export function ReusableTable<T extends object>(props: Omit<TableProps<T>, 'loading'> & { loading?: boolean }) {
  return <DataTable<T> {...props} />;
}

export default ReusableTable;
