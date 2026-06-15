'use client';

import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import { dungKhoXacThuc } from '@/store/khoXacThuc';
import { DUONG_DAN } from '@/constants';
import DauTrang from './DauTrang';
import ThanhBen from './ThanhBen';
import ChanTrang from './ChanTrang';

const { Content } = Layout;

// Định nghĩa thuộc tính cho Bố cục chính
interface ThuocTinhBoCucChinh {
  // Nội dung con hiển thị bên trong phần thân bố cục
  children: React.ReactNode;
}

/**
 * Component Bố cục chính (MainLayout) của toàn bộ các trang nội bộ.
 * Chức năng: Kiểm tra trạng thái đăng nhập, hiển thị màn hình chờ tải thông tin, tích hợp DauTrang, ThanhBen và ChanTrang.
 */
export const BoCucChinh: React.FC<ThuocTinhBoCucChinh> = ({ children }) => {
  const boChuyenHuong = useRouter();
  const { daXacThuc, daKhoiTao } = dungKhoXacThuc();

  // Sử dụng Effect để kiểm tra quyền truy cập của người dùng
  useEffect(() => {
    // Nếu hoàn tất khởi tạo mà người dùng chưa đăng nhập, chuyển hướng về trang Login
    if (daKhoiTao && ! daXacThuc) {
      boChuyenHuong.push(DUONG_DAN.LOGIN);
    }
  }, [daKhoiTao, daXacThuc, boChuyenHuong]);

  // Hiển thị vòng xoay tải trang khi đang xác thực hoặc chưa khởi tạo xong
  if (! daKhoiTao || ! daXacThuc) {
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
      <DauTrang />
      <Layout className="flex-1 flex flex-row overflow-hidden">
        <ThanhBen />
        <Layout className="flex flex-col flex-1 bg-[#F5F7FA] overflow-y-auto">
          <Content className="p-6 flex-1">
            {children}
          </Content>
        </Layout>
      </Layout>
      <ChanTrang />
    </Layout>
  );
};

export default BoCucChinh;
