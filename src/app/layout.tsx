import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import AuthProvider from '@/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BleepKart',
  description: 'We help make your wallter lighter!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={cn(inter.className, 'bg-background')}>
          <Navbar />
          <main className="p-4 max-w-7xl m-auto min-w-[300px]">{children}</main>
          <Toaster />
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
