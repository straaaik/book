import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './TextArea.module.scss';
import { motion } from 'motion/react';

interface TextAreaProps {
    className?: string;
    value: string;
    onChange: () => void;
}

export const TextArea = ({ className, value, onChange }: TextAreaProps) => {
    const maxLength = 50;
    const charactersRemaining = maxLength - value.length;

    return (
        <>
            <motion.textarea
                whileFocus={{ border: '1px solid var(--warn-color)' }}
                value={value}
                onChange={onChange}
                className={classNames(cls.TextArea, {}, [className])}
                maxLength={maxLength}
            >
                {value}
            </motion.textarea>
            <span className={cls.charactersRemaining}>{charactersRemaining}</span>
        </>
    );
};
