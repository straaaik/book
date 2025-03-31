'use client';

import React from 'react';
import cls from './Header.module.scss';
import Link from 'next/link';
import { Button, ButtonTheme } from '@/shared/ui/button/Button';

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
                <Button theme={ButtonTheme.INVERTED}>Search</Button>
            </div>
        </div>
    );
}
