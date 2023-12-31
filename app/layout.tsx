import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Music Metadata Editor',
  description: 'Music Metadata Editor',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main style={{ minHeight: '100vh' }}>{children}</main>
      </body>
    </html>
  );
};
export default RootLayout;
