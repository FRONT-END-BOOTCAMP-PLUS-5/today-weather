import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: '옷늘날씨',
  description: '기온별 옷차림 공유 커뮤니티',
  icons: {
    icon: '/assets/icons/icon_logo.svg',
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
        className={`${pretendard.className} bg-white flex flex-col h-full items-center justify-between overflow-y-auto`}
      >
        {children}
      </body>
    </html>
  );
}
