'use client';

import { classNames } from '../../../lib/ClassNames/ClassNames';
import cls from './DropDownMenu.module.scss';
import { AnimatePresence, motion } from 'motion/react';
import { memo, ReactNode, useRef, useState } from 'react';
import { DropDownMenuOpenButton } from './DropDownMenuOpenButton/DropDownMenuOpenButton';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

interface ActionsProps {
    className?: string;
    children: ReactNode;
}

export const DropDownMenu = memo(({ className, children }: ActionsProps) => {
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, setShow);

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
});
