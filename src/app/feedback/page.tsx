'use client';

import React, { useState } from 'react';
import BoCucChinh from '@/components/layout/BoCucChinh';
import TieuDeTrang from '@/components/common/TieuDeTrang';
import BoLocPhanHoi from '@/components/feedback/BoLocPhanHoi';
import BangPhanHoi from '@/components/feedback/BangPhanHoi';
import { dichVuPhanHoi } from '@/services/phanHoi.service';
import { dungKhoXacThuc } from '@/store/khoXacThuc';
import { message } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { xuatRaFileExcel } from '@/utils/excel';
import type { PhanHoi } from '@/types/PhanHoi';

/**
 * Component Trang Phản hồi (FeedbackPage).
 * Chức năng: Cho phép quản trị viên xem danh sách các khiếu nại/phản hồi từ sinh viên, lọc theo trạng thái và đánh dấu đã xử lý sự cố.
 */
export default function FeedbackPage() {
  // Trạng thái lưu từ khóa tìm kiếm và trạng thái xử lý được chọn
  const [tuKhoaTimKiem, datTuKhoaTimKiem] = useState('');
  const [trangThai, datTrangThai] = useState('');
  
  // Trích xuất thông tin người dùng từ store xác thực
  const nguoiDung = dungKhoXacThuc((trangThaiLuu) => {
    return trangThaiLuu.nguoiDung;
  });
  const boQuanLyTruyVan = useQueryClient();

  // Thực hiện truy vấn danh sách phản hồi từ máy chủ giả lập
  const { data: danhSachPhanHoi = [], isLoading } = useQuery({
    queryKey: ['feedbacks', tuKhoaTimKiem, trangThai],
    queryFn: () => {
      return dichVuPhanHoi.layDanhSachPhanHoi({
        timKiem: tuKhoaTimKiem,
        trangThai: trangThai ? (trangThai as PhanHoi['trangThai']) : undefined,
      });
    },
  });

  // Hàm yêu cầu làm mới dữ liệu liên quan sau các thao tác thay đổi
  const lamMoiPhanHoi = () => {
    boQuanLyTruyVan.invalidateQueries({ queryKey: ['feedbacks'] });
    boQuanLyTruyVan.invalidateQueries({ queryKey: ['dashboardData'] });
  };

  // Hàm xử lý khi nhấn nút đánh dấu giải quyết phản hồi
  const xuLyGiaiQuyet = async (id: string) => {
    try {
      await dichVuPhanHoi.giaiQuyetPhanHoi(id, nguoiDung?.hoVaTen || 'Admin');
      message.success('Cập nhật trạng thái giải quyết thành công!');
      lamMoiPhanHoi();
    } catch {
      message.error('Có lỗi xảy ra.');
    }
  };

  // Hàm xử lý khi nhấn nút xóa phản hồi
  const xuLyXoa = async (id: string) => {
    try {
      await dichVuPhanHoi.xoaPhanHoi(id);
      message.success('Xóa phản hồi thành công!');
      lamMoiPhanHoi();
    } catch {
      message.error('Có lỗi xảy ra khi xóa.');
    }
  };

  // Hàm xử lý xuất danh sách phản hồi ra file Excel
  const xuLyXuatExcel = () => {
    const duLieuXuat = danhSachPhanHoi.map((f, chiSo) => {
      return {
        STT: chiSo + 1,
        'Mã số sinh viên': f.mssv,
        'Họ và tên': f.hoVaTen,
        'Nội dung phản hồi': f.noiDung,
        'Thời điểm gửi': f.thoiGian,
        'Trạng thái': f.trangThai === 'PENDING' ? 'Chờ giải quyết' : 'Đã giải quyết',
        'Người giải quyết': f.nguoiGiaiQuyet || '',
        'Ngày giải quyết': f.thoiGianGiaiQuyet || '',
      };
    });

    xuatRaFileExcel(
      duLieuXuat,
      `Danh_Sach_Phan_Hoi_MyCTU_${new Date().toISOString().split('T')[0]}`,
      'Phản hồi'
    );
  };

  // Hàm xử lý đặt lại các bộ lọc tìm kiếm
  const xuLyDatLai = () => {
    datTuKhoaTimKiem('');
    datTrangThai('');
  };

  return (
    <BoCucChinh>
      <TieuDeTrang
        tieuDe="Danh sách phản hồi từ ứng dụng MyCTU"
        moTa="Tiếp nhận và điều chỉnh các khiếu nại sai lệch thông tin ghi nhận ra vào từ sinh viên Đại học Cần Thơ"
      />

      <BoLocPhanHoi
        tuKhoaTimKiem={tuKhoaTimKiem}
        trangThai={trangThai}
        khiTimKiemThayDoi={datTuKhoaTimKiem}
        khiTrangThaiThayDoi={datTrangThai}
        khiXuatFile={xuLyXuatExcel}
        khiLamMoi={xuLyDatLai}
      />

      <BangPhanHoi
        duLieu={danhSachPhanHoi}
        dangTai={isLoading}
        onGiaiQuyet={xuLyGiaiQuyet}
        onXoa={xuLyXoa}
      />
    </BoCucChinh>
  );
}

