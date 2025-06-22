import { useState } from 'react';
import { CellTransactionActions } from './ui/CellTransactionActions/CellTransactionActions';
import { CellsTransactionsInfo } from './ui/CellsTransactionsInfo/CellsTransactionsInfo';
import { motion } from 'motion/react';
import cls from './TransactionRow.module.scss';
import { Columns } from '../../TransactionOrdersTable';
import { ModalAboutTransaction } from '../../../ModalAboutTransaction/ModalAboutTransaction';
import { ModalChangeTransaction } from '../../../ModalChangeTransaction/ModalChangeTransaction';
import { Order } from '../../../../../../model/selectors/getHistory';

interface InfoProps {
    className?: string;
    info: Order;
    show: Columns;
}

export const TransactionRow = ({ info, show }: InfoProps) => {
    const [isOpenAbout, setIsOpenAbout] = useState(false);
    const [isOpenChange, setIsOpenChange] = useState(false);

    return (
        <>
            <motion.tr role="button" className={cls.row} whileHover={{ backgroundColor: 'var(--bg-secondary-color)' }} onClick={() => setIsOpenAbout(true)}>
                <CellsTransactionsInfo show={show} info={info} />
                <CellTransactionActions openChangeModal={setIsOpenChange} info={info} />
            </motion.tr>
            <ModalAboutTransaction symbol={info.symbol} info={info} openChangeModal={setIsOpenChange} isOpen={isOpenAbout} onClose={setIsOpenAbout} />
            <ModalChangeTransaction info={info} symbol={info.symbol} isOpen={isOpenChange} onClose={setIsOpenChange} />
        </>
    );
};
