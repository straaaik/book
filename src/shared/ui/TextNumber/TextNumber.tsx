import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { AnimatePresence, motion } from 'motion/react';
import cls from './TextNumber.module.scss';
import { LANG } from '@/shared/constant/constant';

interface TextProps {
    className?: string;
    text: number;
    currency?: boolean;
    percentages?: boolean;
    big?: boolean;
    highlight?: boolean;
    currencyRounded?: boolean;
}

export const TextNumber = ({ className, text, highlight = false, currency = false, percentages = false, big = false, currencyRounded = false }: TextProps) => {
    const changeHighlightClass = () => {
        if (text > 0) {
            return cls.highlight_green;
        } else {
            return cls.highlight_red;
        }
    };

    const changeText = () => {
        if (currency)
            return Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'USD',
                roundingPriority: 'morePrecision',
            }).format(text);
        else if (percentages) return Intl.NumberFormat('ru-RU', { style: 'percent', maximumFractionDigits: 3, minimumFractionDigits: 0 }).format(text / 100);
        else if (big) return Intl.NumberFormat(LANG, { notation: 'compact', minimumFractionDigits: 0 }).format(text);
        else if (currencyRounded)
            return Intl.NumberFormat('ru-RU', {
                style: 'currency',
                notation: 'standard',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 3,
            }).format(text);
        else return Intl.NumberFormat('ru-RU').format(text);
    };

    const mods = {
        [changeHighlightClass()]: highlight,
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
