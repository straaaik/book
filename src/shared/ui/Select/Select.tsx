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

export interface Options {
    value: string;
    description: string;
}

interface SelectProps {
    className?: string;
    options: Options[];
    onChange?: (value: Options) => void;
    selectedValue: string;
    title?: string;
    error?: string;
}

export const Select = memo(({ className, options, onChange, selectedValue, title, error }: SelectProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(ref, setIsVisible);

    const onClickHandler = (option: Options) => {
        onChange?.(option);
        setIsVisible(false);
    };

    return (
        <motion.div ref={ref} initial={false} animate={isVisible ? 'open' : 'closed'} className={classNames(cls.Select, {}, [className])}>
            {title && <div className={cls.title}>{title}</div>}
            <div className={cls.error}>{error && <HoverCard title={<BiError />} description={error} />}</div>
            <ButtonSelect error={error} onClick={() => setIsVisible(!isVisible)} text={options.find((option) => option.value == selectedValue)} />
            <motion.div style={{ top: title ? 65 : 40 }} className={cls.options} variants={sidebarVariants}>
                {options.map((option) => (
                    <Button
                        type="button"
                        animation="bg"
                        style={{ backgroundColor: option.value === selectedValue ? 'var(--warn-color)' : 'var(--bg-secondary-color)' }}
                        className={cls.option}
                        key={option.value}
                        onClick={() => onClickHandler(option)}
                    >
                        {option.description}
                    </Button>
                ))}
            </motion.div>
        </motion.div>
    );
});
