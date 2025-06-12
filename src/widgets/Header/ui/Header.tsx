'use client';

import React from 'react';

import cls from './Header.module.scss';
import { MyLink } from '@/shared/ui/Link/Link';
import { PiBriefcaseDuotone } from 'react-icons/pi';
import { CoinSearch } from '@/features/Search';

export function Header() {
    return (
        <div className={cls.header}>
            <MyLink href="/" text="Book" />
            <div className={cls.search}>
                <CoinSearch />
            </div>
            <MyLink icon={<PiBriefcaseDuotone />} href="/portfolio" text="Portfolio" />
        </div>
    );
}
