import { PhanHoi } from '../types/PhanHoi';

// Dữ liệu giả lập phản hồi của sinh viên
export const duLieuGiaLapPhanHoi: PhanHoi[] = [
  {
    id: 'F001',
    mssv: 'B2003790',
    hoVaTen: 'Trần Thị Hoa',
    noiDung: 'Em quét thẻ ra ngoài lúc 18:24 nhưng hệ thống ghi nhận lúc 18:50 làm ảnh hưởng điểm rèn luyện.',
    thoiGian: '2026-06-13 19:30:00',
    trangThai: 'PENDING'
  },
  {
    id: 'F002',
    mssv: 'B2104568',
    hoVaTen: 'Vũ Quốc Khánh',
    noiDung: 'Em không đi ra ngoài vào sáng ngày 12/06 nhưng lịch sử hiển thị có đi ra.',
    thoiGian: '2026-06-13 14:15:00',
    trangThai: 'RESOLVED',
    nguoiGiaiQuyet: 'Nguyễn Văn Trỗi',
    thoiGianGiaiQuyet: '2026-06-13 16:00:00'
  },
  {
    id: 'F003',
    mssv: 'B2003789',
    hoVaTen: 'Nguyễn Văn Nam',
    noiDung: 'Thiết bị camera nhận diện sai em thành người khác lúc 08:30 ngày 13/06.',
    thoiGian: '2026-06-13 10:20:00',
    trangThai: 'PENDING'
  },
  {
    id: 'F004',
    mssv: 'B2104569',
    hoVaTen: 'Đặng Thùy Linh',
    noiDung: 'Lỗi không hiển thị lịch sử quét vân tay ngày 11/06.',
    thoiGian: '2026-06-12 09:00:00',
    trangThai: 'RESOLVED',
    nguoiGiaiQuyet: 'Nguyễn Văn Trỗi',
    thoiGianGiaiQuyet: '2026-06-12 11:30:00'
  }
];
