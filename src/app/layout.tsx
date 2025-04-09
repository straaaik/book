import type { Metadata } from 'next';
import './styles/global.scss';
import { Quicksand } from 'next/font/google';
import Header from '@/widgets/Header/Header';
import { ThemeProvider } from 'next-themes';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher/ThemeSwitcher';

export const metadata: Metadata = {
    title: 'Books',
};

const quicksand = Quicksand();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning lang="en">
            <body className={quicksand.className}>
                <ThemeProvider>
                    <Header />
                    <ThemeSwitcher />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
