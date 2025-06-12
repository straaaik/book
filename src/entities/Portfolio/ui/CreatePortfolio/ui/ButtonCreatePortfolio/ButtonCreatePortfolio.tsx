import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './ButtonCreatePortfolio.module.scss';
import { motion } from 'motion/react';

interface ButtonCreatePortfolioProps {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const ButtonCreatePortfolio = ({ className, onClick, children }: ButtonCreatePortfolioProps) => {
    return (
        <motion.button
            whileHover={{ backgroundColor: 'var(--bg-secondary-color)' }}
            whileTap={{ backgroundColor: 'var(--warn-color)' }}
            onClick={onClick}
            className={classNames(cls.ButtonCreatePortfolio, {}, [className])}
        >
            <div className={cls.text}>{children}</div>
        </motion.button>
    );
};
