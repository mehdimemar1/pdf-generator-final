import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // تنظیمات جدید برای پشتیبانی از پکیج‌های خارجی
  serverExternalPackages: [
    '@sparticuz/chromium-min',
    'puppeteer-core',
    'fs',
    'os',
    'path'
  ],



  // برای استقرار بهینه در Vercel
  output: 'standalone',

  // تنظیمات جدید برای پشتیبانی از فونت‌ها
  experimental: {
    optimizePackageImports: ['@sparticuz/chromium-min'],
  },
};

export default nextConfig;
