import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Modal.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Button, ButtonTheme } from '../../button/Button';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface ModalProps {
    className?: string;
    classNameModal?: string;
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = (props: ModalProps) => {
    const { className, classNameModal, children, isOpen, onClose } = props;
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
                <motion.div
                    key="modal"
                    className={classNames(cls.Modal, {}, [classNameModal])}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onHandlerClose}
                >
                    <div className={cls.overlay}>
                        <div className={classNames(cls.content, {}, [className])} onClick={onContentClick}>
                            {children}
                            <Button theme={ButtonTheme.CLEAR} className={cls.closeBtn} onClick={onHandlerClose}>
                                <AiOutlineCloseCircle />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};
