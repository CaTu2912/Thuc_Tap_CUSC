'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Alert, message } from 'antd';
import { UserOutlined, LockOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants';
import ctuLogo from '@/assets/CTU_logo.png';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isInitialized, login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isInitialized, isAuthenticated, router]);

  // Handle form submit
  const onFinish = async (values: any) => {
    const { username, password } = values;
    setLoading(true);
    setErrorMsg(null);

    try {
      const success = await login(username, password);
      if (success) {
        message.success('Đăng nhập hệ thống thành công!');
        router.push(ROUTES.DASHBOARD);
      } else {
        setErrorMsg('Tên đăng nhập không chính xác hoặc tài khoản đã bị khóa.');
      }
    } catch (err) {
      setErrorMsg('Đã xảy ra lỗi kết nối hệ thống. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Show white screen when check initial auth state
  if (!isInitialized || (isInitialized && isAuthenticated)) {
    return (
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-[#F5F7FA]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-[#1f5ca9] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[#1f5ca9] font-medium text-sm mt-3 font-sans">Đang tải trang đăng nhập...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f3a74] via-[#1f5ca9] to-[#00afef] p-4 relative overflow-hidden"
      style={{ fontFamily: 'var(--font-readex-pro)' }}
    >
      {/* Background design elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-400/15 blur-3xl select-none pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/20 blur-3xl select-none pointer-events-none"></div>

      <div className="w-full max-w-[430px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20 relative z-10">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 mb-3 flex items-center justify-center select-none">
            <Image 
              src={ctuLogo} 
              alt="CTU Logo" 
              width={64} 
              height={64} 
              className="object-contain" 
              priority
            />
          </div>
          <h2 
            className="text-slate-800 text-lg md:text-xl font-bold tracking-wide text-center uppercase mb-0"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            Đại học Cần Thơ
          </h2>
          <p 
            className="text-[#1f5ca9] text-[11px] md:text-xs font-semibold tracking-wider text-center uppercase mt-1 mb-0 opacity-90"
            style={{ fontFamily: 'var(--font-k2d)' }}
          >
            Hệ thống Quản lý Ra/Vào Ký túc xá
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#1f5ca9] to-transparent mt-4 opacity-50"></div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <Alert
            message={errorMsg}
            type="error"
            showIcon
            className="mb-4 text-xs"
          />
        )}

        {/* Login Form */}
        <Form
          name="login_form"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="mt-2"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              { whitespace: true, message: 'Tên đăng nhập không được chứa khoảng trắng!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined className="text-zinc-400 text-sm" />} 
              placeholder="Tên đăng nhập" 
              className="h-11 rounded-lg border-zinc-200 hover:border-[#1f5ca9] focus:border-[#1f5ca9] font-sans text-sm"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-zinc-400 text-sm" />}
              placeholder="Mật khẩu"
              className="h-11 rounded-lg border-zinc-200 hover:border-[#1f5ca9] focus:border-[#1f5ca9] font-sans text-sm"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item className="mt-4 mb-5">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="w-full h-11 rounded-lg font-sans font-semibold text-sm bg-[#1f5ca9] hover:bg-[#154a8a] border-none shadow-sm transition-all"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        {/* Demo Credentials Info Box */}
        <div className="bg-[#f0f7ff] border border-[#d2e7ff] rounded-lg p-3 text-xs text-slate-600 font-sans leading-relaxed">
          <div className="flex items-center gap-1.5 font-semibold text-[#1f5ca9] mb-1.5">
            <InfoCircleOutlined className="text-sm shrink-0" />
            <span>Tài khoản thử nghiệm hệ thống</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-slate-500">
            <li><strong className="text-slate-700">admin</strong> — Quản trị viên cao cấp</li>
            <li><strong className="text-slate-700">manager_a</strong> — Quản lý tòa nhà (Khu A)</li>
            <li><strong className="text-slate-700">operator_1</strong> — Trực ban cổng KTX</li>
            <li><strong className="text-slate-700">test</strong> — Tài khoản test mới (Quản lý)</li>
          </ul>
          <div className="mt-2 text-[10px] text-zinc-400 italic">
            * Nhập mật khẩu bất kỳ (ví dụ: 123456)
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-[10px] text-slate-400 border-t border-slate-100 pt-4 font-sans select-none leading-normal">
          <p className="mb-0">© 2026 Đại học Cần Thơ</p>
          <p className="mb-0 text-slate-300">Phát triển bởi Trung tâm Công nghệ Phần mềm (CUSC)</p>
        </div>

      </div>
    </div>
  );
}
