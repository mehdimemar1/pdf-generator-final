import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SpeedInsights } from "@vercel/speed-insights/next"; // 1. ایمپورت کردن کامپوننت


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights /> {/* 2. افزودن کامپوننت به انتهای برنامه */}
    </>
  );
}
