'use client';

import { AnimatePresence, motion } from 'motion/react';
import cls from './TextNumber.module.scss';
import { memo } from 'react';
import { NumberFormatter } from './module/NumberFormatter';
import { classNames } from '../../lib/ClassNames/ClassNames';

export type FormatNumber = 'currency' | 'percentages' | 'big' | 'currencyRounded';

interface TextProps {
    className?: string;
    text?: number;
    highlight?: boolean;
    format?: FormatNumber;
}

export const TextNumber = memo(({ className, text = 0, highlight = false, format }: TextProps) => {
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

    if (Number.isNaN(text)) return null;

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
