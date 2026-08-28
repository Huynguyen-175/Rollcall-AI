import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rollcall AI — Live TFT Copilot',
  description: 'Speed-first screenshot decisions for live Teamfight Tactics games.',
  openGraph: {
    title: 'Rollcall AI — Live TFT Copilot',
    description: 'Drop your screen. Get the next move before the timer runs out.',
    images: [{ url: 'https://rollcall-ai-tft.anhhoanggy.chatgpt.site/og.jpg', width: 1280, height: 640 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rollcall AI — Live TFT Copilot',
    description: 'Drop your screen. Get the next move before the timer runs out.',
    images: ['https://rollcall-ai-tft.anhhoanggy.chatgpt.site/og.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
