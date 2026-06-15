'use client';

import React, { useState, useMemo } from 'react';
import {
  Button,
  Input,
  Select,
  Table,
  Tag,
  Checkbox,
  Tooltip,
  Pagination,
  Space,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import BoCucChinh from '../../../components/layout/BoCucChinh';
import DrawerSinhVien from '../../../components/student/DrawerSinhVien';
import { dungSinhVien } from '../../../hooks/dungSinhVien';
import { dungKhoSinhVien } from '../../../store/khoSinhVien';
import { SinhVien } from '../../../types/SinhVien';
import { Ktx } from '../../../types/Ktx';
import { Phong } from '../../../types/Phong';
import { NguoiDung } from '../../../types/NguoiDung';
import { LUA_CHON_KTX } from '../../../constants';
import {
  duLieuGiaLapKtx,
  duLieuGiaLapPhong,
  duLieuGiaLapNguoiDung,
} from '../../../mocks/student.mock';

// ─── Tab definitions ─────────────────────────────────────────────────────────
const TABS = [
  { key: 'sinh-vien',     label: 'Sinh viên' },
  { key: 'khu-ktx',       label: 'Khu KTX' },
  { key: 'phong',         label: 'Phòng' },
  { key: 'danh-sach-cam', label: 'Danh sách cấm' },
  { key: 'nguoi-dung',    label: 'Người dùng hệ thống' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

// ─── Trạng thái sinh viên map ────────────────────────────────────────────────
const MAP_TRANG_THAI_SV: Record<string, { label: string; color: string }> = {
  ACTIVE:   { label: 'Đang ở',   color: '#16a34a' },
  INACTIVE: { label: 'Tạm vắng', color: '#d97706' },
  BANNED:   { label: 'Bị cấm',   color: '#dc2626' },
};

// ─── Nút icon thao tác ───────────────────────────────────────────────────────
const NutThaoTac = ({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) => (
  <Space size={4}>
    <Tooltip title="Chỉnh sửa">
      <button
        onClick={onEdit}
        className="w-7 h-7 flex items-center justify-center rounded hover:bg-blue-50 text-blue-600 transition-colors"
      >
        <EditOutlined style={{ fontSize: 13 }} />
      </button>
    </Tooltip>
    <Tooltip title="Xóa">
      <button
        onClick={onDelete}
        className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 text-red-500 transition-colors"
      >
        <DeleteOutlined style={{ fontSize: 13 }} />
      </button>
    </Tooltip>
  </Space>
);

// ─── Bộ lọc chung ────────────────────────────────────────────────────────────
const BoLocChung = ({
  children,
  onSearch,
  onReset,
}: {
  children?: React.ReactNode;
  onSearch?: () => void;
  onReset?: () => void;
}) => (
  <div className="flex flex-wrap items-end gap-3 mb-4">
    {children}
    <Button
      type="primary"
      icon={<SearchOutlined />}
      onClick={onSearch}
      style={{ backgroundColor: '#1f5ca9', height: 34 }}
      className="text-sm"
    >
      Tìm kiếm
    </Button>
    <Button icon={<ReloadOutlined />} onClick={onReset} style={{ height: 34 }} className="text-sm">
      Làm mới
    </Button>
  </div>
);

// ─── STT render ──────────────────────────────────────────────────────────────
const renderSTT = (trang: number, soHang: number) => (_: unknown, __: unknown, i: number) => (
  <span className="text-xs text-gray-500">{(trang - 1) * soHang + i + 1}</span>
);

// ─── Tab: Sinh viên ──────────────────────────────────────────────────────────
function BangSinhVien() {
  const [tuKhoa, datTuKhoa] = useState('');
  const [maKtx, datMaKtx] = useState('');
  const [trangThai, datTrangThai] = useState('');
  const [trang, datTrang] = useState(1);
  const [soHang, datSoHang] = useState(10);
  const [duocChon, datDuocChon] = useState<string[]>([]);

  const { danhSachSinhVien, dangTaiSinhVien, xoaSinhVien } = dungSinhVien({
    timKiem: tuKhoa,
    maKtx,
    trangThai,
  });
  const { datMoDrawerSinhVien, datSinhVienDuocChon } = dungKhoSinhVien();

  const dsTrang = useMemo(
    () => danhSachSinhVien.slice((trang - 1) * soHang, trang * soHang),
    [danhSachSinhVien, trang, soHang]
  );

  const xuLyThemMoi = () => { datSinhVienDuocChon(null); datMoDrawerSinhVien(true); };
  const xuLyChinhSua = (sv: SinhVien) => { datSinhVienDuocChon(sv); datMoDrawerSinhVien(true); };
  const xuLyLamMoi = () => { datTuKhoa(''); datMaKtx(''); datTrangThai(''); datTrang(1); datDuocChon([]); };

  const tatCaDuocChon = dsTrang.length > 0 && dsTrang.every((sv) => duocChon.includes(sv.mssv));
  const motPhanDuocChon = dsTrang.some((sv) => duocChon.includes(sv.mssv)) && !tatCaDuocChon;

  const cotBang: ColumnsType<SinhVien> = [
    {
      title: (
        <Checkbox
          checked={tatCaDuocChon}
          indeterminate={motPhanDuocChon}
          onChange={(e) => {
            if (e.target.checked) datDuocChon([...new Set([...duocChon, ...dsTrang.map((s) => s.mssv)])]);
            else datDuocChon(duocChon.filter((id) => !dsTrang.find((s) => s.mssv === id)));
          }}
        />
      ),
      key: 'chon',
      width: 44,
      render: (_, record) => (
        <Checkbox
          checked={duocChon.includes(record.mssv)}
          onChange={(e) =>
            e.target.checked
              ? datDuocChon([...duocChon, record.mssv])
              : datDuocChon(duocChon.filter((id) => id !== record.mssv))
          }
        />
      ),
    },
    {
      title: <span className="text-xs font-semibold text-gray-600">STT</span>,
      key: 'stt',
      width: 52,
      render: renderSTT(trang, soHang),
    },
    {
      title: <span className="text-xs font-semibold text-gray-600">MSSV</span>,
      dataIndex: 'mssv',
      render: (v) => <span className="text-xs font-mono text-gray-700">{v}</span>,
    },
    {
      title: <span className="text-xs font-semibold text-gray-600">Họ tên</span>,
      dataIndex: 'hoVaTen',
      render: (v) => <span className="text-xs font-medium text-gray-800">{v}</span>,
    },
    {
      title: <span className="text-xs font-semibold text-gray-600">Ngày sinh</span>,
      dataIndex: 'ngaySinh',
      render: (v: string) => {
        if (!v) return '—';
        const [y, m, d] = v.split('-');
        return <span className="text-xs text-gray-500">{d}/{m}/{y}</span>;
      },
    },
    {
      title: <span className="text-xs font-semibold text-gray-600">KTX</span>,
      dataIndex: 'tenKtx',
      render: (v) => <span className="text-xs text-gray-600">{v ?? '—'}</span>,
    },
    {
      title: <span className="text-xs font-semibold text-gray-600">Phòng</span>,
      dataIndex: 'tenPhong',
      render: (v) => <span className="text-xs text-gray-600">{v ?? '—'}</span>,
    },
    {
      title: <span className="text-xs font-semibold text-gray-600">Trạng thái</span>,
      dataIndex: 'trangThai',
      render: (v) => {
        const cfg = MAP_TRANG_THAI_SV[v] ?? { label: v, color: '#6b7280' };
        return <span style={{ color: cfg.color }} className="text-xs font-semibold">{cfg.label}</span>;
      },
    },
    {
      title: <span className="text-xs font-semibold text-gray-600">Thao tác</span>,
      key: 'thaoTac',
      width: 90,
      align: 'center',
      render: (_, record) => (
        <NutThaoTac
          onEdit={() => xuLyChinhSua(record)}
          onDelete={() => xoaSinhVien(record.mssv)}
        />
      ),
    },
  ];

  return (
    <div>
      <BoLocChung onReset={xuLyLamMoi}>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Nhập từ khóa</span>
          <Input
            placeholder="Nhập MSSV, họ tên..."
            value={tuKhoa}
            onChange={(e) => datTuKhoa(e.target.value)}
            style={{ width: 260, height: 34 }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Khu KTX</span>
          <Select
            value={maKtx || undefined}
            onChange={datMaKtx}
            placeholder="Tất cả"
            allowClear
            options={[{ value: '', label: 'Tất cả' }, ...LUA_CHON_KTX]}
            style={{ width: 130, height: 34 }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Trạng thái</span>
          <Select
            value={trangThai || undefined}
            onChange={datTrangThai}
            placeholder="Tất cả"
            allowClear
            options={[
              { value: '', label: 'Tất cả' },
              { value: 'ACTIVE', label: 'Đang ở' },
              { value: 'INACTIVE', label: 'Tạm vắng' },
              { value: 'BANNED', label: 'Bị cấm' },
            ]}
            style={{ width: 130, height: 34 }}
          />
        </div>
      </BoLocChung>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={xuLyThemMoi}
          style={{ backgroundColor: '#1f5ca9', height: 32 }}
          className="text-xs font-medium"
        >
          Thêm mới
        </Button>
        <Button
          icon={<EditOutlined />}
          disabled={duocChon.length !== 1}
          onClick={() => {
            const sv = danhSachSinhVien.find((s) => s.mssv === duocChon[0]);
            if (sv) xuLyChinhSua(sv);
          }}
          style={
            duocChon.length === 1
              ? { height: 32, backgroundColor: '#f97316', borderColor: '#f97316', color: '#fff' }
              : { height: 32 }
          }
          className="text-xs font-medium"
        >
          Sửa
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          disabled={duocChon.length === 0}
          onClick={() => { duocChon.forEach((id) => xoaSinhVien(id)); datDuocChon([]); }}
          style={{ height: 32 }}
          className="text-xs font-medium"
        >
          Xóa
        </Button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table<SinhVien>
          columns={cotBang}
          dataSource={dsTrang}
          loading={dangTaiSinhVien}
          rowKey="mssv"
          pagination={false}
          size="small"
          rowClassName="hover:bg-blue-50/30 transition-colors"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500">
          Hiển thị {Math.min((trang - 1) * soHang + 1, danhSachSinhVien.length)}–
          {Math.min(trang * soHang, danhSachSinhVien.length)} của {danhSachSinhVien.length} bản ghi
        </span>
        <div className="flex items-center gap-3">
          <Pagination
            current={trang}
            total={danhSachSinhVien.length}
            pageSize={soHang}
            onChange={datTrang}
            showSizeChanger={false}
            size="small"
          />
          <Select
            value={soHang}
            onChange={(v) => { datSoHang(v); datTrang(1); }}
            options={[
              { value: 10, label: '10 / Trang' },
              { value: 20, label: '20 / Trang' },
              { value: 50, label: '50 / Trang' },
            ]}
            style={{ width: 110 }}
            size="small"
          />
        </div>
      </div>

      <DrawerSinhVien />
    </div>
  );
}

// ─── Tab: Khu KTX ────────────────────────────────────────────────────────────
function BangKhuKtx() {
  const [tuKhoa, datTuKhoa] = useState('');
  const [trang, datTrang] = useState(1);
  const soHang = 10;

  const dsLoc = useMemo(
    () => duLieuGiaLapKtx.filter((k) => k.tenKtx.toLowerCase().includes(tuKhoa.toLowerCase())),
    [tuKhoa]
  );
  const dsTrang = dsLoc.slice((trang - 1) * soHang, trang * soHang);

  const cotBang: ColumnsType<Ktx> = [
    { title: <span className="text-xs font-semibold text-gray-600">STT</span>, key: 'stt', width: 52, render: renderSTT(trang, soHang) },
    { title: <span className="text-xs font-semibold text-gray-600">Tên khu</span>, dataIndex: 'tenKtx', render: (v) => <span className="text-xs font-medium text-gray-800">{v}</span> },
    { title: <span className="text-xs font-semibold text-gray-600">Số phòng</span>, dataIndex: 'soPhong', render: (v) => <span className="text-xs text-gray-600">{v}</span> },
    { title: <span className="text-xs font-semibold text-gray-600">Sức chứa</span>, dataIndex: 'sucChua', render: (v) => <span className="text-xs text-gray-600">{v}</span> },
    {
      title: <span className="text-xs font-semibold text-gray-600">Trạng thái</span>,
      dataIndex: 'trangThai',
      render: (v) => (
        <span className={`text-xs font-semibold ${v === 'ACTIVE' ? 'text-green-600' : 'text-red-500'}`}>
          {v === 'ACTIVE' ? 'Hoạt động' : 'Tạm ngưng'}
        </span>
      ),
    },
    { title: <span className="text-xs font-semibold text-gray-600">Thao tác</span>, key: 'thaoTac', width: 90, align: 'center', render: () => <NutThaoTac /> },
  ];

  return (
    <div>
      <BoLocChung onReset={() => { datTuKhoa(''); datTrang(1); }}>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Nhập từ khóa</span>
          <Input placeholder="Tìm tên khu KTX..." value={tuKhoa} onChange={(e) => datTuKhoa(e.target.value)} style={{ width: 260, height: 34 }} />
        </div>
      </BoLocChung>
      <div className="flex items-center gap-2 mb-4">
        <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#1f5ca9', height: 32 }} className="text-xs font-medium">Thêm mới</Button>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table<Ktx> columns={cotBang} dataSource={dsTrang} rowKey="id" pagination={false} size="small" rowClassName="hover:bg-blue-50/30" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500">Hiển thị {dsLoc.length} bản ghi</span>
        <Pagination current={trang} total={dsLoc.length} pageSize={soHang} onChange={datTrang} size="small" />
      </div>
    </div>
  );
}

// ─── Tab: Phòng ──────────────────────────────────────────────────────────────
const MAP_TT_PHONG: Record<string, { label: string; color: string }> = {
  AVAILABLE:   { label: 'Còn chỗ', color: '#16a34a' },
  FULL:        { label: 'Đầy',     color: '#d97706' },
  MAINTENANCE: { label: 'Bảo trì', color: '#dc2626' },
};

function BangPhong() {
  const [tuKhoa, datTuKhoa] = useState('');
  const [trang, datTrang] = useState(1);
  const soHang = 10;

  const dsLoc = useMemo(
    () => duLieuGiaLapPhong.filter((p) => p.tenPhong.toLowerCase().includes(tuKhoa.toLowerCase())),
    [tuKhoa]
  );
  const dsTrang = dsLoc.slice((trang - 1) * soHang, trang * soHang);

  const cotBang: ColumnsType<Phong> = [
    { title: <span className="text-xs font-semibold text-gray-600">STT</span>, key: 'stt', width: 52, render: renderSTT(trang, soHang) },
    { title: <span className="text-xs font-semibold text-gray-600">Tên phòng</span>, dataIndex: 'tenPhong', render: (v) => <span className="text-xs font-medium text-gray-800">{v}</span> },
    { title: <span className="text-xs font-semibold text-gray-600">Khu KTX</span>, dataIndex: 'tenKtx', render: (v) => <span className="text-xs text-gray-600">{v}</span> },
    { title: <span className="text-xs font-semibold text-gray-600">Tầng</span>, dataIndex: 'tang', render: (v) => <span className="text-xs text-gray-600">{v}</span> },
    { title: <span className="text-xs font-semibold text-gray-600">Sức chứa</span>, dataIndex: 'sucChua', render: (v) => <span className="text-xs text-gray-600">{v}</span> },
    { title: <span className="text-xs font-semibold text-gray-600">Số người ở</span>, dataIndex: 'soNguoiO', render: (v) => <span className="text-xs text-gray-600">{v}</span> },
    {
      title: <span className="text-xs font-semibold text-gray-600">Trạng thái</span>,
      dataIndex: 'trangThai',
      render: (v) => {
        const cfg = MAP_TT_PHONG[v] ?? { label: v, color: '#6b7280' };
        return <span style={{ color: cfg.color }} className="text-xs font-semibold">{cfg.label}</span>;
      },
    },
    { title: <span className="text-xs font-semibold text-gray-600">Thao tác</span>, key: 'thaoTac', width: 90, align: 'center', render: () => <NutThaoTac /> },
  ];

  return (
    <div>
      <BoLocChung onReset={() => { datTuKhoa(''); datTrang(1); }}>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Nhập từ khóa</span>
          <Input placeholder="Tìm tên phòng..." value={tuKhoa} onChange={(e) => datTuKhoa(e.target.value)} style={{ width: 260, height: 34 }} />
        </div>
      </BoLocChung>
      <div className="flex items-center gap-2 mb-4">
        <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#1f5ca9', height: 32 }} className="text-xs font-medium">Thêm mới</Button>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table<Phong> columns={cotBang} dataSource={dsTrang} rowKey="id" pagination={false} size="small" rowClassName="hover:bg-blue-50/30" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500">Hiển thị {dsLoc.length} bản ghi</span>
        <Pagination current={trang} total={dsLoc.length} pageSize={soHang} onChange={datTrang} size="small" />
      </div>
    </div>
  );
}

// ─── Tab: Danh sách cấm ──────────────────────────────────────────────────────
function BangDanhSachCam() {
  const [trang, datTrang] = useState(1);
  const soHang = 10;

  const { danhSachSinhVien } = dungSinhVien({ trangThai: 'BANNED' });
  const dsTrang = danhSachSinhVien.slice((trang - 1) * soHang, trang * soHang);

  const cotBang: ColumnsType<SinhVien> = [
    { title: <span className="text-xs font-semibold text-gray-600">STT</span>, key: 'stt', width: 52, render: renderSTT(trang, soHang) },
    { title: <span className="text-xs font-semibold text-gray-600">MSSV</span>, dataIndex: 'mssv', render: (v) => <span className="text-xs font-mono text-gray-700">{v}</span> },
    { title: <span className="text-xs font-semibold text-gray-600">Họ tên</span>, dataIndex: 'hoVaTen', render: (v) => <span className="text-xs font-medium text-gray-800">{v}</span> },
    { title: <span className="text-xs font-semibold text-gray-600">KTX</span>, dataIndex: 'tenKtx', render: (v) => <span className="text-xs text-gray-600">{v ?? '—'}</span> },
    { title: <span className="text-xs font-semibold text-gray-600">Phòng</span>, dataIndex: 'tenPhong', render: (v) => <span className="text-xs text-gray-600">{v ?? '—'}</span> },
    {
      title: <span className="text-xs font-semibold text-gray-600">Nợ phí</span>,
      dataIndex: 'noPhi',
      render: (v) => (
        <span className={`text-xs font-semibold ${(v ?? 0) > 0 ? 'text-red-500' : 'text-gray-400'}`}>
          {(v ?? 0) > 0 ? `${v.toLocaleString()} đ` : '0 đ'}
        </span>
      ),
    },
    { title: <span className="text-xs font-semibold text-gray-600">Trạng thái</span>, key: 'tt', render: () => <span className="text-xs font-semibold text-red-600">Bị cấm</span> },
    { title: <span className="text-xs font-semibold text-gray-600">Thao tác</span>, key: 'thaoTac', width: 90, align: 'center', render: () => <NutThaoTac /> },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#1f5ca9', height: 32 }} className="text-xs font-medium">Thêm mới</Button>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table<SinhVien> columns={cotBang} dataSource={dsTrang} rowKey="mssv" pagination={false} size="small" rowClassName="hover:bg-blue-50/30" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500">Hiển thị {danhSachSinhVien.length} bản ghi</span>
        <Pagination current={trang} total={danhSachSinhVien.length} pageSize={soHang} onChange={datTrang} size="small" />
      </div>
    </div>
  );
}

// ─── Tab: Người dùng hệ thống ────────────────────────────────────────────────
const MAP_VAI_TRO: Record<string, string> = {
  ADMIN:    'Quản trị',
  MANAGER:  'Điều phối',
  OPERATOR: 'Trực ban',
};

function BangNguoiDung() {
  const [tuKhoa, datTuKhoa] = useState('');
  const [trang, datTrang] = useState(1);
  const soHang = 10;

  const dsLoc = useMemo(
    () =>
      duLieuGiaLapNguoiDung.filter(
        (u) =>
          u.hoVaTen.toLowerCase().includes(tuKhoa.toLowerCase()) ||
          u.tenDangNhap.toLowerCase().includes(tuKhoa.toLowerCase())
      ),
    [tuKhoa]
  );
  const dsTrang = dsLoc.slice((trang - 1) * soHang, trang * soHang);

  const cotBang: ColumnsType<NguoiDung> = [
    { title: <span className="text-xs font-semibold text-gray-600">STT</span>, key: 'stt', width: 52, render: renderSTT(trang, soHang) },
    { title: <span className="text-xs font-semibold text-gray-600">Tên đăng nhập</span>, dataIndex: 'tenDangNhap', render: (v) => <span className="text-xs font-mono text-gray-700">{v}</span> },
    { title: <span className="text-xs font-semibold text-gray-600">Họ tên</span>, dataIndex: 'hoVaTen', render: (v) => <span className="text-xs font-medium text-gray-800">{v}</span> },
    { title: <span className="text-xs font-semibold text-gray-600">Email</span>, dataIndex: 'email', render: (v) => <span className="text-xs text-gray-600">{v}</span> },
    {
      title: <span className="text-xs font-semibold text-gray-600">Vai trò</span>,
      dataIndex: 'vaiTro',
      render: (v) => (
        <Tag color={v === 'ADMIN' ? 'blue' : v === 'MANAGER' ? 'green' : 'default'} className="text-xs">
          {MAP_VAI_TRO[v] ?? v}
        </Tag>
      ),
    },
    {
      title: <span className="text-xs font-semibold text-gray-600">Trạng thái</span>,
      dataIndex: 'trangThai',
      render: (v) => (
        <span className={`text-xs font-semibold ${v === 'ACTIVE' ? 'text-green-600' : 'text-red-500'}`}>
          {v === 'ACTIVE' ? 'Hoạt động' : 'Tạm khóa'}
        </span>
      ),
    },
    { title: <span className="text-xs font-semibold text-gray-600">Thao tác</span>, key: 'thaoTac', width: 90, align: 'center', render: () => <NutThaoTac /> },
  ];

  return (
    <div>
      <BoLocChung onReset={() => { datTuKhoa(''); datTrang(1); }}>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Nhập từ khóa</span>
          <Input
            placeholder="Tìm tên đăng nhập, họ tên..."
            value={tuKhoa}
            onChange={(e) => datTuKhoa(e.target.value)}
            style={{ width: 260, height: 34 }}
          />
        </div>
      </BoLocChung>
      <div className="flex items-center gap-2 mb-4">
        <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#1f5ca9', height: 32 }} className="text-xs font-medium">Thêm mới</Button>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table<NguoiDung> columns={cotBang} dataSource={dsTrang} rowKey="id" pagination={false} size="small" rowClassName="hover:bg-blue-50/30" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500">Hiển thị {dsLoc.length} bản ghi</span>
        <Pagination current={trang} total={dsLoc.length} pageSize={soHang} onChange={datTrang} size="small" />
      </div>
    </div>
  );
}

// ─── Trang chính ─────────────────────────────────────────────────────────────
export default function DanhMucHeThongPage() {
  const [tabHienTai, datTabHienTai] = useState<TabKey>('sinh-vien');

  const renderNoiDung = () => {
    switch (tabHienTai) {
      case 'sinh-vien':     return <BangSinhVien />;
      case 'khu-ktx':      return <BangKhuKtx />;
      case 'phong':        return <BangPhong />;
      case 'danh-sach-cam': return <BangDanhSachCam />;
      case 'nguoi-dung':   return <BangNguoiDung />;
    }
  };

  return (
    <BoCucChinh>
      {/* ── Tiêu đề ── */}
      <h1 className="text-lg font-bold text-gray-800 mb-5 uppercase tracking-wide">
        Danh mục hệ thống
      </h1>

      {/* ── Tab bar ── */}
      <div className="flex items-end border-b-2 border-gray-100 mb-5">
        {TABS.map((tab) => {
          const active = tabHienTai === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => datTabHienTai(tab.key)}
              className={`
                px-5 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap
                border-b-2 -mb-[2px]
                ${active
                  ? 'border-[#1f5ca9] text-[#1f5ca9]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Nội dung tab ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        {renderNoiDung()}
      </div>
    </BoCucChinh>
  );
}
