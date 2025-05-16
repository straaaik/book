import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Select.module.scss';
import { useState } from 'react';
import React from 'react';
import { Button } from '../Button/Button';
import { motion } from 'motion/react';
import { ButtonSelect } from './ui/ButtonSelect/ButtonSelect';
import { sidebarVariants } from './animation/animation';

interface Options {
    value: string;
    description: string;
}

interface SelectProps {
    className?: string;
    options: Options[];
    onChange?: (value: string) => void;
    initialValue: string;
}

export const Select = ({ className, options, onChange, initialValue }: SelectProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const onClickHandler = (value: string) => {
        onChange?.(value);
        setIsVisible(false);
    };

    return (
        <motion.div initial={false} animate={isVisible ? 'open' : 'closed'} className={classNames(cls.Select, {}, [className])}>
            <ButtonSelect onClick={() => setIsVisible(!isVisible)} text={initialValue} />
            <motion.div className={cls.options} variants={sidebarVariants}>
                {options.map(({ description, value }) => (
                    <Button
                        animation="bg"
                        style={{ background: value === initialValue ? 'var(--warn-color)' : 'var(--bg-color)' }}
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
};
