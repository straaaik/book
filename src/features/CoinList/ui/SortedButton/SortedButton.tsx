'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './SortedButton.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/button/Button';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { sortingData } from '@/features/CoinList/services/sortingData';
import { CoinData } from '@/shared/types/types';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { motion } from 'motion/react';

interface SortedButtonProps {
    className?: string;
    children?: string;
    item: keyof CoinData;
}

export const SortedButton = ({ className, children, item }: SortedButtonProps) => {
    const [status, setStatus] = useState<number>(0);
    const { cache, mutate } = useSWRConfig();
    const key = '@"coins/markets",#params:#vs_currency:"usd",per_page:100,,,';
    const data = cache.get(key)?.data;

    const onButtonClick = (item: keyof CoinData) => {
        if (status !== 2) {
            setStatus((prev) => prev + 1);
        } else {
            setStatus(0);
        }
        mutate(key, sortingData(data, status, item), { revalidate: false, optimisticData: true });
    };

    return (
        <Button scale={[1.3, 0.98]} theme={ButtonTheme.CLEAR} onClick={() => onButtonClick(item)} className={classNames(cls.SortedButton, {}, [className])}>
            {status == 1 && (
                <motion.div className={cls.indicator} animate={{ rotate: 360 }}>
                    <AiOutlineCaretDown />
                </motion.div>
            )}
            {status == 2 && (
                <motion.div className={cls.indicator} animate={{ rotate: 540 }}>
                    <AiOutlineCaretDown />
                </motion.div>
            )}

            {status == 0 && (
                <motion.div className={cls.indicator} animate={{ rotate: 540, opacity: 0 }}>
                    <AiOutlineCaretDown />
                </motion.div>
            )}

            {children}
        </Button>
    );
};
