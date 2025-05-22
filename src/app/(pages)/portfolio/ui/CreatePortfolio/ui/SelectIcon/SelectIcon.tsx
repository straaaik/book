import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './SelectIcon.module.scss';
import { motion } from 'motion/react';
import { memo } from 'react';
import { Icons, ICONS } from '@/shared/assets/icon/PortfolioIcons';

interface SelectIconProps {
    className?: string;
    onClick?: (arg: Icons | null) => void;
    active: string | undefined;
}

export const SelectIcon = memo(({ className, onClick, active }: SelectIconProps) => {
    return (
        <div className={classNames(cls.SelectIcon, {}, [className])}>
            <motion.button
                animate={{ border: active == undefined ? '1px dotted var(--warn-color)' : '1px dotted var(--bg-secondary-color)' }}
                type="button"
                onClick={() => onClick?.(null)}
                whileHover={{ backgroundColor: 'var(--warn-color)' }}
                className={cls.icon_wrapper}
            >
                <div className={cls.icon} />
            </motion.button>
            {ICONS.map((item) => (
                <motion.button
                    type="button"
                    whileHover={{ backgroundColor: 'var(--warn-color)' }}
                    animate={{ border: active == item.name ? '1px dotted var(--warn-color)' : '1px dotted var(--bg-secondary-color)' }}
                    onClick={() => onClick?.(item)}
                    key={item.name}
                    className={cls.icon_wrapper}
                >
                    <item.icon className={cls.icon} />
                </motion.button>
            ))}
        </div>
    );
});
