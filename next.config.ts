import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // این گزینه به Next.js می‌گوید که این پکیج‌ها را باندل نکند
  // و در عوض در زمان اجرا از node_modules بخواند.
  // این کار برای پکیج‌های با وابستگی‌های باینری مانند puppeteer ضروری است.
  serverExternalPackages: [
    '@sparticuz/chromium-min',
    'puppeteer-core',
    'fs',
    'os',
    'path'
  ],

  // این گزینه خروجی بیلد را برای پلتفرم‌های کانتینری مانند Vercel و Docker بهینه می‌کند.
  // این یک Best Practice است.
  output: 'standalone',

  // تنظیمات جدید برای پشتیبانی از فونت‌ها
  experimental: {
    optimizePackageImports: ['@sparticuz/chromium-min'],
  },
};

export default nextConfig;
