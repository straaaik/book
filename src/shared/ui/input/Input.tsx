import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Input.module.scss';
import { FC, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'info'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    info?: string;
    badge?: string;
    focus?: boolean;
}

export const Input: FC<InputProps> = ({ className, value, onChange, placeholder = '', info, badge, focus }) => {
    const [isFocus, setIsFocus] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (focus) {
            setIsFocus(true);
            ref.current?.focus();
        }
    }, [focus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const handlerFocus = () => {
        setIsFocus(true);
    };

    const handlerBlur = () => {
        setIsFocus(false);
    };

    return (
        <div className={classNames(cls.InputContent, {}, [className])}>
            {info && <div className={cls.info}>{info}</div>}
            <motion.div animate={{ opacity: isFocus || value ? 0 : 1 }} className={cls.placeholder}>
                {!isFocus && !value && placeholder}
            </motion.div>
            <motion.input
                ref={ref}
                onFocus={handlerFocus}
                onBlur={handlerBlur}
                animate={{ border: isFocus || value ? '2px solid var(--inverted-primary-color)' : '20px solid var(--inverted-primary-color)' }}
                className={cls.input}
                value={value}
                onChange={onChangeHandler}
            />
            {badge && <motion.div className={cls.badge}>{badge}</motion.div>}
        </div>
    );
};
