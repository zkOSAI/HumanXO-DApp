import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '../components/layout/Sidebar';
import { ThemeProvider } from '../providers/ThemeProvider';
import WalletContextProvider from '../providers/WalletContextProvider';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HumanXO by zkOS',
  description: 'Build your on-chain reputation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WalletContextProvider>
            <div className="flex h-screen">
              <Sidebar />
              <main className="flex-1 everett-font bg-gray-50 dark:bg-gray-900 overflow-auto">
                {children}
              </main>
            </div>
          </WalletContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}