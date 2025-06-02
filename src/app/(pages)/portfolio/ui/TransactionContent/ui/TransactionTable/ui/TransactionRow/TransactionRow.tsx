import { useId, useState } from 'react';
import { Order } from '../../../../module/getAllOrders';
import { CellTransactionActions } from './ui/CellTransactionActions/CellTransactionActions';
import { CellsTransactionsInfo } from './ui/CellsTransactionsInfo/CellsTransactionsInfo';
import { motion } from 'motion/react';
import cls from './TransactionRow.module.scss';

interface InfoProps {
    className?: string;
    info: Order;
}

export const TransactionRow = ({ info }: InfoProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const id = useId();

    return (
        <motion.tr role="button" className={cls.row} whileHover={{ backgroundColor: 'var(--bg-secondary-color)' }} onClick={() => setIsOpen(true)} key={id}>
            <CellsTransactionsInfo isOpen={isOpen} onClose={setIsOpen} info={info} />
            <CellTransactionActions />
        </motion.tr>
    );
};
