import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../providers/ThemeProvider';
import WalletContextProvider from '../providers/WalletContextProvider';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import type { Metadata } from 'next';
import ReactQueryProvider from '../providers/ReactQueryProvider';

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
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <WalletContextProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </WalletContextProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
