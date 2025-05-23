import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Modal.module.scss';
import { ReactNode, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Button, ButtonTheme } from '../Button/Button';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Portal } from '../Portal/Portal';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';

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
    const ref = useRef(null);
    useOutsideClick(ref, onClose);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const onHandlerClose = () => {
        onClose();
    };

    return (
        <Portal>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div key="modal" className={cls.Modal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className={cls.overlay}>
                            <div ref={ref} className={cls.content}>
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
                )}
            </AnimatePresence>
        </Portal>
    );
};
