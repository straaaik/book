'use client';

import React from 'react';
import cls from './Header.module.scss';
import Link from 'next/link';
import { CoinSearch } from '@/features/CoinSearch/CoinSearch';

export default function header() {
    return (
        <div className={cls.header}>
            <Link href={'/'} className={cls.logo}>
                BOOKS
            </Link>
            <div className={cls.nav}>
                <Link href={'/portfolio'} className={cls.portfolio}>
                    Portfolio
                </Link>
                <CoinSearch />
            </div>
        </div>
    );
}
