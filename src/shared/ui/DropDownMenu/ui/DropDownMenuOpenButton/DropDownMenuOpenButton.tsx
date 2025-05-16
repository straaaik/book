import { motion } from 'motion/react';
import cls from './DropDownMenuOpenButton.module.scss';
import { CgMoreVertical } from 'react-icons/cg';

interface DropDownMenuOpenButtonProps {
    className?: string;
    onOpen: () => void;
    isOpen: boolean;
}

export const DropDownMenuOpenButton = ({ onOpen, isOpen }: DropDownMenuOpenButtonProps) => {
    return (
        <motion.div
            //TODO Поменять VAR в motion для анимации
            whileHover={{ backgroundColor: 'var(--warn-color)', boxShadow: 'inset 0 0 0 2px var(--bg-secondary-color)' }}
            animate={{ backgroundColor: isOpen ? 'var(--warn-color)' : 'rgba(0, 0, 0, 0)' }}
            className={cls.btnOpen}
            onClick={onOpen}
        >
            <CgMoreVertical />
        </motion.div>
    );
};
