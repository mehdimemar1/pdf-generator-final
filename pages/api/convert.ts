// pages/api/convert.ts
import chromium from '@sparticuz/chromium';
import { type Browser, type LaunchOptions, PDFOptions, launch } from 'puppeteer-core';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs/promises';
import os from 'os';

// Environment Detection
const isProduction = process.env.VERCEL_ENV === 'production';
const isWindows = process.platform === 'win32';

// Chrome Paths for Windows
const winChromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(os.homedir(), 'AppData', 'Local', 'Google', 'Chrome', 'Application', 'chrome.exe')
];

// Chrome Paths for Linux and Mac
const unixChromePaths = [
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
];

// Cache the executable path for repeated API calls
let cachedChromePath: string | null = null;
/**
 * Finds the executable path for Chrome/Chromium
 */
async function getChromeExecutablePath(): Promise<string> {
  if (cachedChromePath) {
    return cachedChromePath;
  }
  if (!isProduction) {
    const pathsToCheck = isWindows ? winChromePaths : unixChromePaths;

    for (const p of pathsToCheck) {
      try {
        await fs.access(p);
        console.log(`Using local Chrome at: ${p}`);
        cachedChromePath = p;
        return p;
      } catch {
        // Continue searching
      }
    }
    console.warn('No local Chrome found, falling back to Chromium download');
  }

  if (isProduction) {
    cachedChromePath = await chromium.executablePath();
    return cachedChromePath;
  }

  const downloadPath = path.join(process.cwd(), 'node_modules', '.cache', 'chromium');
  console.log(`Downloading Chromium to: ${downloadPath}`);
  await fs.mkdir(downloadPath, { recursive: true });
  cachedChromePath = await chromium.executablePath(downloadPath);
  return cachedChromePath;
}

/**
 * Custom Styles with Enhanced Aesthetics
 */
const customStyles = `
  /* Vazirmatn Font */
  @font-face {
    font-family: 'Vazirmatn';
    src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn[wght].woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
  }
  
  /* Base Settings */
  * {
    font-family: 'Vazirmatn', Tahoma, sans-serif !important;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    margin: 0;
    padding: 2rem;
    line-height: 1.8;
    text-align: justify;
    text-justify: inter-word;
    direction: rtl;
    color: #4a5568; /* متن خاکستری تیره‌تر برای خوانایی بهتر */
    background-color: #edf2f7; /* پس‌زمینه خاکستری روشن‌تر */
  }
  
  /* Modern Header - Only on the first page */
  .header {
    padding: 0.5rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    position: relative; /* Changed to relative */
    top: 0;
    left: 0;
    z-index: 1000;
    border-radius: 0 0 0.5rem 0.5rem;
    margin-bottom: 2rem; /* Add margin below the header */
  }

  .document-title {
    font-size: 0.5rem;
    font-weight: 300;
    color: #2d3748;
    margin: 0.25rem 0;
  }

  .document-date {
    font-size: 1rem;
    color: #718096;
    margin: 0.25rem 0;
  }
  
  .content {
    margin-top: 2rem; /* Adjusted margin-top */
    margin-bottom: 6rem;
    position: relative;
    z-index: 0;
  }
  
  /* General Styles */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: #2d3748;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    line-height: 1.2;
  }
  
  h1 {
    font-size: 2rem;
    border-bottom: 0.25rem solid #4299e1;
    padding-bottom: 0.5rem;
  }
  
  p {
    margin: 0 0 1.25rem;
    text-indent: 2rem;
  }
  
  /* Elegant Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 0.9em;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  table thead tr {
    background-color: #4299e1;
    color: #fff;
    text-align: right;
  }
  
  table th {
    padding: 0.75rem 1rem;
    font-weight: 600;
  }
  
  table tbody tr {
    border-bottom: 1px solid #e2e8f0;
  }
  
  table tbody tr:nth-of-type(even) {
    background-color: #f7fafc;
  }
  
  table td {
    padding: 0.7rem 0.9rem;
  }
  
  /* Footer */
  .footer {
    display: none; /* Completely disabled */
  }
  
  /* Print Styles */
  @media print {
    .header {
      position: static; /* Remove fixed positioning */
    }
  }

  /* Page Numbering */
  .custom-pagination {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 0.75em;
    color: #a0aec0;
    padding: 0.25rem;
  }
`;

// Browser Settings
const getBrowserOptions = async (): Promise<LaunchOptions> => {
  const executablePath = await getChromeExecutablePath();
  console.log(`Launching browser with executable: ${executablePath}`);

  return {
    args: [
      '--disable-web-security',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
      '--no-zygote',
      '--no-sandbox',
      '--font-render-hinting=medium'
    ],
    executablePath,
    headless: true,
    timeout: 60000
  };
};

