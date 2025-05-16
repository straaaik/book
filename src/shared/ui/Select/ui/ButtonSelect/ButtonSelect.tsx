import cls from './ButtonSelect.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { motion } from 'motion/react';

interface ButtonSelectProps {
    onClick: () => void;
    text: string;
}

export const ButtonSelect = ({ onClick, text }: ButtonSelectProps) => {
    return (
        <motion.button whileHover={{ border: '1px dotted var(--warn-color)' }} className={cls.ButtonSelect} onClick={onClick}>
            <div className={cls.text}>{text}</div>
            <div className={cls.icon}>
                <IoIosArrowDown />
            </div>
        </motion.button>
    );
};
