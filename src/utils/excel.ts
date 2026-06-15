import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Định nghĩa kiểu dữ liệu cho một dòng trong file Excel
export type DongExcel = Record<string, string | number | boolean | null | undefined>;

/**
 * Hàm xuất dữ liệu danh sách đối tượng ra tệp Excel (.xlsx).
 * Chức năng: Chuyển đổi mảng dữ liệu JSON thành bảng Excel và kích hoạt tải về trên trình duyệt.
 * @param duLieu Mảng các dòng dữ liệu cần xuất
 * @param tenFile Tên của tệp Excel đầu ra (không kèm đuôi)
 * @param tenTrang Tên của sheet trong tệp Excel (mặc định là 'Sheet1')
 */
export const xuatRaFileExcel = (duLieu: DongExcel[], tenFile: string, tenTrang: string = 'Sheet1') => {
  // Định nghĩa loại tệp (MIME type) cho Excel và đuôi định dạng tệp
  const loaiTep = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const duoiTep = '.xlsx';

  // Bước 1: Chuyển đổi dữ liệu JSON sang cấu hình Worksheet của thư viện xlsx
  const trangTinh = XLSX.utils.json_to_sheet(duLieu);

  // Bước 2: Tạo cấu trúc Workbook chứa Worksheet vừa tạo
  const soTinh = { Sheets: { [tenTrang]: trangTinh }, SheetNames: [tenTrang] };

  // Bước 3: Ghi dữ liệu Workbook ra một vùng đệm dạng mảng byte (array buffer)
  const vungDemExcel = XLSX.write(soTinh, { bookType: 'xlsx', type: 'array' });

  // Bước 4: Khởi tạo đối tượng Blob từ vùng đệm byte với định dạng tệp Excel
  const doiTuongBlob = new Blob([vungDemExcel], { type: loaiTep });

  // Bước 5: Thực hiện kích hoạt tải tệp về máy người dùng bằng thư viện file-saver
  saveAs(doiTuongBlob, tenFile + duoiTep);
};