// Modified Footer Template
const footerTemplate = `
<div style="
    font-family: 'Vazirmatn', Tahoma, sans-serif;
    font-size: 10pt;
    color: #a0aec0;
    width: 100%;
    text-align: center;
    padding: 0.75rem 0;
    position: relative;
    overflow: hidden;
">
    <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: inherit;
        filter: blur(0px);
        z-index: -1;
    "></div>
    <div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #4ecdc4, #3498db, #9b59b6);
    "></div>
    <div style="position: relative; z-index: 2;">
        <span style="font-weight: bold; color: #2d3748;">صفحه</span>
        <span class="pageNumber" style="font-weight: bold;"></span>
        <span style="font-weight: bold; color: #2d3748;">از</span>
        <span class="totalPages" style="font-weight: bold;"></span>
    </div>
</div>
`;

// PDF Settings with Modified Footer
const pdfOptions: PDFOptions = {
  format: 'a4',
  printBackground: true,
  margin: { top: '50px', right: '30px', bottom: '80px', left: '30px' },
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate: footerTemplate,
  preferCSSPageSize: true,
  timeout: 60000
};

// HTML Size Limit
const MAX_HTML_SIZE = 500000; // 500KB

// Reuse browser instance when possible
let browserInstance: Browser | null = null;
/**
 * Generates PDF with Custom Layout
 */
const generatePdf = async (htmlContent: string): Promise<Buffer> => {
  try {
    if (!browserInstance) {
      const launchOptions = await getBrowserOptions();
      browserInstance = await launch(launchOptions);
    }
    
    const page = await browserInstance.newPage();
    page.setDefaultNavigationTimeout(120000);
    page.setDefaultTimeout(60000);

    // Persian Current Date
    const currentDate = new Date().toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // HTML with Custom Layout
    const fullHtml = `<!DOCTYPE html>
    <html dir="rtl" lang="fa">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated Document</title>
      <style>${customStyles}</style>
    </head>
    <body>
      <div class="header">
        <div class="document-title">تهیه شده در ربات تلگرام  <a href="https://t.me/Gemini3chatbot">@Gemini3chatbot</a></div>
        <div class="document-date">${currentDate}</div>
      </div>
      
      <div class="content">
        ${htmlContent}
      </div>      
    </body>
    </html>`;

    console.log('Setting content...');
    await page.setContent(fullHtml, {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    interface WindowWithPageNumbers extends Window {
      addPageNumbers?: () => void;
    }

    await page.evaluate(() => {
      const win = window as WindowWithPageNumbers;
      if (typeof win.addPageNumbers === 'function') {
        win.addPageNumbers();
      }
    });
    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf(pdfOptions);

    // Close the page but keep the browser open
    await page.close();
    
    console.log('PDF generated successfully');
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("Error in generatePdf:", error);

    // If there's an error, close and reset the browser instance
    if (browserInstance) {
      await browserInstance.close().catch(e => console.error('Error closing browser:', e));
      browserInstance = null;
    }
    
    throw error;
  }
};

/**
 * API Handler
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS Settings
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`
    });
  }

  try {
    const { html } = req.body;

    if (!html || typeof html !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'HTML content is required and must be a string'
      });
    }

    if (Buffer.byteLength(html, 'utf8') > MAX_HTML_SIZE) {
      return res.status(413).json({
        success: false,
        error: `HTML content too large (max ${MAX_HTML_SIZE / 1000}KB)`
      });
    }

    console.log('Generating PDF...');
    const pdfBuffer = await generatePdf(html);

    if (!isProduction) {
      const outputPath = path.join(process.cwd(), 'output', 'generated.pdf');
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, pdfBuffer);
      console.log(`PDF saved to: ${outputPath}`);
    }

    return res.status(200).json({
      success: true,
      pdf: pdfBuffer.toString('base64'),
      environment: isProduction ? 'production' : 'development'
    });

  } catch (error) {
    console.error('API handler error:', error);

    const errorMessage = error instanceof Error
      ? error.message
      : 'Unknown error';

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      details: errorMessage,
      platform: process.platform,
      environment: isProduction ? 'production' : 'development'
    });
  } finally {
    // In production, close the browser after each request to avoid memory issues
    if (isProduction && browserInstance) {
      await browserInstance.close().catch(e => console.error('Error closing browser:', e));
      browserInstance = null;
    }
  }
}