'use client';

import { classNames } from '../../lib/ClassNames/ClassNames';
import cls from './CounterBox.module.scss';
import { animate } from 'motion';
import { useMotionValue, useTransform, motion } from 'motion/react';
import { memo, useEffect } from 'react';
import { Button } from '../Button/Button';

interface CounterBoxProps {
    className?: string;
    description?: string;
    value: number;
    current?: string;
}

export const CounterBox = memo(({ className, description, value, current }: CounterBoxProps) => {
    const count = useMotionValue(0);
    const rounded = useTransform(() => (count.get() + 0.001).toFixed(2));

    useEffect(() => {
        const controls = animate(count, value, { duration: 1 });
        return () => controls.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div className={classNames(cls.CounterBox, {}, [className])}>
            <div className={cls.description}>{description}</div>
            <motion.div className={cls.data}>{rounded}</motion.div>
            {current && (
                // Изменения валюты
                <div className={cls.changesBtn}>
                    <Button>{current.toLocaleUpperCase()}</Button>
                </div>
            )}
        </div>
    );
});
