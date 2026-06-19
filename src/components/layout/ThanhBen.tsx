'use client';

import React from 'react';
import {
  IconLayoutDashboard,
  IconClock,
  IconChartBar,
  IconFolder,
  IconUser,
  IconUsers,
  IconBan,
  IconCurrencyDollar,
  IconEyeOff,
  IconMessage,
  IconLogout,
} from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DUONG_DAN } from '@/constants';

/**
 * Component Thanh bên (Sidebar) điều hướng chính của hệ thống.
 * Chức năng: Hiển thị menu điều hướng theo cấu trúc đúng thiết kế giao diện.
 */
export const ThanhBen: React.FC = () => {
  const duongDanHienTai = usePathname();
  const thamSoQuery = useSearchParams();
  const boChuyenHuong = useRouter();

  // Hàm xử lý sự kiện khi người dùng click chọn mục menu
  const xuLyBamMenu = (key: string) => {
    if (key === 'logout') {
      console.log('Đăng xuất...');
      boChuyenHuong.push('/login');
      return;
    }
    boChuyenHuong.push(key);
  };

  // Xác định một menu item có đang active hay không dựa trên path và query string
  const kiemTraActive = (key: string) => {
    if (key.includes('?')) {
      const [path, query] = key.split('?');
      if (duongDanHienTai !== path) return false;
      
      const params = new URLSearchParams(query);
      for (const [k, v] of params.entries()) {
        if (thamSoQuery.get(k) !== v) return false;
      }
      return true;
    }
    
    if (key === DUONG_DAN.CATEGORIES.STUDENTS) {
      return duongDanHienTai === DUONG_DAN.CATEGORIES.STUDENTS && !thamSoQuery.get('loc');
    }
    
    return duongDanHienTai === key;
  };

  // Nhãn nhóm menu (section header)
  const NhanNhom = ({ text }: { text: string }) => (
    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block px-6 pt-4 pb-2">
      {text}
    </span>
  );

  // Cấu hình menu khớp với ảnh thiết kế dùng Tabler Icons
  const cacMucMenu = [
    // ── Top-level items ──
    {
      key: DUONG_DAN.DASHBOARD,
      icon: <IconLayoutDashboard size={18} stroke={1.8} />,
      label: 'Dashboard',
    },
    {
      key: DUONG_DAN.HISTORY,
      icon: <IconClock size={18} stroke={1.8} />,
      label: 'Lịch sử ra vào',
    },
    {
      key: DUONG_DAN.STATISTICS,
      icon: <IconChartBar size={18} stroke={1.8} />,
      label: 'Thống kê',
    },
    {
      key: DUONG_DAN.CATEGORIES.STUDENTS,
      icon: <IconFolder size={18} stroke={1.8} />,
      label: 'Danh mục hệ thống',
    },

    // ── Nhóm: Quản lý ra vào ──
    {
      type: 'group',
      label: <NhanNhom text="Quản lý ra vào" />,
      children: [
        {
          key: `${DUONG_DAN.CATEGORIES.STUDENTS}?loc=coMat`,
          icon: <IconUser size={18} stroke={1.8} />,
          label: 'Sinh viên đang có mặt',
        },
        {
          key: `${DUONG_DAN.CATEGORIES.STUDENTS}?loc=vangMat`,
          icon: <IconUsers size={18} stroke={1.8} />,
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
          icon: <IconBan size={18} stroke={1.8} />,
          label: 'Sinh viên bị cấm',
        },
        {
          key: `${DUONG_DAN.CATEGORIES.STUDENTS}?loc=noPhi`,
          icon: <IconCurrencyDollar size={18} stroke={1.8} />,
          label: 'Sinh viên nợ phí',
        },
        {
          key: `${DUONG_DAN.ALERTS}?loai=STRANGER`,
          icon: <IconEyeOff size={18} stroke={1.8} />,
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
          icon: <IconMessage size={18} stroke={1.8} />,
          label: 'Phản hồi MyCTU',
        },
      ],
    },

    // ── Đăng xuất ──
    {
      key: 'logout',
      icon: <IconLogout size={18} stroke={1.8} />,
      label: <span className="font-medium text-rose-500">Đăng xuất</span>,
    },
  ];

  const renderMenuItem = (item: any) => {
    const active = kiemTraActive(item.key);
    const laDangXuat = item.key === 'logout';
    
    return (
      <button
        key={item.key}
        onClick={() => xuLyBamMenu(item.key)}
        className={`relative flex items-center gap-3 text-[13px] w-[calc(100%-16px)] mx-2 my-[2px] px-4 py-2.5 transition-all duration-150 select-none font-medium rounded-lg cursor-pointer text-left
          ${active 
            ? 'bg-[#00afef]/10 text-[#00afef]' 
            : laDangXuat
              ? 'text-rose-500 hover:bg-rose-50'
              : 'text-zinc-700 hover:bg-zinc-100/60 hover:text-zinc-900'
          }`}
      >
        <span className={`shrink-0 ${active ? 'text-[#00afef]' : laDangXuat ? 'text-rose-500' : 'text-zinc-400'}`}>
          {item.icon}
        </span>
        <span className="truncate">{item.label}</span>
      </button>
    );
  };

  const renderMenu = () => {
    return cacMucMenu.map((item, index) => {
      if ('type' in item && item.type === 'group') {
        return (
          <div key={`group-${index}`} className="flex flex-col">
            {item.label}
            {item.children?.map((child) => renderMenuItem(child))}
          </div>
        );
      }
      return renderMenuItem(item);
    });
  };

  return (
    <aside
      style={{ borderRight: '1px solid #f0f0f0' }}
      className="hidden lg:block w-[220px] shrink-0 h-full bg-white shadow-sm select-none"
    >
      <div className="py-3 flex flex-col h-full overflow-y-auto">
        {renderMenu()}
      </div>
    </aside>
  );
};

export default ThanhBen;
