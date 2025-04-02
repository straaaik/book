import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './ModalButton.module.scss';
import { ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../../button/Button';
import { div } from 'motion/react-client';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    text?: string;
}

export const ModalButton = (props: ModalProps) => {
    const { className, children, text } = props;
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div>
            <Button onClick={() => setIsVisible(true)}>{text}</Button>
            <AnimatePresence initial={false}>
                {isVisible ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className={classNames(cls.Modal, {}, [className])}
                        onClick={() => setIsVisible(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className={cls.content}
                            onClick={onContentClick}
                        >
                            {children}
                            <Button className={cls.closeBtn} onClick={() => setIsVisible(false)}>
                                X
                            </Button>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};
