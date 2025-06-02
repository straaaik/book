import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Input.module.scss';
import { FC, InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { BiError } from 'react-icons/bi';
import { HoverCard } from '../HoverCard/HoverCard';
import { animateVariants } from '../animation/variants';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'info'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    info?: string;
    badge?: string;
    focus?: boolean;
    regex?: 'number' | 'string';
    error?: string;
}

export const Input: FC<InputProps> = memo(({ className, value, onChange, placeholder = '', info, badge, focus, regex, error }) => {
    const [isFocus, setIsFocus] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (focus) {
            setIsFocus(true);
            ref.current?.focus();
        }
    }, [focus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (regex) {
            case 'number':
                const regex = /^\d*\.?\d*$/;
                if (regex.test(e.target.value)) onChange?.(e.target.value);
                break;
            case 'string':
                onChange?.(e.target.value);
                break;
            default:
                onChange?.(e.target.value);
                break;
        }
    };

    const handlerFocus = () => {
        setIsFocus(true);
    };

    const handlerBlur = () => {
        setIsFocus(false);
    };

    return (
        <motion.div style={{ marginTop: info ? 20 : 0 }} className={classNames(cls.InputContent, {}, [className])}>
            {info && <div className={cls.info}>{info}</div>}
            <motion.div animate={{ opacity: isFocus || value ? 0 : 1 }} className={cls.placeholder}>
                {!isFocus && !value && placeholder}
            </motion.div>
            <motion.input
                ref={ref}
                variants={animateVariants}
                style={{ paddingRight: badge ? 40 : 0 }}
                animate={error && 'error'}
                onFocus={handlerFocus}
                onBlur={handlerBlur}
                className={cls.input}
                value={value}
                onChange={onChangeHandler}
            />
            {badge && <motion.div className={cls.badge}>{badge}</motion.div>}
            <div className={cls.error}>{error && <HoverCard title={<BiError />} description={error} />}</div>
        </motion.div>
    );
});
