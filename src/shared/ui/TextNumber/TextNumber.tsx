'use client';

import { AnimatePresence, motion } from 'motion/react';
import cls from './TextNumber.module.scss';
import { memo } from 'react';
import { NumberFormatter } from './module/NumberFormatter';
import { classNames } from '../../lib/ClassNames/ClassNames';
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi';
import { LuTrendingUpDown } from 'react-icons/lu';

export type FormatNumber = 'currency' | 'percentages' | 'big' | 'currencyRounded';

interface TextProps {
    className?: string;
    text?: number;
    highlight?: boolean;
    format?: FormatNumber;
    color?: boolean;
}

export const TextNumber = memo(({ className, text = 0, highlight = false, format, color = false }: TextProps) => {
    const changeHighlightClass = () => {
        if (text > 0) {
            return cls.color_green;
        } else if (text < 0) {
            return cls.color_red;
        } else {
            return cls.color_blue;
        }
    };

    const mods = {
        [changeHighlightClass()]: color,
    };

    if (Number.isNaN(text)) return null;

    if (highlight)
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    className={classNames(cls.highlight, mods, [className])}
                    key={text}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className={cls.icon}>
                        {text > 0 && <HiTrendingUp />}
                        {text < 0 && <HiTrendingDown />}
                        {text === 0 && <LuTrendingUpDown />}
                    </span>
                    <span>{NumberFormatter(text, format)}</span>
                </motion.div>
            </AnimatePresence>
        );

    return (
        <AnimatePresence mode="wait">
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
        </AnimatePresence>
    );
});
