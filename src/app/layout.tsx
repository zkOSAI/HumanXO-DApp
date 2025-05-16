import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../providers/ThemeProvider';
import WalletContextProvider from '../providers/WalletContextProvider';
import LayoutWrapper from '../components/layout/LayoutWrapper';
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
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </WalletContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}