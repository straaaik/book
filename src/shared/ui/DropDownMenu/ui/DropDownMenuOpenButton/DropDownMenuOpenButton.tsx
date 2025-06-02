import { motion } from 'motion/react';
import cls from './DropDownMenuOpenButton.module.scss';
import { CgMoreVertical } from 'react-icons/cg';
import { memo } from 'react';

interface DropDownMenuOpenButtonProps {
    className?: string;
    onOpen: () => void;
    isOpen: boolean;
}

export const DropDownMenuOpenButton = memo(({ onOpen, isOpen }: DropDownMenuOpenButtonProps) => {
    const onHandlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onOpen();
    };

    return (
        <motion.button
            //TODO Поменять VAR в motion для анимации
            whileHover={{ backgroundColor: 'var(--warn-color)', boxShadow: 'inset 0 0 0 2px var(--bg-secondary-color)' }}
            animate={{ backgroundColor: isOpen ? 'var(--warn-color)' : 'rgba(0, 0, 0, 0)' }}
            className={cls.btnOpen}
            onClick={(e) => onHandlerClick(e)}
        >
            <CgMoreVertical />
        </motion.button>
    );
});
