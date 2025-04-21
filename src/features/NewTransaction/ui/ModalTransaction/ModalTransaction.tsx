import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './ModalTransaction.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { CoinsListWithMarketData } from '@/entities/Coin';
import { useState } from 'react';
import { AddTransaction } from '../AddTransaction/AddTransaction';
import { SelectCoin } from '../SelectCoin/SelectCoin';

export interface ChooseCoin {
    name: string;
    symbol: string;
    image: string;
    current_price: string | number;
}

interface ModalTransactionProps {
    className?: string;
    onClose: () => void;
    isOpen: boolean;
    data?: CoinsListWithMarketData[];
}

export const ModalTransaction = ({ className, onClose, isOpen, data }: ModalTransactionProps) => {
    const [chooseCoin, setChooseCoin] = useState<ChooseCoin | null>(null);

    return (
        <Modal
            header={!chooseCoin ? 'Select coin' : 'Add transaction'}
            onClose={onClose}
            isOpen={isOpen}
            className={classNames(cls.ModalTransaction, { [cls.overflow]: !Boolean(chooseCoin) }, [className])}
        >
            <div className={cls.content}>
                {!chooseCoin ? (
                    <SelectCoin className={cls.SelectCoin} data={data} setChooseCoin={setChooseCoin} />
                ) : (
                    <AddTransaction chooseCoin={chooseCoin} setChooseCoin={setChooseCoin} className={cls.AddTransaction} />
                )}
            </div>
        </Modal>
    );
};
