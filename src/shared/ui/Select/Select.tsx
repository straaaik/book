'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Select.module.scss';
import { memo, useRef, useState } from 'react';
import React from 'react';
import { Button } from '../Button/Button';
import { motion } from 'motion/react';
import { ButtonSelect } from './ui/ButtonSelect/ButtonSelect';
import { sidebarVariants } from './animation/animation';
import { HoverCard } from '../HoverCard/HoverCard';
import { BiError } from 'react-icons/bi';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';

interface Options {
    value: string;
    description: string;
}

interface SelectProps {
    className?: string;
    options: Options[];
    onChange?: (value: string) => void;
    initialValue: string;
    title?: string;
    error?: string;
}

export const Select = memo(({ className, options, onChange, initialValue, title, error }: SelectProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(ref, setIsVisible);

    const onClickHandler = (value: string) => {
        onChange?.(value);
        setIsVisible(false);
    };

    return (
        <motion.div ref={ref} initial={false} animate={isVisible ? 'open' : 'closed'} className={classNames(cls.Select, {}, [className])}>
            {title && <div className={cls.title}>{title}</div>}
            <div className={cls.error}>{error && <HoverCard title={<BiError />} description={error} />}</div>
            <ButtonSelect error={error} onClick={() => setIsVisible(!isVisible)} text={initialValue} />
            <motion.div style={{ top: title ? 65 : 40 }} className={cls.options} variants={sidebarVariants}>
                {options.map(({ description, value }) => (
                    <Button
                        type="button"
                        animation="bg"
                        style={{ background: value === initialValue ? 'var(--warn-color)' : 'var(--bg-secondary-color)' }}
                        className={cls.option}
                        key={value}
                        onClick={() => onClickHandler(value)}
                    >
                        {description}
                    </Button>
                ))}
            </motion.div>
        </motion.div>
    );
});
