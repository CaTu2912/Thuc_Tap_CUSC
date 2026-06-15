'use client';

import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import {
  BarChartOutlined,
  DashboardOutlined,
  FolderOpenOutlined,
  HistoryOutlined,
  LogoutOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined,
  ClockCircleOutlined,
  StopOutlined,
  DollarOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import { dungKhoXacThuc } from '@/store/khoXacThuc';
import { DUONG_DAN } from '@/constants';

const { Sider } = Layout;

/**
 * Component Thanh bên (Sidebar) điều hướng chính của hệ thống.
 * Chức năng: Hiển thị menu điều hướng theo cấu trúc đúng thiết kế giao diện.
 */
export const ThanhBen: React.FC = () => {
  const duongDanHienTai = usePathname();
  const boChuyenHuong = useRouter();
  const dangXuat = dungKhoXacThuc((trangThai) => trangThai.dangXuat);

  // Hàm xử lý sự kiện khi người dùng click chọn mục menu
  const xuLyBamMenu: MenuProps['onClick'] = (suKien) => {
    if (suKien.key === 'logout') {
      dangXuat();
      boChuyenHuong.push(DUONG_DAN.LOGIN);
      return;
    }
    boChuyenHuong.push(suKien.key);
  };

  // Nhãn nhóm menu (section header)
  const NhanNhom = ({ text }: { text: string }) => (
    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block pt-1">
      {text}
    </span>
  );

  // Cấu hình menu khớp với ảnh thiết kế
  const cacMucMenu: MenuProps['items'] = [
    // ── Top-level items ──
    {
      key: DUONG_DAN.DASHBOARD,
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: DUONG_DAN.HISTORY,
      icon: <ClockCircleOutlined />,
      label: 'Lịch sử ra vào',
    },
    {
      key: DUONG_DAN.STATISTICS,
      icon: <BarChartOutlined />,
      label: 'Thống kê',
    },
    {
      key: DUONG_DAN.CATEGORIES.STUDENTS,
      icon: <FolderOpenOutlined />,
      label: 'Danh mục hệ thống',
    },

    // ── Nhóm: Quản lý ra vào ──
    {
      type: 'group',
      label: <NhanNhom text="Quản lý ra vào" />,
      children: [
        {
          key: `${DUONG_DAN.CATEGORIES.STUDENTS}?loc=coMat`,
          icon: <UserOutlined />,
          label: 'Sinh viên đang có mặt',
        },
        {
          key: `${DUONG_DAN.CATEGORIES.STUDENTS}?loc=vangMat`,
          icon: <TeamOutlined />,
          label: 'Sinh viên vắng mặt',
        },
      ],
    },

    // ── Nhóm: Cảnh báo ──
    {
      type: 'group',
      label: <NhanNhom text="Cảnh báo" />,
      children: [
        {
          key: DUONG_DAN.CATEGORIES.BANNED_STUDENTS,
          icon: <StopOutlined />,
          label: 'Sinh viên bị cấm',
        },
        {
          key: `${DUONG_DAN.CATEGORIES.STUDENTS}?loc=noPhi`,
          icon: <DollarOutlined />,
          label: 'Sinh viên nợ phí',
        },
        {
          key: `${DUONG_DAN.ALERTS}?loai=STRANGER`,
          icon: <EyeInvisibleOutlined />,
          label: 'Người lạ',
        },
      ],
    },

    // ── Nhóm: Phản hồi ──
    {
      type: 'group',
      label: <NhanNhom text="Phản hồi" />,
      children: [
        {
          key: DUONG_DAN.FEEDBACK,
          icon: <MessageOutlined />,
          label: 'Phản hồi MyCTU',
        },
      ],
    },

    // ── Đăng xuất ──
    {
      key: 'logout',
      icon: <LogoutOutlined className="text-rose-500" />,
      label: <span className="text-rose-500 font-medium">Đăng xuất</span>,
    },
  ];

  // Xác định selectedKey dựa trên đường dẫn hiện tại (bỏ query string)
  const selectedKey = (() => {
    const path = duongDanHienTai;
    if (path.startsWith(DUONG_DAN.CATEGORIES.STUDENTS)) return DUONG_DAN.CATEGORIES.STUDENTS;
    if (path.startsWith(DUONG_DAN.CATEGORIES.BANNED_STUDENTS)) return DUONG_DAN.CATEGORIES.BANNED_STUDENTS;
    return path;
  })();

  return (
    <Sider
      width={220}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ backgroundColor: '#FFFFFF', borderRight: '1px solid #f0f0f0' }}
      className="h-full shadow-sm"
    >
      <div className="py-3 flex flex-col h-full">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={cacMucMenu}
          onClick={xuLyBamMenu}
          className="border-none flex-1"
          style={{ borderRight: 0, fontSize: 13 }}
        />
      </div>
    </Sider>
  );
};

export default ThanhBen;
