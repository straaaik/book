import cls from './ButtonSelect.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { motion } from 'motion/react';
import { animateVariants } from '@/shared/ui/animation/variants';
import { Options } from '../../Select';

interface ButtonSelectProps {
    onClick: () => void;
    text?: Options;
    error?: string;
}

export const ButtonSelect = ({ onClick, text, error }: ButtonSelectProps) => {
    return (
        <motion.button
            variants={animateVariants}
            animate={error && 'error'}
            type="button"
            whileHover={{ border: '1px dotted var(--warn-color)' }}
            className={cls.ButtonSelect}
            onClick={onClick}
        >
            <div className={cls.text}>{text?.description}</div>
            <div className={cls.icon}>
                <IoIosArrowDown />
            </div>
        </motion.button>
    );
};
