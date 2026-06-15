import type { Metadata } from 'next';
import './globals.css';
import AppProviders from '@/providers/AppProviders';
import { K2D, Readex_Pro } from 'next/font/google';

const k2d = K2D({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-k2d',
});

const readexPro = Readex_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-readex-pro',
});

export const metadata: Metadata = {
  title: "Hệ thống Quản lý Ra/Vào Ký túc xá - Đại học Cần Thơ",
  description:
    "Hệ thống giám sát và quản lý lịch sử ra vào ký túc xá Đại học Cần Thơ (CTU)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`h-full antialiased ${k2d.variable} ${readexPro.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
