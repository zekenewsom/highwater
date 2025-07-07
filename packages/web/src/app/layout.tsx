import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { ClientProvider } from '../contexts/ClientContext';
import { PerformanceMonitor } from '../components/PerformanceMonitor';
// import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HighWater Protocol',
  description: 'Digital Asset Intelligence for Wealth Advisors',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <ClientProvider>
            {children}
            <PerformanceMonitor />
          </ClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
