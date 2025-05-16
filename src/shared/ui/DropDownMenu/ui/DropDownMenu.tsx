'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './DropDownMenu.module.scss';
import { AnimatePresence, motion } from 'motion/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { DropDownMenuOpenButton } from './DropDownMenuOpenButton/DropDownMenuOpenButton';

interface ActionsProps {
    className?: string;
    children: ReactNode;
}

export const DropDownMenu = ({ className, children }: ActionsProps) => {
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShow]);

    return (
        <motion.div className={classNames(cls.Actions, {}, [className])}>
            <DropDownMenuOpenButton isOpen={show} onOpen={() => setShow(true)} />
            <AnimatePresence>
                {show && (
                    <motion.div
                        ref={ref}
                        className={cls.content}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 250 }}
                        exit={{ opacity: 0, width: 0 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
