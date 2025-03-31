'use client';

import cls from './ThemeSwitcher.module.scss';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState<boolean>(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const changeTheme = () => {
        switch (theme) {
            case 'light':
                setTheme('dark');
                break;
            case 'dark':
                setTheme('light');
                break;
            default:
                setTheme('light');
        }
    };

    if (!mounted) return null;

    return (
        <label className={cls.switch}>
            <input type="checkbox" onClick={changeTheme} />
            <span className={`${cls.slider} ${cls.round}`}>
                <Image
                    className={`${cls.dark} ${theme == 'dark' ? cls.active : ''}`}
                    alt="dark"
                    src="/dark.svg"
                    width={20}
                    height={20}
                />
                <Image
                    className={`${cls.light} ${theme == 'light' ? cls.active : ''}`}
                    alt="light"
                    src="/light.svg"
                    width={20}
                    height={20}
                />
            </span>
        </label>
    );
};
