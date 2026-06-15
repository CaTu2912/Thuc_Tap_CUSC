'use client';

import React, { useState } from 'react';
import BoCucChinh from '../../../components/layout/BoCucChinh';
import TieuDeTrang from '../../../components/common/TieuDeTrang';
import ThanhTimKiemCongCu from '../../../components/common/ThanhTimKiemCongCu';
import BangDuLieu from '../../../components/common/BangDuLieu';
import XacNhanXoa from '../../../components/common/XacNhanXoa';
import DrawerHanChe from '../../../components/banned/DrawerHanChe';
import { dichVuHanCheRaVao } from '../../../services/hanCheRaVao.service';
import { Space, Button, Tooltip, message, Tag } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { ThongKeSinhVienBiHanChe } from '../../../types/ThongKe';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { xuatRaFileExcel } from '../../../utils/excel';

/**
 * Component Trang Danh mục Sinh viên bị hạn chế ra vào (BannedStudentsCategoryPage).
 * Chức năng: Quản lý danh sách sinh viên bị cấm/hạn chế, thực hiện gỡ cấm, xóa bản ghi phạt, thêm mới lệnh hạn chế và xuất Excel.
 */
export default function BannedStudentsCategoryPage() {
  // Trạng thái lưu từ khóa tìm kiếm và trạng thái đóng/mở Drawer thêm mới
  const [tuKhoaTimKiem, datTuKhoaTimKiem] = useState('');
  const [moDrawer, datMoDrawer] = useState(false);
  const boQuanLyTruyVan = useQueryClient();

  // Thực hiện truy vấn danh sách sinh viên bị hạn chế ra vào từ server giả lập
  const { data: banGhiHanChe = [], isLoading } = useQuery({
    queryKey: ['bannedStudents', tuKhoaTimKiem],
    queryFn: () => {
      return dichVuHanCheRaVao.layDanhSachSinhVienBiHanChe({ timKiem: tuKhoaTimKiem });
    },
  });

  // Hàm xử lý gỡ bỏ hình phạt hạn chế cho sinh viên
  const xuLyGoBoHanChe = async (mssv: string) => {
    try {
      await dichVuHanCheRaVao.goBoHanChe(mssv);
      message.success('Gỡ bỏ hạn chế thành công!');
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['bannedStudents'] });
    } catch (loi) {
      message.error('Có lỗi xảy ra.');
    }
  };

  // Hàm xử lý xóa bỏ bản ghi hạn chế ra vào khỏi danh sách
  const xuLyXoaBanGhi = async (mssv: string) => {
    try {
      await dichVuHanCheRaVao.xoaBanGhiHanChe(mssv);
      message.success('Xóa bản ghi hạn chế thành công!');
      boQuanLyTruyVan.invalidateQueries({ queryKey: ['bannedStudents'] });
    } catch (loi) {
      message.error('Có lỗi xảy ra khi xóa.');
    }
  };

  // Hàm xử lý xuất danh sách sinh viên bị hạn chế ra file Excel
  const xuLyXuatExcel = () => {
    const duLieuXuat = banGhiHanChe.map((b, chiSo) => {
      return {
        'STT': chiSo + 1,
        'Mã số sinh viên': b.mssv,
        'Họ và tên': b.hoVaTen,
        'Lý do hạn chế': b.lyDo,
        'Ngày hạn chế': b.ngayHanChe,
        'Ngày hết hạn hạn chế': b.ngayHetHan,
        'Trạng thái': b.trangThai === 'ACTIVE' ? 'Đang hiệu lực' : 'Đã hết hạn',
      };
    });
    xuatRaFileExcel(
      duLieuXuat,
      `Danh_Sach_Han_Che_Ra_Vao_${new Date().toISOString().split('T')[0]}`,
      'Danh sách hạn chế'
    );
  };

  // Cấu hình các cột hiển thị trên bảng dữ liệu
  const cotBang: ColumnsType<ThongKeSinhVienBiHanChe> = [
    {
      title: 'Mã số sinh viên',
      dataIndex: 'mssv',
      key: 'mssv',
      render: (vanBan) => {
        return <span className="font-mono font-bold text-xs text-zinc-700">{vanBan}</span>;
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
      title: 'Lý do hạn chế',
      dataIndex: 'lyDo',
      key: 'lyDo',
      render: (vanBan) => {
        return (
          <span className="text-xs text-zinc-500 block max-w-sm truncate" title={vanBan}>
            {vanBan}
          </span>
        );
      },
    },
    {
      title: 'Ngày bắt đầu hạn chế',
      dataIndex: 'ngayHanChe',
      key: 'ngayHanChe',
      render: (vanBan) => {
        return <span className="text-xs text-zinc-600">{vanBan}</span>;
      },
    },
    {
      title: 'Ngày hết hạn hạn chế',
      dataIndex: 'ngayHetHan',
      key: 'ngayHetHan',
      render: (vanBan) => {
        return <span className="text-xs text-zinc-600 font-medium">{vanBan}</span>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai: string) => {
        if (trangThai === 'ACTIVE') {
          return <Tag color="error" className="rounded-full px-2.5">Đang hiệu lực</Tag>;
        }
        return <Tag color="default" className="rounded-full px-2.5">Đã hết hạn / Bãi bỏ</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'hanhDong',
      width: 120,
      align: 'center',
      render: (_, record) => {
        return (
          <Space size={8}>
            {record.trangThai === 'ACTIVE' && (
              <Tooltip title="Gỡ bỏ hạn chế">
                <Button
                  type="text"
                  icon={<CheckOutlined />}
                  onClick={() => {
                    return xuLyGoBoHanChe(record.mssv);
                  }}
                  className="text-emerald-500 hover:bg-emerald-50"
                />
              </Tooltip>
            )}
            <Tooltip title="Xóa bản ghi">
              <div>
                <XacNhanXoa khiXacNhan={() => {
                  return xuLyXoaBanGhi(record.mssv);
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
        tieuDe="Danh sách sinh viên bị hạn chế ra vào"
        moTa="Quản lý các trường hợp kỷ luật, hạn chế hoặc đình chỉ tạm thời ra vào ký túc xá"
      />

      <ThanhTimKiemCongCu
        chuGoiY="Tìm theo mã số sinh viên hoặc tên sinh viên..."
        giaTriTimKiem={tuKhoaTimKiem}
        khiGiaTriThayDoi={datTuKhoaTimKiem}
        khiNhanThem={() => {
          return datMoDrawer(true);
        }}
        khiNhanXuatExcel={xuLyXuatExcel}
        khiNhanLamMoi={() => {
          return datTuKhoaTimKiem('');
        }}
        chuThemMoi="Thêm hạn chế"
      />

      <BangDuLieu<ThongKeSinhVienBiHanChe>
        columns={cotBang}
        dataSource={banGhiHanChe}
        dangTai={isLoading}
        rowKey="mssv"
      />

      <DrawerHanChe
        mo={moDrawer}
        khiDong={() => {
          return datMoDrawer(false);
        }}
      />
    </BoCucChinh>
  );
}

