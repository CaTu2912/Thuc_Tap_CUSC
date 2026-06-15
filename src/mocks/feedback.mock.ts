import { Feedback } from '../types/Feedback';

export const mockFeedbacks: Feedback[] = [
  {
    id: 'F001',
    mssv: 'B2003790',
    fullName: 'Trần Thị Hoa',
    content: 'Em quét thẻ ra ngoài lúc 18:24 nhưng hệ thống ghi nhận lúc 18:50 làm ảnh hưởng điểm rèn luyện.',
    timestamp: '2026-06-13 19:30:00',
    status: 'PENDING'
  },
  {
    id: 'F002',
    mssv: 'B2104568',
    fullName: 'Vũ Quốc Khánh',
    content: 'Em không đi ra ngoài vào sáng ngày 12/06 nhưng lịch sử hiển thị có đi ra.',
    timestamp: '2026-06-13 14:15:00',
    status: 'RESOLVED',
    resolvedBy: 'Nguyễn Văn Trỗi',
    resolvedAt: '2026-06-13 16:00:00'
  },
  {
    id: 'F003',
    mssv: 'B2003789',
    fullName: 'Nguyễn Văn Nam',
    content: 'Thiết bị camera nhận diện sai em thành người khác lúc 08:30 ngày 13/06.',
    timestamp: '2026-06-13 10:20:00',
    status: 'PENDING'
  },
  {
    id: 'F004',
    mssv: 'B2104569',
    fullName: 'Đặng Thùy Linh',
    content: 'Lỗi không hiển thị lịch sử quét vân tay ngày 11/06.',
    timestamp: '2026-06-12 09:00:00',
    status: 'RESOLVED',
    resolvedBy: 'Nguyễn Văn Trỗi',
    resolvedAt: '2026-06-12 11:30:00'
  }
];
