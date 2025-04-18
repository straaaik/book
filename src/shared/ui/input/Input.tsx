import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Input.module.scss';
import { FC, InputHTMLAttributes } from 'react';
import { motion } from 'motion/react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

export const Input: FC<InputProps> = ({ className, value, onChange, placeholder = 'placeholder' }) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.InputContent, {}, [className])}>
            <div className={cls.placeholder}>{placeholder}</div>
            <motion.input id="search" className={cls.input} value={value} onChange={onChangeHandler} />
        </div>
    );
};
