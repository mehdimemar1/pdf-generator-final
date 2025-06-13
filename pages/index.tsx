// File: pages/index.tsx (Custom Landing Page)

import Head from 'next/head';
import styles from '@/styles/Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PDF Generator API</title>
        <meta name="description" content="API Service for converting HTML to PDF" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          🚀 اولین استقرار از گیت‌هاب!
        </h1>

        <p className={styles.description}>
          این سرویس برای تبدیل کد HTML به فایل PDF آماده دریافت درخواست می‌باشد.
        </p>

        <div className={styles.code}>
          <p>
            برای استفاده، یک درخواست <b>POST</b> به آدرس زیر ارسال کنید:
          </p>
          <code>/api/convert</code>
        </div>
      </main>
    </div>
  );
}