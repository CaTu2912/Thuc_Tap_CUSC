'use client';

import React from 'react';

/**
 * Component Chân trang (Footer) của hệ thống.
 * Chức năng: Hiển thị bản quyền và tên đơn vị phát triển hệ thống bằng tiếng Việt.
 */
export const ChanTrang: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#1f5ca9',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '16px 24px',
        fontSize: '12px',
        fontWeight: 400,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-6 gap-2">
        <div>
          <span className="font-bold">ĐẠI HỌC CẦN THƠ (CTU)</span> - HỆ THỐNG GIÁM SÁT RA VÀO KÝ TÚC XÁ
        </div>
        <div className="opacity-80">
          Phát triển bởi Trung tâm Công nghệ Phần mềm Đại học Cần Thơ (CUSC) &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default ChanTrang;
