import { useState } from 'react';
import { CellTransactionActions } from './ui/CellTransactionActions/CellTransactionActions';
import { CellsTransactionsInfo } from './ui/CellsTransactionsInfo/CellsTransactionsInfo';
import { motion } from 'motion/react';
import cls from './TransactionRow.module.scss';
import { OrderInfo } from '@/entities/Portfolio';
import { ModalAboutTransaction } from '../ModalAboutTransaction/ModalAboutTransaction';

interface InfoProps {
    className?: string;
    info: OrderInfo[number];
    maxInfo?: boolean;
}

export const TransactionRow = ({ info, maxInfo }: InfoProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.tr role="button" className={cls.row} whileHover={{ backgroundColor: 'var(--bg-secondary-color)' }} onClick={() => setIsOpen(true)}>
                <CellsTransactionsInfo maxInfo={maxInfo} info={info} />
                <CellTransactionActions />
            </motion.tr>
            <ModalAboutTransaction symbol={info.symbol} info={info} isOpen={isOpen} onClose={setIsOpen} />
        </>
    );
};
