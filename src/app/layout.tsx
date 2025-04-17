import type { Metadata } from 'next';
import './styles/global.scss';
import { Quicksand } from 'next/font/google';
import Header from '@/widgets/Header/Header';
import { ThemeProvider } from 'next-themes';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher/ThemeSwitcher';
import StoreProvider from './config/store/StoreProvider';

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
                        {children}
                    </ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
