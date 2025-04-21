'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { AnimatePresence, motion } from 'motion/react';
import cls from './Text.module.scss';
import { LANG } from '@/shared/constant/constant';

interface TextProps {
    className?: string;
    text: string | number;
    currency?: boolean;
    percentages?: boolean;
    big?: boolean;
    highlight?: boolean;
}

export const Text = ({ className, text, highlight = false, currency = false, percentages = false, big = false }: TextProps) => {
    const changeHighlightClass = () => {
        if (typeof text == 'number') {
            if (text > 0) {
                return cls.highlight_green;
            } else {
                return cls.highlight_red;
            }
        }
    };

    const changeText = () => {
        if (typeof text == 'number') {
            if (currency)
                return Intl.NumberFormat(LANG, {
                    style: 'currency',
                    currency: 'USD',
                    roundingPriority: 'morePrecision',
                }).format(text);
            else if (percentages) return Intl.NumberFormat(LANG, { style: 'percent', maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(text / 100);
            else if (big) return Intl.NumberFormat(LANG, { notation: 'compact', minimumFractionDigits: 2 }).format(text);
        } else return text;
    };

    const mods = {
        [changeHighlightClass()!]: highlight,
    };

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
                {changeText()}
            </motion.div>
        </AnimatePresence>
    );
};
