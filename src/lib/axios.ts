import axios from 'axios';

// Khởi tạo thực thể Axios cơ bản
// Cấu hình các tham số đường dẫn gốc, thời gian chờ và tiêu đề mặc định.
const boGoiApi = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Bộ chặn yêu cầu (Request Interceptor)
// Chức năng: Tự động thêm mã xác thực JWT vào tiêu đề của mỗi yêu cầu gửi đi.
boGoiApi.interceptors.request.use(
  (cauHinh) => {
    // Lấy mã xác thực từ bộ nhớ cục bộ (localStorage) nếu đang ở môi trường trình duyệt
    const maXacThuc = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // Nếu tồn tại mã xác thực, gán vào tiêu đề Authorization
    if (maXacThuc && cauHinh.headers) {
      cauHinh.headers.Authorization = `Bearer ${maXacThuc}`;
    }
    return cauHinh;
  },
  (loi) => {
    // Trả về lỗi nếu có sự cố xảy ra trong quá trình gửi yêu cầu
    return Promise.reject(loi);
  }
);

// Bộ chặn phản hồi (Response Interceptor)
// Chức năng: Xử lý kết quả trả về hoặc bắt lỗi tập trung từ phản hồi của API.
boGoiApi.interceptors.response.use(
  (phanHoi) => phanHoi,
  (loi) => {
    // Trả về lỗi để nơi gọi tự xử lý (ví dụ: chuyển hướng khi không có quyền truy cập)
    return Promise.reject(loi);
  }
);

export default boGoiApi;

/**
 * Hàm hỗ trợ giả lập thời gian trễ phản hồi từ API.
 * Chức năng: Tạo ra một khoảng thời gian chờ bất đồng bộ.
 * @param soMiligiay Thời gian trễ cần giả lập (mặc định 300ms)
 */
export const moPhongDoTre = (soMiligiay: number = 300) => {
  // Trả về một Promise sẽ hoàn thành sau số miligiay được chỉ định
  return new Promise((giaiQuyet) => {
    return setTimeout(giaiQuyet, soMiligiay);
  });
};
