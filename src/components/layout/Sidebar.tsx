'use client';

import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import {
  AlertOutlined,
  BarChartOutlined,
  DashboardOutlined,
  FolderOpenOutlined,
  HistoryOutlined,
  HomeOutlined,
  LogoutOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants';

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleMenuClick: MenuProps['onClick'] = (event) => {
    if (event.key === 'logout') {
      logout();
      router.push(ROUTES.LOGIN);
      return;
    }
    router.push(event.key);
  };

  const menuItems: MenuProps['items'] = [
    { key: ROUTES.DASHBOARD, icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: ROUTES.HISTORY, icon: <HistoryOutlined />, label: 'Lịch sử ra vào' },
    { key: ROUTES.ALERTS, icon: <AlertOutlined />, label: 'Cảnh báo an ninh' },
    {
      key: 'categories-sub',
      icon: <FolderOpenOutlined />,
      label: 'Danh mục',
      children: [
        { key: ROUTES.CATEGORIES.STUDENTS, icon: <TeamOutlined />, label: 'Sinh viên' },
        { key: ROUTES.CATEGORIES.DORMITORIES, icon: <HomeOutlined />, label: 'Khu KTX' },
        { key: ROUTES.CATEGORIES.ROOMS, icon: <HomeOutlined />, label: 'Phòng' },
        { key: ROUTES.CATEGORIES.BANNED_STUDENTS, icon: <AlertOutlined />, label: 'Danh sách hạn chế' },
        { key: ROUTES.CATEGORIES.USERS, icon: <UserOutlined />, label: 'Tài khoản hệ thống' },
      ],
    },
    { key: ROUTES.STATISTICS, icon: <BarChartOutlined />, label: 'Thống kê' },
    { key: ROUTES.FEEDBACK, icon: <MessageOutlined />, label: 'Phản hồi MyCTU' },
    {
      key: 'logout',
      icon: <LogoutOutlined className="text-rose-500" />,
      label: <span className="text-rose-500 font-medium">Đăng xuất</span>,
    },
  ];

  return (
    <Sider
      width={260}
      breakpoint="lg"
      collapsedWidth="0"
      className="bg-white border-r border-zinc-100 shadow-xs h-full"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="py-4">
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={pathname.startsWith('/categories/') ? ['categories-sub'] : []}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none px-2"
          style={{ borderRight: 0 }}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
