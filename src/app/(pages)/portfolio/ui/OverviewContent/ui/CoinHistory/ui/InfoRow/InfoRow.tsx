import cls from './InfoRow.module.scss';
import { Order } from '../../module/mergeOrders';
import { motion } from 'motion/react';
import { CellHistoryActions } from './ui/CellHistoryActions/CellHistoryActions';
import { CellsHistoryInfo } from './ui/CellsHistoryInfo/CellsHistoryInfo';
import { useState } from 'react';
import { ModalAboutTransaction } from './ui/ModalAboutTransaction/ModalAboutTransaction';

interface InfoProps {
    className?: string;
    info: Order;
    symbol?: string;
}

export const InfoRow = ({ info, symbol }: InfoProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.tr role="button" className={cls.row} whileHover={{ backgroundColor: 'var(--bg-secondary-color)' }} onClick={() => setIsOpen(true)}>
                <CellsHistoryInfo info={info} symbol={symbol} />
                <CellHistoryActions />
            </motion.tr>
            <ModalAboutTransaction info={info} symbol={symbol} isOpen={isOpen} onClose={setIsOpen} />
        </>
    );
};
