'use client';

import React from 'react';
import { Avatar, Badge, Button, Dropdown, Layout, MenuProps, Space } from 'antd';
import { BellOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import Image from 'next/image';
import ctuLogo from '@/assets/CTU_logo.png';

const { Header: AntdHeader } = Layout;

export const Header: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const profileMenu: MenuProps = {
    items: [
      { key: 'profile', label: 'Thông tin tài khoản', icon: <UserOutlined /> },
      { key: 'settings', label: 'Cài đặt hệ thống', icon: <SettingOutlined /> },
      { type: 'divider' },
      { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, danger: true, onClick: handleLogout },
    ],
  };

  const notificationMenu: MenuProps = {
    items: [
      {
        key: '1',
        label: (
          <div className="py-1 max-w-xs">
            <div className="font-semibold text-rose-500">Cảnh báo nghiêm trọng</div>
            <div className="text-xs text-zinc-500 mt-0.5">Sinh viên B2003792 đang bị hạn chế cố gắng quét thẻ.</div>
            <div className="text-[10px] text-zinc-400 mt-1">10 phút trước</div>
          </div>
        ),
      },
      {
        key: '2',
        label: (
          <div className="py-1 max-w-xs">
            <div className="font-semibold text-amber-500">Phát hiện đối tượng lạ</div>
            <div className="text-xs text-zinc-500 mt-0.5">Người lạ lảng vảng tại cửa sau Khu B.</div>
            <div className="text-[10px] text-zinc-400 mt-1">25 phút trước</div>
          </div>
        ),
      },
    ],
  };

  return (
    <AntdHeader
      className="flex items-center justify-between px-4 md:px-6 z-10 sticky top-0 shadow-md"
      style={{ backgroundColor: '#1f5ca9', height: 64, lineHeight: '64px' }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-[6px]">
          <div className="h-10 w-10 shrink-0 flex items-center justify-center">
            <Image src={ctuLogo} alt="CTU Logo" width={40} height={40} className="object-contain" />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <span 
              className="text-white font-bold text-sm md:text-base leading-none tracking-wide"
              style={{ fontFamily: 'var(--font-k2d)' }}
            >
              ĐẠI HỌC CẦN THƠ
            </span>
            <span 
              className="text-[#00afef] text-[10px] md:text-[11px] font-medium leading-none mt-1"
              style={{ fontFamily: 'var(--font-readex-pro)' }}
            >
              Can Tho University
            </span>
          </div>
        </div>

        <div className="hidden lg:block border-l border-white/20 h-6 mx-3"></div>

        <span className="hidden lg:inline text-white/90 text-xs md:text-sm font-semibold uppercase tracking-wider truncate">
          Hệ thống Quản lý Ra/Vào Ký túc xá
        </span>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <Dropdown menu={notificationMenu} placement="bottomRight" arrow>
          <Badge count={2} size="small" offset={[-2, 2]} className="cursor-pointer">
            <Button
              type="text"
              aria-label="Thông báo"
              icon={<BellOutlined className="text-white text-xl" />}
              className="flex items-center justify-center p-2 rounded-full hover:bg-white/10"
            />
          </Badge>
        </Dropdown>

        <Dropdown menu={profileMenu} placement="bottomRight" trigger={['click']}>
          <Space className="cursor-pointer hover:bg-white/5 px-2 md:px-3 py-1 rounded-lg transition-colors">
            <Avatar size="default" src={user?.avatarUrl} icon={<UserOutlined />} className="border border-white/20" />
            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className="text-white text-xs font-semibold">Xin chào {user?.fullName || 'Admin'}</span>
              <span className="text-sky-200 text-[10px]">{user?.role === 'ADMIN' ? 'Quản trị hệ thống' : 'Trực ban'}</span>
            </div>
          </Space>
        </Dropdown>
      </div>
    </AntdHeader>
  );
};

export default Header;
