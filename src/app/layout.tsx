import type { Metadata } from 'next';
import './styles/global.scss';
import { Quicksand } from 'next/font/google';

import { ThemeProvider } from 'next-themes';
import StoreProvider from './config/store/StoreProvider';
import { Header } from '@/widgets/Header';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';

export const metadata: Metadata = {
    title: 'Books',
};

const quicksand = Quicksand({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning lang="en">
            <body className={quicksand.className}>
                <StoreProvider>
                    <ThemeProvider>
                        <Header />
                        <ThemeSwitcher />
                        <div className="main">{children}</div>
                        {/* <Footer /> */}
                    </ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
