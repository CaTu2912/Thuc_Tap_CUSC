'use client';

import React, { useState } from 'react';
import BoCucChinh from '@/components/layout/BoCucChinh';
import TieuDeTrang from '@/components/common/TieuDeTrang';
import { dungKhoBangDieuKhien } from '@/store/khoBangDieuKhien';
import { Table, Button, Badge, Space, Input, Select, Card, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CanhBao } from '@/types/CanhBao';
import {
  CheckOutlined,
  DownloadOutlined,
  SearchOutlined,
  SyncOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { xuatRaFileExcel } from '@/utils/excel';

/**
 * Trang Quản lý Cảnh báo An ninh (AlertsPage).
 * Chức năng: Theo dõi, tìm kiếm, lọc và đánh dấu xử lý các cảnh báo an ninh được phát hiện từ camera giám sát.
 */
export default function AlertsPage() {
  // Trích xuất danh sách cảnh báo và hàm giải quyết cảnh báo từ store
  const { canhBaoMoiNhat, giaiQuyetCanhBao } = dungKhoBangDieuKhien();
  
  // Các state quản lý điều kiện lọc tìm kiếm
  const [tuKhoaTimKiem, datTuKhoaTimKiem] = useState('');
  const [boLocMucDo, datBoLocMucDo] = useState<string>('ALL');
  const [boLocTrangThai, datBoLocTrangThai] = useState<string>('ALL');

  // Hàm xử lý xuất danh sách cảnh báo ra file Excel
  const xuLyXuatExcel = () => {
    const duLieuXuat = canhBaoMoiNhat.map((canhBao, chiSo) => {
      return {
        STT: chiSo + 1,
        'Mã cảnh báo': canhBao.id,
        'Thời gian': canhBao.thoiGian,
        'Nội dung cảnh báo': canhBao.noiDung,
        'Vị trí': canhBao.diaDiem,
        'Mức độ': canhBao.mucDoNghiemTrong === 'CRITICAL'
          ? 'Khẩn cấp'
          : canhBao.mucDoNghiemTrong === 'WARNING'
            ? 'Cảnh báo'
            : 'Thông tin',
        'Trạng thái': canhBao.daGiaiQuyet ? 'Đã xử lý' : 'Chưa xử lý',
      };
    });

    xuatRaFileExcel(
      duLieuXuat,
      `Lich_Su_Canh_Bao_An_Ninh_${new Date().toISOString().split('T')[0]}`,
      'Cảnh báo An ninh'
    );
  };

  // Hàm xử lý đặt lại toàn bộ các bộ lọc tìm kiếm
  const xuLyDatLaiBoLoc = () => {
    datTuKhoaTimKiem('');
    datBoLocMucDo('ALL');
    datBoLocTrangThai('ALL');
  };

  // Lọc danh sách cảnh báo theo từ khóa tìm kiếm và mức độ, trạng thái được chọn
  const danhSachLoc = canhBaoMoiNhat.filter((canhBao) => {
    const khopTimKiem =
      canhBao.noiDung.toLowerCase().includes(tuKhoaTimKiem.toLowerCase()) ||
      canhBao.diaDiem.toLowerCase().includes(tuKhoaTimKiem.toLowerCase()) ||
      canhBao.id.toLowerCase().includes(tuKhoaTimKiem.toLowerCase());

    const khopMucDo = boLocMucDo === 'ALL' || canhBao.mucDoNghiemTrong === boLocMucDo;
    const khopTrangThai =
      boLocTrangThai === 'ALL' ||
      (boLocTrangThai === 'RESOLVED' && canhBao.daGiaiQuyet) ||
      (boLocTrangThai === 'UNRESOLVED' && !canhBao.daGiaiQuyet);

    return khopTimKiem && khopMucDo && khopTrangThai;
  });

  // Tính toán các số liệu thống kê nhanh hiển thị ở các thẻ KPI
  const tongSoCanhBao = canhBaoMoiNhat.length;
  const soLuongChuaXuly = canhBaoMoiNhat.filter((a) => {
    return !a.daGiaiQuyet;
  }).length;
  const soLuongDaXuly = canhBaoMoiNhat.filter((a) => {
    return a.daGiaiQuyet;
  }).length;

  // Định nghĩa các cột cho bảng cảnh báo an ninh
  const cotBang: ColumnsType<CanhBao> = [
    {
      title: 'Mã số',
      dataIndex: 'id',
      key: 'id',
      width: 90,
      render: (vanBan) => {
        return <span className="font-mono font-bold text-xs text-zinc-700">{vanBan}</span>;
      },
    },
    {
      title: 'Thời gian',
      dataIndex: 'thoiGian',
      key: 'thoiGian',
      width: 150,
      render: (vanBan) => {
        return <span className="text-zinc-600 text-xs font-sans font-medium">{vanBan}</span>;
      },
    },
    {
      title: 'Nội dung cảnh báo',
      dataIndex: 'noiDung',
      key: 'noiDung',
      render: (vanBan, record) => {
        return (
          <div className="flex flex-col font-sans">
            <span
              className={`text-xs font-semibold ${
                record.mucDoNghiemTrong === 'CRITICAL'
                  ? 'text-rose-600'
                  : record.mucDoNghiemTrong === 'WARNING'
                    ? 'text-amber-600'
                    : 'text-blue-600'
              }`}
            >
              {vanBan}
            </span>
            <span className="text-[11px] text-zinc-400 mt-0.5">Khu vực phát hiện: {record.diaDiem}</span>
          </div>
        );
      },
    },
    {
      title: 'Mức độ',
      dataIndex: 'mucDoNghiemTrong',
      key: 'mucDoNghiemTrong',
      width: 120,
      render: (mucDo: string) => {
        if (mucDo === 'CRITICAL') {
          return (
            <Tag color="error" className="rounded-full px-3 py-0.5 border-none text-[11px] font-semibold flex items-center gap-1 w-max">
              <AlertOutlined /> Khẩn cấp
            </Tag>
          );
        } else if (mucDo === 'WARNING') {
          return (
            <Tag color="warning" className="rounded-full px-3 py-0.5 border-none text-[11px] font-semibold flex items-center gap-1 w-max">
              <AlertOutlined /> Cảnh báo
            </Tag>
          );
        }
        return (
          <Tag color="blue" className="rounded-full px-3 py-0.5 border-none text-[11px] font-semibold flex items-center gap-1 w-max">
            <InfoCircleOutlined /> Thông tin
          </Tag>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'daGiaiQuyet',
      key: 'daGiaiQuyet',
      width: 120,
      render: (daGiaiQuyet: boolean) => {
        return (
          <Badge
            status={daGiaiQuyet ? 'success' : 'default'}
            text={<span className="text-xs font-medium text-zinc-600">{daGiaiQuyet ? 'Đã xử lý' : 'Chưa xử lý'}</span>}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'hanhDong',
      width: 120,
      align: 'center',
      render: (_, record) => {
        return (
          <Space size="middle">
            {!record.daGiaiQuyet ? (
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined className="text-[10px]" />}
                onClick={() => {
                  return giaiQuyetCanhBao(record.id);
                }}
                className="bg-emerald-500 hover:bg-emerald-600 border-none text-xs rounded-lg flex items-center gap-1 px-3 py-1"
              >
                Xử lý
              </Button>
            ) : (
              <span className="text-zinc-400 text-xs flex items-center gap-1 font-medium font-sans">
                <CheckCircleOutlined className="text-emerald-500" /> Đã hoàn tất
              </span>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <BoCucChinh>
      <TieuDeTrang
        tieuDe="Quản lý Cảnh báo An ninh"
        moTa="Theo dõi và xử lý các sự cố an ninh, cảnh báo ra vào bất thường tại KTX Đại học Cần Thơ"
        boSung={
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={xuLyXuatExcel}
            className="rounded-lg bg-[#1f5ca9] hover:bg-[#1a4e8f] flex items-center h-10 px-4 font-sans font-semibold text-sm border-none shadow-sm"
          >
            Xuất dữ liệu Excel
          </Button>
        }
      />

      {/* Tóm tắt thông tin qua các thẻ KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card variant="borderless" className="shadow-xs border border-zinc-100 rounded-xl bg-gradient-to-br from-red-50 to-white">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-zinc-400 text-xs font-medium uppercase font-sans">Cảnh báo chưa xử lý</div>
              <div className="text-2xl font-bold text-rose-600 mt-1 font-sans" style={{ fontFamily: 'var(--font-k2d)' }}>
                {soLuongChuaXuly}
              </div>
            </div>
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center text-rose-500">
              <AlertOutlined className="text-lg animate-pulse" />
            </div>
          </div>
        </Card>

        <Card variant="borderless" className="shadow-xs border border-zinc-100 rounded-xl bg-gradient-to-br from-emerald-50 to-white">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-zinc-400 text-xs font-medium uppercase font-sans">Cảnh báo đã xử lý</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-sans" style={{ fontFamily: 'var(--font-k2d)' }}>
                {soLuongDaXuly}
              </div>
            </div>
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500">
              <CheckCircleOutlined className="text-lg" />
            </div>
          </div>
        </Card>

        <Card variant="borderless" className="shadow-xs border border-zinc-100 rounded-xl bg-gradient-to-br from-blue-50 to-white">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-zinc-400 text-xs font-medium uppercase font-sans">Tổng số cảnh báo hôm nay</div>
              <div className="text-2xl font-bold text-blue-600 mt-1 font-sans" style={{ fontFamily: 'var(--font-k2d)' }}>
                {tongSoCanhBao}
              </div>
            </div>
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
              <InfoCircleOutlined className="text-lg" />
            </div>
          </div>
        </Card>
      </div>

      {/* Thanh công cụ chứa các bộ lọc nhanh */}
      <div className="bg-white p-4 rounded-xl border border-zinc-100 shadow-xs mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <Input
            placeholder="Tìm theo mã, nội dung hoặc vị trí..."
            prefix={<SearchOutlined className="text-zinc-400" />}
            value={tuKhoaTimKiem}
            onChange={(e) => {
              return datTuKhoaTimKiem(e.target.value);
            }}
            className="w-full md:w-80 h-10 rounded-lg font-sans"
          />

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-zinc-500 whitespace-nowrap font-medium font-sans">Mức độ:</span>
            <Select
              value={boLocMucDo}
              onChange={datBoLocMucDo}
              className="w-full md:w-36 h-10 rounded-lg font-sans"
              classNames={{ popup: { root: 'font-sans' } }}
              options={[
                { value: 'ALL', label: 'Tất cả' },
                { value: 'CRITICAL', label: 'Khẩn cấp' },
                { value: 'WARNING', label: 'Cảnh báo' },
                { value: 'INFO', label: 'Thông tin' },
              ]}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-zinc-500 whitespace-nowrap font-medium font-sans">Trạng thái:</span>
            <Select
              value={boLocTrangThai}
              onChange={datBoLocTrangThai}
              className="w-full md:w-36 h-10 rounded-lg font-sans"
              classNames={{ popup: { root: 'font-sans' } }}
              options={[
                { value: 'ALL', label: 'Tất cả' },
                { value: 'UNRESOLVED', label: 'Chưa xử lý' },
                { value: 'RESOLVED', label: 'Đã xử lý' },
              ]}
            />
          </div>
        </div>

        <Button
          onClick={xuLyDatLaiBoLoc}
          icon={<SyncOutlined />}
          className="rounded-lg h-10 px-4 text-xs font-semibold text-zinc-600 hover:text-zinc-800 border-zinc-200 w-full md:w-auto font-sans flex items-center justify-center gap-1"
        >
          Đặt lại bộ lọc
        </Button>
      </div>

      {/* Bảng dữ liệu chính */}
      <div className="bg-white rounded-xl border border-zinc-100 shadow-xs overflow-hidden">
        <Table<CanhBao>
          columns={cotBang}
          dataSource={danhSachLoc}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            className: 'px-4 py-3 border-t border-zinc-100 font-sans',
          }}
          size="middle"
        />
      </div>
    </BoCucChinh>
  );
}

