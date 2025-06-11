import { useState } from 'react';
import { CellTransactionActions } from './ui/CellTransactionActions/CellTransactionActions';
import { CellsTransactionsInfo } from './ui/CellsTransactionsInfo/CellsTransactionsInfo';
import { motion } from 'motion/react';
import cls from './TransactionRow.module.scss';
import { Order } from '@/entities/Portfolio';
import { Columns } from '../../TransactionOrdersTable';
import { ModalAboutTransaction } from '../../../ModalAboutTransaction/ModalAboutTransaction';

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
