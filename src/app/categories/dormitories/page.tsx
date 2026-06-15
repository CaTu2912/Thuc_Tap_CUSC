'use client';

import React, { useState } from 'react';
import BoCucChinh from '../../../components/layout/BoCucChinh';
import TieuDeTrang from '../../../components/common/TieuDeTrang';
import ThanhTimKiemCongCu from '../../../components/common/ThanhTimKiemCongCu';
import BangDuLieu from '../../../components/common/BangDuLieu';
import NhanTrangThai from '../../../components/common/NhanTrangThai';
import XacNhanXoa from '../../../components/common/XacNhanXoa';
import DrawerKtx from '../../../components/dormitory/DrawerKtx';
import { dungKhoSinhVien } from '../../../store/khoSinhVien';
import { dichVuKtx } from '../../../services/ktx.service';
import { Space, Button, Tooltip, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { Ktx } from '../../../types/Ktx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { xuatRaFileExcel } from '../../../utils/excel';

/**
 * Component Trang Danh mục các khu ký túc xá (DormitoriesCategoryPage).
 * Chức năng: Quản lý danh sách khu nhà ký túc xá, thực hiện thêm mới, chỉnh sửa thông tin, xóa và xuất Excel.
 */
export default function DormitoriesCategoryPage() {
  // Trạng thái lưu từ khóa tìm kiếm
  const [tuKhoaTimKiem, datTuKhoaTimKiem] = useState('');
  
  // Trích xuất các phương thức điều khiển drawer khu nhà từ store
  const { datMoDrawerKtx, datKtxDuocChon } = dungKhoSinhVien();
  const boQuanLyTruyVan = useQueryClient();

  // Thực hiện truy vấn danh sách các khu ký túc xá từ máy chủ giả lập
  const { data: danhSachKtx = [], isLoading } = useQuery({
    queryKey: ['dormitories', tuKhoaTimKiem],
    queryFn: () => {
      return dichVuKtx.layDanhSachKtx({ timKiem: tuKhoaTimKiem });
    },
  });

  // Hàm xử lý khi nhấn nút thêm khu nhà mới
  const xuLyThemMoi = () => {
    datKtxDuocChon(null);
    datMoDrawerKtx(true);
  };

  // Hàm xử lý khi nhấn nút sửa thông tin khu nhà
  const xuLyChinhSua = (khuKtx: Ktx) => {
    datKtxDuocChon(khuKtx);
    datMoDrawerKtx(true);
  };

  // Hàm xử lý xóa khu ký túc xá
  const xuLyXoaKtx = async (id: string) => {
    try {
      await dichVuKtx.xoaKtx(id);
      message.success('Xóa khu ký túc xá thành công!');
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['dormitories'] });
    } catch (loi) {
      message.error('Có lỗi xảy ra khi xóa.');
    }
  };

  // Hàm xử lý xuất danh sách khu ký túc xá ra file Excel
  const xuLyXuatExcel = () => {
    const duLieuXuat = danhSachKtx.map((d, chiSo) => {
      return {
        'STT': chiSo + 1,
        'Mã Khu KTX': d.id,
        'Tên Khu KTX': d.tenKtx,
        'Số lượng phòng': d.soPhong,
        'Sức chứa tối đa (Người)': d.sucChua,
        'Trạng thái': d.trangThai === 'ACTIVE' ? 'Đang hoạt động' : 'Tạm ngưng',
      };
    });
    xuatRaFileExcel(
      duLieuXuat,
      `Danh_Sach_Khu_KTX_${new Date().toISOString().split('T')[0]}`,
      'Khu KTX'
    );
  };

  // Cấu hình các cột hiển thị trên bảng dữ liệu khu nhà
  const cotBang: ColumnsType<Ktx> = [
    {
      title: 'Mã Khu KTX',
      dataIndex: 'id',
      key: 'id',
      render: (vanBan) => {
        return <span className="font-mono font-bold text-xs text-zinc-700">{vanBan}</span>;
      },
    },
    {
      title: 'Tên Khu KTX',
      dataIndex: 'tenKtx',
      key: 'tenKtx',
      render: (vanBan) => {
        return <span className="font-bold text-xs text-zinc-800">{vanBan}</span>;
      },
    },
    {
      title: 'Số lượng phòng',
      dataIndex: 'soPhong',
      key: 'soPhong',
      align: 'center',
      render: (soPhong) => {
        return <span className="text-xs font-semibold">{soPhong} phòng</span>;
      },
    },
    {
      title: 'Sức chứa tối đa',
      dataIndex: 'sucChua',
      key: 'sucChua',
      align: 'center',
      render: (sucChua) => {
        return <span className="text-xs font-semibold">{sucChua} người</span>;
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
                  return xuLyXoaKtx(record.id);
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
        tieuDe="Quản lý Khu Ký Túc Xá"
        moTa="Danh sách các khu ký túc xá trực thuộc quản lý Đại học Cần Thơ"
      />

      <ThanhTimKiemCongCu
        chuGoiY="Tìm theo mã hoặc tên khu..."
        giaTriTimKiem={tuKhoaTimKiem}
        khiGiaTriThayDoi={datTuKhoaTimKiem}
        khiNhanThem={xuLyThemMoi}
        khiNhanXuatExcel={xuLyXuatExcel}
        khiNhanLamMoi={() => {
          return datTuKhoaTimKiem('');
        }}
        chuThemMoi="Thêm Khu KTX"
      />

      <BangDuLieu<Ktx>
        columns={cotBang}
        dataSource={danhSachKtx}
        dangTai={isLoading}
        rowKey="id"
      />

      <DrawerKtx />
    </BoCucChinh>
  );
}

