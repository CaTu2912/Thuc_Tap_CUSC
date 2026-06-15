'use client';

import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, App } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { ctuTheme } from '@/lib/theme';
import { dungKhoXacThuc } from '@/store/khoXacThuc';

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  const khoiTao = dungKhoXacThuc((trangThai) => trangThai.khoiTao);

  useEffect(() => {
    khoiTao();
  }, [khoiTao]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={viVN} theme={ctuTheme}>
        <App>
          {children}
        </App>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
