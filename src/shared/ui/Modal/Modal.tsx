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
                    <motion.div className={cls.Modal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className={cls.overlay}>
                            <motion.div
                                key="modal"
                                initial={{ rotateY: 20, rotateX: 10 }}
                                animate={{ rotateY: 0, rotateX: 0 }}
                                exit={{ rotateY: 20, rotateX: 10 }}
                                ref={ref}
                                className={cls.content}
                            >
                                <motion.div className={cls.header}>
                                    <span>{header}</span>
                                    <Button theme={ButtonTheme.CLEAR} className={cls.closeBtn} onClick={onHandlerClose}>
                                        <AiOutlineCloseCircle />
                                    </Button>
                                </motion.div>
                                <div className={classNames(cls.main, {}, [className])}>{children}</div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal>
    );
};
