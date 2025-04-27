'use client';

import React from 'react';
import cls from './Header.module.scss';
import Link from 'next/link';
import { CoinSearch } from '@/features/Search/Search';

export default function header() {
    return (
        <div className={cls.header}>
            <div className={cls.icon}>
                <Link href={'/'} className={cls.logo}>
                    BOOKS
                </Link>
            </div>
            <div className={cls.search}>
                <CoinSearch />
            </div>
            <div className={cls.nav}>
                <Link href={'/portfolio'} className={cls.portfolio}>
                    Portfolio
                </Link>
            </div>
        </div>
    );
}
