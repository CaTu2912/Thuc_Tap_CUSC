'use client';

import React, { useState } from 'react';
import BoCucChinh from '../../../components/layout/BoCucChinh';
import TieuDeTrang from '../../../components/common/TieuDeTrang';
import ThanhTimKiemCongCu from '../../../components/common/ThanhTimKiemCongCu';
import BangDuLieu from '../../../components/common/BangDuLieu';
import XacNhanXoa from '../../../components/common/XacNhanXoa';
import DrawerPhong from '../../../components/room/DrawerPhong';
import { dungKhoSinhVien } from '../../../store/khoSinhVien';
import { dichVuPhong } from '../../../services/phong.service';
import { Space, Button, Tooltip, message, Select, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { Phong } from '../../../types/Phong';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { xuatRaFileExcel } from '../../../utils/excel';
import { LUA_CHON_KTX } from '../../../constants';

/**
 * Component Trang Danh mục Phòng ký túc xá (RoomsCategoryPage).
 * Chức năng: Quản lý danh sách phòng ở ký túc xá, tìm kiếm theo tên phòng/khu nhà, thêm, sửa, xóa và xuất Excel.
 */
export default function RoomsCategoryPage() {
  // Trạng thái lưu từ khóa tìm kiếm và mã khu nhà lọc
  const [tuKhoaTimKiem, datTuKhoaTimKiem] = useState('');
  const [maKtx, datMaKtx] = useState('');
  
  // Trích xuất các phương thức điều khiển drawer phòng từ store sinh viên
  const { datMoDrawerPhong, datPhongDuocChon } = dungKhoSinhVien();
  const boQuanLyTruyVan = useQueryClient();

  // Thực hiện truy vấn danh sách phòng từ server giả lập
  const { data: danhSachPhong = [], isLoading } = useQuery({
    queryKey: ['rooms', tuKhoaTimKiem, maKtx],
    queryFn: () => {
      return dichVuPhong.layDanhSachPhong({ timKiem: tuKhoaTimKiem, maKtx });
    },
  });

  // Hàm xử lý khi nhấn nút thêm phòng ở mới
  const xuLyThemMoi = () => {
    datPhongDuocChon(null);
    datMoDrawerPhong(true);
  };

  // Hàm xử lý khi nhấn nút sửa thông tin phòng
  const xuLyChinhSua = (phong: Phong) => {
    datPhongDuocChon(phong);
    datMoDrawerPhong(true);
  };

  // Hàm xử lý xóa phòng ở
  const xuLyXoaPhong = async (id: string) => {
    try {
      await dichVuPhong.xoaPhong(id);
      message.success('Xóa phòng thành công!');
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['rooms'] });
    } catch (loi) {
      message.error('Có lỗi xảy ra khi xóa.');
    }
  };

  // Hàm xử lý xuất danh sách phòng ở ra file Excel
  const xuLyXuatExcel = () => {
    const duLieuXuat = danhSachPhong.map((r, chiSo) => {
      return {
        'STT': chiSo + 1,
        'Mã phòng': r.id,
        'Tên phòng': r.tenPhong,
        'Khu KTX': r.tenKtx,
        'Tầng': r.tang,
        'Sức chứa tối đa (Người)': r.sucChua,
        'Số người hiện tại': r.soNguoiO,
        'Trạng thái': r.trangThai === 'AVAILABLE'
          ? 'Còn trống'
          : r.trangThai === 'FULL'
            ? 'Đã đầy'
            : 'Bảo trì',
      };
    });
    xuatRaFileExcel(
      duLieuXuat,
      `Danh_Sach_Phong_KTX_${new Date().toISOString().split('T')[0]}`,
      'Danh sách phòng'
    );
  };

  // Hàm xử lý đặt lại các bộ lọc
  const xuLyDatLai = () => {
    datTuKhoaTimKiem('');
    datMaKtx('');
  };

  // Cấu hình các cột hiển thị trên bảng dữ liệu phòng
  const cotBang: ColumnsType<Phong> = [
    {
      title: 'Mã phòng',
      dataIndex: 'id',
      key: 'id',
      render: (vanBan) => {
        return <span className="font-mono font-bold text-xs text-zinc-700">{vanBan}</span>;
      },
    },
    {
      title: 'Tên phòng',
      dataIndex: 'tenPhong',
      key: 'tenPhong',
      render: (vanBan) => {
        return <span className="font-bold text-xs text-zinc-800">{vanBan}</span>;
      },
    },
    {
      title: 'Khu KTX',
      dataIndex: 'tenKtx',
      key: 'tenKtx',
      render: (vanBan) => {
        return <span className="text-zinc-500 text-xs">{vanBan}</span>;
      },
    },
    {
      title: 'Tầng',
      dataIndex: 'tang',
      key: 'tang',
      align: 'center',
      render: (soTang) => {
        return <span className="text-xs">Tầng {soTang}</span>;
      },
    },
    {
      title: 'Số người hiện tại',
      key: 'soNguoiHienTai',
      align: 'center',
      render: (_, record) => {
        return (
          <span className="text-xs font-semibold">
            {record.soNguoiO} / {record.sucChua} người
          </span>
        );
      },
    },
    {
      title: 'Trạng thái phòng',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai: string) => {
        if (trangThai === 'AVAILABLE') {
          return <Tag color="success" className="rounded-full px-2.5">Còn trống</Tag>;
        }
        if (trangThai === 'FULL') {
          return <Tag color="error" className="rounded-full px-2.5">Đã đầy</Tag>;
        }
        return <Tag color="warning" className="rounded-full px-2.5">Đang bảo trì</Tag>;
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
                  return xuLyXoaPhong(record.id);
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
        tieuDe="Quản lý Phòng Ký Túc Xá"
        moTa="Tra cứu phòng sinh hoạt, quản lý sức chứa và kiểm kê số người ở thực tế"
      />

      <ThanhTimKiemCongCu
        chuGoiY="Tìm theo mã phòng hoặc tên phòng..."
        giaTriTimKiem={tuKhoaTimKiem}
        khiGiaTriThayDoi={datTuKhoaTimKiem}
        khiNhanThem={xuLyThemMoi}
        khiNhanXuatExcel={xuLyXuatExcel}
        khiNhanLamMoi={xuLyDatLai}
        chuThemMoi="Thêm Phòng mới"
        boLocBoSung={
          <Select
            placeholder="Lọc theo Khu KTX"
            value={maKtx || undefined}
            onChange={datMaKtx}
            allowClear
            options={LUA_CHON_KTX}
            style={{ width: 160 }}
            className="rounded-lg"
          />
        }
      />

      <BangDuLieu<Phong>
        columns={cotBang}
        dataSource={danhSachPhong}
        dangTai={isLoading}
        rowKey="id"
      />

      <DrawerPhong />
    </BoCucChinh>
  );
}

