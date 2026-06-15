'use client';

import React, { useState } from 'react';
import BoCucChinh from '../../../components/layout/BoCucChinh';
import TieuDeTrang from '../../../components/common/TieuDeTrang';
import ThanhTimKiemCongCu from '../../../components/common/ThanhTimKiemCongCu';
import BangDuLieu from '../../../components/common/BangDuLieu';
import NhanTrangThai from '../../../components/common/NhanTrangThai';
import XacNhanXoa from '../../../components/common/XacNhanXoa';
import DrawerNguoiDung from '../../../components/user/DrawerNguoiDung';
import { dungKhoSinhVien } from '../../../store/khoSinhVien';
import { Space, Button, Tooltip, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { NguoiDung } from '../../../types/NguoiDung';
import { duLieuGiaLapNguoiDung } from '../../../mocks/student.mock';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { xuatRaFileExcel } from '../../../utils/excel';

/**
 * Component Trang Danh mục Người dùng hệ thống (UsersCategoryPage).
 * Chức năng: Quản lý danh sách tài khoản quản trị hệ thống, điều phối viên, trực ban, tìm kiếm, chỉnh sửa, xóa và xuất Excel.
 */
export default function UsersCategoryPage() {
  // Trạng thái lưu từ khóa tìm kiếm người dùng
  const [tuKhoaTimKiem, datTuKhoaTimKiem] = useState('');
  
  // Trích xuất các phương thức điều khiển drawer người dùng từ store sinh viên
  const { datMoDrawerNguoiDung, datNguoiDungDuocChon } = dungKhoSinhVien();
  const boQuanLyTruyVan = useQueryClient();

  // Thực hiện truy vấn danh sách người dùng từ máy chủ giả lập
  const { data: danhSachNguoiDung = [], isLoading } = useQuery({
    queryKey: ['users', tuKhoaTimKiem],
    queryFn: async () => {
      // Giả lập cuộc gọi API lấy danh sách người dùng từ mock data
      let ketQua = [...duLieuGiaLapNguoiDung];
      if (tuKhoaTimKiem) {
        const tuKhoa = tuKhoaTimKiem.toLowerCase();
        ketQua = ketQua.filter((u) => {
          return (
            u.tenDangNhap.toLowerCase().includes(tuKhoa) ||
            u.hoVaTen.toLowerCase().includes(tuKhoa) ||
            u.email.toLowerCase().includes(tuKhoa)
          );
        });
      }
      return ketQua;
    },
  });

  // Hàm xử lý khi nhấn thêm người dùng mới
  const xuLyThemMoi = () => {
    datNguoiDungDuocChon(null);
    datMoDrawerNguoiDung(true);
  };

  // Hàm xử lý khi nhấn nút chỉnh sửa người dùng
  const xuLyChinhSua = (nguoiDung: NguoiDung) => {
    datNguoiDungDuocChon(nguoiDung);
    datMoDrawerNguoiDung(true);
  };

  // Hàm xử lý xóa tài khoản người dùng
  const xuLyXoaNguoiDung = async (id: string) => {
    try {
      // Trong dữ liệu mock, xóa người dùng khỏi mảng duLieuGiaLapNguoiDung
      const chiSo = duLieuGiaLapNguoiDung.findIndex((u) => {
        return u.id === id;
      });
      if (chiSo !== -1) {
        duLieuGiaLapNguoiDung.splice(chiSo, 1);
      }
      message.success('Xóa tài khoản hệ thống thành công!');
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['users'] });
    } catch (loi) {
      message.error('Có lỗi xảy ra khi xóa.');
    }
  };

  // Hàm xử lý xuất danh sách người dùng ra file Excel
  const xuLyXuatExcel = () => {
    const duLieuXuat = danhSachNguoiDung.map((u, chiSo) => {
      return {
        'STT': chiSo + 1,
        'Tên tài khoản': u.tenDangNhap,
        'Họ và tên': u.hoVaTen,
        'Địa chỉ Email': u.email,
        'Vai trò': u.vaiTro === 'ADMIN'
          ? 'Quản trị hệ thống'
          : u.vaiTro === 'MANAGER'
            ? 'Điều phối viên'
            : 'Trực ban',
        'Trạng thái': u.trangThai === 'ACTIVE' ? 'Đang hoạt động' : 'Tạm khóa',
        'Ngày tạo tài khoản': u.ngayTao,
      };
    });
    xuatRaFileExcel(
      duLieuXuat,
      `Danh_Sach_Tai_Khoan_He_Thong_${new Date().toISOString().split('T')[0]}`,
      'Tài khoản'
    );
  };

  // Cấu hình các cột hiển thị trên bảng dữ liệu người dùng
  const cotBang: ColumnsType<NguoiDung> = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'tenDangNhap',
      key: 'tenDangNhap',
      render: (vanBan) => {
        return <span className="font-semibold text-xs text-zinc-700">{vanBan}</span>;
      },
    },
    {
      title: 'Họ và tên',
      dataIndex: 'hoVaTen',
      key: 'hoVaTen',
      render: (vanBan) => {
        return <span className="font-bold text-xs text-zinc-800">{vanBan}</span>;
      },
    },
    {
      title: 'Địa chỉ Email',
      dataIndex: 'email',
      key: 'email',
      render: (vanBan) => {
        return <span className="text-xs text-zinc-500">{vanBan}</span>;
      },
    },
    {
      title: 'Vai trò',
      dataIndex: 'vaiTro',
      key: 'vaiTro',
      render: (vaiTro: string) => {
        if (vaiTro === 'ADMIN') {
          return <span className="text-xs text-rose-500 font-bold">Quản trị hệ thống</span>;
        }
        if (vaiTro === 'MANAGER') {
          return <span className="text-xs text-blue-500 font-bold">Điều phối viên</span>;
        }
        return <span className="text-xs text-zinc-500 font-medium">Trực ban</span>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai) => {
        return <NhanTrangThai trangThai={trangThai} />;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngayTao',
      key: 'ngayTao',
      render: (vanBan) => {
        return <span className="text-xs text-zinc-400">{vanBan}</span>;
      },
    },
    {
      title: 'Thao tác',
      key: 'hanhDong',
      width: 100,
      align: 'center',
      render: (_, record) => {
        return (
          <Space size={8}>
            <Tooltip title="Chỉnh sửa">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  return xuLyChinhSua(record);
                }}
                className="text-[#1f5ca9] hover:bg-sky-50"
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <div>
                <XacNhanXoa khiXacNhan={() => {
                  return xuLyXoaNguoiDung(record.id);
                }}>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    className="hover:bg-red-50"
                  />
                </XacNhanXoa>
              </div>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <BoCucChinh>
      <TieuDeTrang
        tieuDe="Quản lý Tài Khoản Hệ Thống"
        moTa="Phân quyền tài khoản quản lý và giám sát vận hành các thiết bị ra vào"
      />

      <ThanhTimKiemCongCu
        chuGoiY="Tìm theo tài khoản, tên hoặc email..."
        giaTriTimKiem={tuKhoaTimKiem}
        khiGiaTriThayDoi={datTuKhoaTimKiem}
        khiNhanThem={xuLyThemMoi}
        khiNhanXuatExcel={xuLyXuatExcel}
        khiNhanLamMoi={() => {
          return datTuKhoaTimKiem('');
        }}
        chuThemMoi="Thêm tài khoản"
      />

      <BangDuLieu<NguoiDung>
        columns={cotBang}
        dataSource={danhSachNguoiDung}
        dangTai={isLoading}
        rowKey="id"
      />

      <DrawerNguoiDung />
    </BoCucChinh>
  );
}

