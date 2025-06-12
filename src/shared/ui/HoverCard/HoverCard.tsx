import { classNames } from '../../lib/ClassNames/ClassNames';
import cls from './HoverCard.module.scss';
import { motion } from 'motion/react';
import { useState } from 'react';

interface HoverCardProps {
    className?: string;
    title: React.ReactNode;
    description: React.ReactNode;
}

export const HoverCard = ({ className, title, description }: HoverCardProps) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <motion.div onHoverStart={() => setIsVisible(true)} onHoverEnd={() => setIsVisible(false)} className={classNames(cls.HoverCard, {}, [className])}>
            <motion.div className={cls.title}>{title}</motion.div>
            {isVisible && <motion.div className={cls.description}>{description}</motion.div>}
        </motion.div>
    );
};
