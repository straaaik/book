import { classNames } from '../../lib/ClassNames/ClassNames';
import cls from './TextArea.module.scss';
import { motion } from 'motion/react';
import { memo } from 'react';

interface TextAreaProps {
    className?: string;
    value: string;
    onChange: () => void;
    description?: string;
}

export const TextArea = memo(({ className, value, onChange, description }: TextAreaProps) => {
    const maxLength = 50;
    const charactersRemaining = maxLength - value.length;

    return (
        <div className={cls.wrapper}>
            <span className={cls.description}>{description}</span>
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
        </div>
    );
});
