import React from 'react';
import cls from './Footer.module.scss';
import { Select } from '@/shared/ui/Select/Select';

export function Footer() {
    return (
        <div className={cls.footer}>
            <div className={cls.left}>
                <div className={cls.selected}>
                    <Select options={[{ description: 'USD', value: 'USD' }]} selectedValue="USD" />
                    <Select options={[{ description: 'ENG', value: 'ENG' }]} selectedValue="ENG" />
                </div>
                <div className={cls.info}>
                    <p>© 2025 Books. All rights reserved</p>
                    <p>
                        created by <span>stk</span>
                    </p>
                </div>
            </div>
            <div className={cls.right}>
                <div className={cls.links}>Links...</div>
            </div>
        </div>
    );
}
