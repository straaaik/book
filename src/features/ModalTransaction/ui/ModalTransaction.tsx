'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './ModalTransaction.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useState } from 'react';
import { SearchCoins } from './SearchCoins/SearchCoins';
import { FormAddTransaction } from './FormAddTransaction/FormAddTransaction';
import { CoinsListWithMarketData } from '@/entities/Coin';
import { AnimatePresence, motion } from 'motion/react';

interface ModalTransactionProps {
    className?: string;
    onClose: () => void;
    isOpen: boolean;
    active?: string;
}

export const ModalTransaction = ({ className, onClose, isOpen, active }: ModalTransactionProps) => {
    const [chooseCoin, setChooseCoin] = useState<CoinsListWithMarketData | null>(null);
    const pageVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <Modal
            header={!chooseCoin ? 'Select coin' : 'Add transaction'}
            onClose={onClose}
            isOpen={isOpen}
            className={classNames(cls.ModalTransaction, {}, [className])}
        >
            <AnimatePresence mode="wait">
                {!chooseCoin ? (
                    <motion.div
                        className={cls.content}
                        key="coins"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <SearchCoins setChooseCoin={setChooseCoin} />
                    </motion.div>
                ) : (
                    <motion.div
                        className={cls.content}
                        key="coinInfo"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <FormAddTransaction active={active} chooseCoin={chooseCoin} setChooseCoin={setChooseCoin} />
                    </motion.div>
                )}
            </AnimatePresence>
        </Modal>
    );
};
