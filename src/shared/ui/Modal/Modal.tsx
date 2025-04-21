import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Modal.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Button, ButtonTheme } from '../Button/Button';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface ModalProps {
    className?: string;
    classNameModal?: string;
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    header: string;
}

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, header } = props;
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const onHandlerClose = () => {
        setIsVisible(false);
        onClose();
    };

    return (
        <AnimatePresence initial={false}>
            {isVisible ? (
                <motion.div key="modal" className={cls.Modal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onHandlerClose}>
                    <div className={cls.overlay}>
                        <div className={cls.content} onClick={onContentClick}>
                            <div className={cls.header}>
                                <span>{header}</span>
                                <Button theme={ButtonTheme.CLEAR} className={cls.closeBtn} onClick={onHandlerClose}>
                                    <AiOutlineCloseCircle />
                                </Button>
                            </div>
                            <div className={classNames(cls.main, {}, [className])}>{children}</div>
                        </div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};
