import React, { FC, memo, ReactNode } from 'react';
import cls from './Button.module.scss';
import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { motion, MotionStyle } from 'motion/react';

interface SearchProps {
    className?: string;
    onClick?: () => void;
    children?: ReactNode;
    theme?: string;
    size?: string;
    scale?: [number, number];
    style?: MotionStyle;
    animation?: 'bg_scale' | 'bg';
    type?: 'button' | 'submit' | 'reset';
}

export enum ButtonTheme {
    INVERTED = 'button_inverted',
    BACKGROUND = 'button_background',
    CLEAR = 'button_clear',
    DANGER = 'button_danger',
    OPACITY = 'button_opacity',
    BORDER = 'button_border',
    BORDER_WARN = 'button_border_warn',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

export const Button: FC<SearchProps> = memo((props) => {
    const { className, onClick, children, theme = ButtonTheme.CLEAR, size = ButtonSize.M, scale = [1.1, 0.95], style, animation, type = 'button' } = props;

    switch (animation) {
        case 'bg':
            return (
                <motion.button
                    type={type}
                    style={style}
                    whileHover={{ background: 'var(--warn-color)' }}
                    whileTap={{ scale: scale[1] }}
                    className={classNames(cls.Button, {}, [className, cls[theme], cls[size]])}
                    onClick={onClick}
                >
                    {children}
                </motion.button>
            );
        case 'bg_scale':
            return (
                <motion.button
                    type={type}
                    style={style}
                    whileHover={{ scale: scale[0], background: 'var(--warn-color)' }}
                    whileTap={{ scale: scale[1] }}
                    className={classNames(cls.Button, {}, [className, cls[theme], cls[size]])}
                    onClick={onClick}
                >
                    {children}
                </motion.button>
            );
        default:
            return (
                <motion.button
                    type={type}
                    style={style}
                    whileHover={{ scale: scale[0] }}
                    whileTap={{ scale: scale[1] }}
                    className={classNames(cls.Button, {}, [className, cls[theme], cls[size]])}
                    onClick={onClick}
                >
                    {children}
                </motion.button>
            );
    }
});
