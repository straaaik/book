import { classNames, Mods } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Modal.module.scss';
import { ReactNode, useState } from 'react';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
    const { className, isOpen, onClose, children } = props;

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const closeHandler = () => {
        setIsClosing(false);
    };

    const [isClosing, setIsClosing] = useState<boolean>(false);

    const mods: Mods = { [cls.opened]: isOpen, [cls.closing]: isClosing };

    return (
        <div className={classNames(cls.Modal, mods, [className])}>
            <div className={cls.overlay} onClick={closeHandler}>
                <div className={cls.content} onClick={onContentClick}>
                    {children}
                </div>
            </div>
        </div>
    );
};
