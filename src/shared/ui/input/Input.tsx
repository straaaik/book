import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Input.module.scss';
import { FC, InputHTMLAttributes } from 'react';
import { motion, useAnimate, ValueKeyframe } from 'motion/react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'info'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    info?: string;
}

export const Input: FC<InputProps> = ({ className, value, onChange, placeholder = '', info }) => {
    const [placeholderRef, placeholderAnimate] = useAnimate();
    const [borderRef, borderAnimate] = useAnimate();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const handlerFocus = () => {
        placeholderAnimate(placeholderRef.current, { opacity: 0 });
        borderAnimate(borderRef.current, { border: '2px solid var(--inverted-primary-color)' });
    };

    const handlerBlur = () => {
        if (!value) {
            placeholderAnimate(placeholderRef.current, { opacity: 1 });
            borderAnimate(borderRef.current, { border: '20px solid var(--inverted-primary-color)' });
        }
    };

    return (
        <div className={classNames(cls.InputContent, {}, [className])}>
            {info && <div className={cls.info}>{info}</div>}
            <motion.div ref={placeholderRef} className={cls.placeholder} style={{ pointerEvents: 'none' }}>
                {value ? '' : placeholder}
            </motion.div>
            <motion.input
                ref={borderRef}
                initial={{ border: value ? '2px solid var(--inverted-primary-color)' : '20px solid var(--inverted-primary-color)' }}
                onFocus={handlerFocus}
                onBlur={handlerBlur}
                className={cls.input}
                value={value}
                onChange={onChangeHandler}
            />
        </div>
    );
};
