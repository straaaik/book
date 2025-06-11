import { motion, Variants } from 'motion/react';
import cls from './NavigationButton.module.scss';

interface NavigationButtonProps {
    text?: string;
    onClick: () => void;
}

const variantsButton: Variants = {
    hover: (index) => ({
        color: 'var(--warn-color)',
        scale: 1.3,
        textShadow: '0 0 5px var(--warn-color)',
        transition: { delay: index * 0.05 },
    }),
};

export const NavigationButton = ({ text, onClick }: NavigationButtonProps) => {
    const content = text?.split('');

    return (
        <motion.button whileHover="hover" type="button" className={cls.NavigationButton} onClick={onClick}>
            {content?.map((symbol, i) => (
                <motion.div className={cls.symbol} custom={i} variants={variantsButton} key={i}>
                    {symbol}
                </motion.div>
            ))}
        </motion.button>
    );
};
