import { classNames } from '../../../../lib/ClassNames/ClassNames';
import cls from './DropDownMenuItem.module.scss';
import { motion } from 'motion/react';
import { memo } from 'react';

interface DropDownMenuItemProps {
    className?: string;
    description: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export const DropDownMenuItem = memo(({ className, description, icon, onClick }: DropDownMenuItemProps) => {
    return (
        <motion.div onClick={onClick} whileHover={{ background: 'var(--warn-color)' }} className={classNames(cls.DropDownMenuItem, {}, [className])}>
            {icon && <div className={cls.icon}>{icon}</div>}
            <div className={cls.description}>{description}</div>
        </motion.div>
    );
});
