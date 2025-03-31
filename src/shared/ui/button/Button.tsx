import React, { FC, ReactNode } from 'react';
import cls from './Button.module.scss';
import { classNames } from '@/shared/lib/ClassNames/ClassNames';

interface SearchProps {
    className?: string;
    onClick?: () => void;
    children?: ReactNode;
    theme?: string;
    size?: string;
}

export enum ButtonTheme {
    INVERTED = 'button_inverted',
    BACKGROUND = 'button_background',
    CLEAR = 'button_clear',
    DANGER = 'button_danger',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

export const Button: FC<SearchProps> = (props) => {
    const { className, onClick, children, theme = ButtonTheme.INVERTED, size = ButtonSize.M } = props;
    return (
        <button className={classNames(cls.Button, {}, [className, cls[theme], cls[size]])} onClick={onClick}>
            {children}
        </button>
    );
};
