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

  // تنظیمات webpack برای جلوگیری از باندل شدن puppeteer در سرور
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('puppeteer-core');
    }
    return config;
  },

  // برای استقرار بهینه در Vercel
  output: 'standalone',

  // تنظیمات جدید برای پشتیبانی از فونت‌ها
  experimental: {
    optimizePackageImports: ['@sparticuz/chromium-min'],
  },
};

export default nextConfig;
