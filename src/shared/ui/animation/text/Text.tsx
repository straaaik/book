import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { AnimatePresence, motion } from 'motion/react';
import cls from './Text.module.scss';
import { LANG } from '@/shared/constant/constant';

interface TextProps {
    className?: string;
    text: string | number;
    currency?: boolean;
    percentages?: boolean;
}

export const Text = ({ className, text, currency = false, percentages = false }: TextProps) => {
    const changeHighlight = () => {
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
            else if (percentages) return Intl.NumberFormat(LANG, { style: 'percent' }).format(text);
            else return Intl.NumberFormat(LANG, { roundingPriority: 'morePrecision' }).format(text);
        } else return text;
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className={classNames(cls.text, {}, [className, changeHighlight()])}
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
