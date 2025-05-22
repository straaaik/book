'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { AnimatePresence, motion } from 'motion/react';
import cls from './TextNumber.module.scss';
import { Skeleton } from '../Skeleton/Skeleton';
import { NumberFormatter } from './module/NumberFormater';
import { memo } from 'react';

export type FormatNumber = 'currency' | 'percentages' | 'big' | 'currencyRounded';

interface TextProps {
    className?: string;
    text: number;
    highlight?: boolean;
    format?: FormatNumber;
}

export const TextNumber = memo(({ className, text, highlight = false, format }: TextProps) => {
    const changeHighlightClass = () => {
        if (text > 0) {
            return cls.highlight_green;
        } else if (text < 0) {
            return cls.highlight_red;
        } else {
            return cls.highlight_blue;
        }
    };

    const mods = {
        [changeHighlightClass()]: highlight,
    };

    return (
        <AnimatePresence mode="wait">
            {Number.isNaN(text) ? (
                <Skeleton />
            ) : (
                <motion.div
                    className={classNames(cls.text, mods, [className])}
                    key={text}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    {NumberFormatter(text, format)}
                </motion.div>
            )}
        </AnimatePresence>
    );
});
