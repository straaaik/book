import { motion, Variants } from 'motion/react';
import cls from './Link.module.scss';
import Link from 'next/link';

interface NavigationButtonProps {
    text?: string;
    onClick?: () => void;
    href: string;
    icon?: React.ReactNode;
}

const variantsButton: Variants = {
    hover: (index) => ({
        color: 'var(--warn-color)',
        scale: 1.3,
        // textShadow: '0 0 5px var(--warn-color)',
        transition: { delay: index * 0.05 },
    }),
};

export const MyLink = ({ text, onClick, href, icon }: NavigationButtonProps) => {
    const content = text?.split('');

    return (
        <Link href={href}>
            <motion.button whileHover="hover" type="button" className={cls.Link} onClick={onClick}>
                {icon && (
                    <motion.div className={cls.icon} variants={variantsButton}>
                        {icon}
                    </motion.div>
                )}
                {content?.map((symbol, i) => (
                    <motion.div className={cls.symbol} custom={i} variants={variantsButton} key={i}>
                        {symbol}
                    </motion.div>
                ))}
            </motion.button>
        </Link>
    );
};
