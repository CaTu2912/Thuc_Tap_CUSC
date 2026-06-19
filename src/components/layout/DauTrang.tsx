'use client';

import React from 'react';
import { Avatar, Menu, Indicator, UnstyledButton } from '@mantine/core';
import { IconBell, IconUser, IconSettings, IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoCtu from '@/assets/CTU_logo.png';

/**
 * Component Đầu trang (Header) của hệ thống.
 * Chức năng: Hiển thị thanh tiêu đề, logo Đại học Cần Thơ, hộp thư thông báo nhanh và menu điều khiển tài khoản người dùng.
 */
export const DauTrang: React.FC = () => {
  const boChuyenHuong = useRouter();
  
  // Thông tin người dùng giả lập để dễ dàng ghép vào dự án khác
  const nguoiDung = {
    hoVaTen: 'Admin',
    vaiTro: 'ADMIN',
    duongDanAnhDaiDien: undefined,
  };

  // Hàm thực hiện đăng xuất và chuyển hướng về trang đăng nhập
  const xuLyDangXuat = () => {
    console.log('Đăng xuất...');
    boChuyenHuong.push('/login');
  };

  return (
    <header
      className="flex items-center justify-between px-4 md:px-6 z-10 sticky top-0 shadow-md shrink-0 select-none"
      style={{ backgroundColor: '#1f5ca9', height: 64 }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-[6px]">
          <div className="h-10 w-10 shrink-0 flex items-center justify-center">
            <Image src={logoCtu} alt="CTU Logo" width={40} height={40} className="object-contain" />
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
        {/* Dropdown Danh sách thông báo */}
        <Menu shadow="md" width={280} position="bottom-end" withArrow>
          <Menu.Target>
            <div className="cursor-pointer flex items-center justify-center">
              <Indicator label="2" size={16} color="red" offset={2} inline>
                <UnstyledButton
                  aria-label="Thông báo"
                  className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 text-white cursor-pointer transition-colors"
                >
                  <IconBell size={22} />
                </UnstyledButton>
              </Indicator>
            </div>
          </Menu.Target>
          <Menu.Dropdown className="p-1">
            <Menu.Item className="hover:bg-zinc-50 cursor-pointer">
              <div className="py-1 max-w-xs text-wrap whitespace-normal">
                <div className="font-semibold text-rose-500">Cảnh báo nghiêm trọng</div>
                <div className="text-xs text-zinc-500 mt-0.5">Sinh viên B2003792 đang bị hạn chế cố gắng quét thẻ.</div>
                <div className="text-[10px] text-zinc-400 mt-1">10 phút trước</div>
              </div>
            </Menu.Item>
            <Menu.Item className="hover:bg-zinc-50 cursor-pointer">
              <div className="py-1 max-w-xs text-wrap whitespace-normal">
                <div className="font-semibold text-amber-500">Phát hiện đối tượng lạ</div>
                <div className="text-xs text-zinc-500 mt-0.5">Người lạ lảng vảng tại cửa sau Khu B.</div>
                <div className="text-[10px] text-zinc-400 mt-1">25 phút trước</div>
              </div>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        {/* Dropdown Menu cá nhân */}
        <Menu shadow="md" width={200} position="bottom-end" withArrow trigger="click">
          <Menu.Target>
            <UnstyledButton className="cursor-pointer hover:bg-white/5 px-2 md:px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2">
              <Avatar 
                size="sm" 
                src={nguoiDung?.duongDanAnhDaiDien} 
                radius="xl" 
                className="border border-white/20"
              >
                <IconUser size={16} />
              </Avatar>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-white text-xs font-semibold">Xin chào {nguoiDung?.hoVaTen || 'Admin'}</span>
                <span className="text-sky-200 text-[10px]">{nguoiDung?.vaiTro === 'ADMIN' ? 'Quản trị hệ thống' : 'Trực ban'}</span>
              </div>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconUser size={14} />} className="cursor-pointer">
              Thông tin tài khoản
            </Menu.Item>
            <Menu.Item leftSection={<IconSettings size={14} />} className="cursor-pointer">
              Cài đặt hệ thống
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item 
              color="red" 
              leftSection={<IconLogout size={14} />} 
              onClick={xuLyDangXuat}
              className="cursor-pointer text-rose-600"
            >
              Đăng xuất
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
};

export default DauTrang;
