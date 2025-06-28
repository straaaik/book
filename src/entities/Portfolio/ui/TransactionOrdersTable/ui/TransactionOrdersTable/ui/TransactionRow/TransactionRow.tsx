import { useState } from 'react';
import { CellTransactionActions } from './ui/CellTransactionActions/CellTransactionActions';
import { CellsTransactionsInfo } from './ui/CellsTransactionsInfo/CellsTransactionsInfo';
import { motion } from 'motion/react';
import cls from './TransactionRow.module.scss';
import { Columns } from '../../TransactionOrdersTable';
import { ModalAboutTransaction } from '../../../ModalAboutTransaction/ModalAboutTransaction';
import { ModalChangeTransaction } from '../../../ModalChangeTransaction/ModalChangeTransaction';
import { Transaction } from '../../../../../../types/transactionsType';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface InfoProps {
    className?: string;
    info: Transaction;
    show: Columns;
    isLoading?: boolean;
}

export const TransactionRow = ({ info, show, isLoading }: InfoProps) => {
    const [isOpenAbout, setIsOpenAbout] = useState(false);
    const [isOpenChange, setIsOpenChange] = useState(false);

    if (isLoading) {
        return (
            <tr>
                <td>
                    <Skeleton width={100} />
                </td>

                <td>
                    <div className={cls.date}>
                        <Skeleton width={100} height={30} />
                        <Skeleton width={100} height={10} />
                    </div>
                </td>

                <td>
                    <div className={cls.amount}>
                        <Skeleton width={100} height={30} />
                        <Skeleton width={100} height={10} />
                    </div>
                </td>
                <td>
                    <Skeleton width={100} />
                </td>
                <td>
                    <Skeleton width={100} />
                </td>
                <td>
                    <Skeleton width={100} />
                </td>
                <td>
                    <Skeleton />
                </td>
            </tr>
        );
    }

    return (
        <>
            <motion.tr role="button" className={cls.row} whileHover={{ backgroundColor: 'var(--bg-secondary-color)' }} onClick={() => setIsOpenAbout(true)}>
                <CellsTransactionsInfo show={show} info={info} />
                <CellTransactionActions info={info} openChangeModal={setIsOpenChange} />
            </motion.tr>
            <ModalAboutTransaction info={info} openChangeModal={setIsOpenChange} isOpen={isOpenAbout} onClose={setIsOpenAbout} />
            <ModalChangeTransaction info={info} isOpen={isOpenChange} onClose={setIsOpenChange} />
        </>
    );
};
