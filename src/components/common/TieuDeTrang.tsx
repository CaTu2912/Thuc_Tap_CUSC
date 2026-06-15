'use client';

import React from 'react';
import { Breadcrumb, Typography } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

// Định nghĩa giao diện cho từng mục trong thanh đường dẫn điều hướng (Breadcrumb)
interface MucDuongDan {
  // Tiêu đề của mục (Ví dụ: "Trang chủ")
  tieuDe: string;

  // Đường dẫn liên kết (tùy chọn)
  duongDan?: string;
}

// Định nghĩa giao diện thuộc tính cho Tiêu đề trang
interface ThuocTinhTieuDeTrang {
  // Tiêu đề chính của trang (Ví dụ: "Quản lý Sinh viên")
  tieuDe: string;

  // Mô tả ngắn gọn về chức năng trang bên dưới tiêu đề (tùy chọn)
  moTa?: string;

  // Danh sách các mục đường dẫn điều hướng (tùy chọn)
  duongDanDanhDau?: MucDuongDan[];

  // Thành phần React bổ sung hiển thị ở góc đối diện (Ví dụ: Nút "Thêm sinh viên")
  boSung?: React.ReactNode;
}

/**
 * Component Tiêu đề đầu trang (PageHeader).
 * Chức năng: Hiển thị thanh định vị đường dẫn (Breadcrumb), tên trang hiện tại, mô tả và các nút hành động bổ sung.
 */
export const TieuDeTrang: React.FC<ThuocTinhTieuDeTrang> = ({
  tieuDe,
  moTa,
  duongDanDanhDau,
  boSung,
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        {duongDanDanhDau && (
          <Breadcrumb className="mb-2 text-xs">
            {duongDanDanhDau.map((muc, chiSo) => (
              <Breadcrumb.Item key={chiSo}>
                {muc.duongDan ? (
                  <Link href={muc.duongDan} className="hover:text-[#1f5ca9] transition-colors">
                    {muc.tieuDe}
                  </Link>
                ) : (
                  <span className="text-zinc-400">{muc.tieuDe}</span>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}
        <div className="flex flex-col">
          <Title level={3} className="m-0 font-bold text-zinc-800 tracking-tight" style={{ margin: 0 }}>
            {tieuDe}
          </Title>
          {moTa && (
            <Paragraph className="m-0 text-zinc-500 text-sm mt-1" style={{ marginBottom: 0 }}>
              {moTa}
            </Paragraph>
          )}
        </div>
      </div>
      {boSung && <div className="flex items-center gap-3 w-full md:w-auto justify-end">{boSung}</div>}
    </div>
  );
};

export default TieuDeTrang;
