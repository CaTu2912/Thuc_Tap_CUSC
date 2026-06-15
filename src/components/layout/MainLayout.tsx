'use client';

import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuthStore();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [isInitialized, isAuthenticated, router]);

  // Show a premium loading spinner while checking auth status
  if (!isInitialized || !isAuthenticated) {
    return (
      <div 
        className="min-h-screen w-screen flex flex-col items-center justify-center gap-4 bg-[#F5F7FA]"
        style={{ fontFamily: 'var(--font-readex-pro)' }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-[#1f5ca9] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[#1f5ca9] font-medium text-sm mt-3 tracking-wide">Đang xác thực thông tin...</span>
        </div>
      </div>
    );
  }

  return (
    <Layout className="min-h-screen flex flex-col font-sans overflow-hidden">
      <Header />
      <Layout className="flex-1 flex flex-row overflow-hidden">
        <Sidebar />
        <Layout className="flex flex-col flex-1 bg-[#F5F7FA] overflow-y-auto">
          <Content className="p-6 flex-1">
            {children}
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default MainLayout;