// next.config.ts (نسخه نهایی، صحیح و تمیز)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // فقط پکیج‌های ضروری اینجا می‌مانند
  serverExternalPackages: [
    '@sparticuz/chromium-min',
    'puppeteer-core',
  ],
  
  // خروجی بهینه برای Vercel
  output: 'standalone',
};

export default nextConfig;