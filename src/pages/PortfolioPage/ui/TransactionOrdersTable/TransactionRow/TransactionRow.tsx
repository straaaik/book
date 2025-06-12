import { useState } from 'react';
import { motion } from 'motion/react';
import cls from './TransactionRow.module.scss';
import { Order } from '@/entities/Portfolio';
import { ModalAboutTransaction } from '../ModalAboutTransaction/ModalAboutTransaction';
import { Columns } from '../TransactionOrdersTable/TransactionOrdersTable';
import { CellsTransactionsInfo } from '../TransactionOrdersTable/ui/TransactionRow/ui/CellsTransactionsInfo/CellsTransactionsInfo';
import { CellTransactionActions } from '../TransactionOrdersTable/ui/TransactionRow/ui/CellTransactionActions/CellTransactionActions';

interface InfoProps {
    className?: string;
    info: Order;
    show: Columns;
}

export const TransactionRow = ({ info, show }: InfoProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.tr role="button" className={cls.row} whileHover={{ backgroundColor: 'var(--bg-secondary-color)' }} onClick={() => setIsOpen(true)}>
                <CellsTransactionsInfo show={show} info={info} />
                <CellTransactionActions />
            </motion.tr>
            <ModalAboutTransaction symbol={info.symbol} info={info} isOpen={isOpen} onClose={setIsOpen} />
        </>
    );
};
