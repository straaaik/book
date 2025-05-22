'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Skeleton.module.scss';
import { motion } from 'motion/react';
import { memo } from 'react';

interface LoadingDataProps {
    className?: string;
    value?: number;
}

export const Skeleton = memo(({ className, value = 1 }: LoadingDataProps) => {
    const skeletonArr = new Array(value).fill(null);

    return (
        <motion.div style={{ position: 'relative' }} className={cls.LoadingDat}>
            {skeletonArr.map((_, i) => (
                <motion.div
                    key={i}
                    className={classNames(cls.block, {}, [className])}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            ))}
        </motion.div>
    );
});
