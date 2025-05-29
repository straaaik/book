'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './ModalTransaction.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useState } from 'react';
import { SearchCoins } from './SearchCoins/SearchCoins';
import { FormAddTransaction } from './FormAddTransaction/FormAddTransaction';
import { CoinsListWithMarketData } from '@/entities/Coin';

interface ModalTransactionProps {
    className?: string;
    onClose: () => void;
    isOpen: boolean;
    active?: string;
}

export const ModalTransaction = ({ className, onClose, isOpen, active }: ModalTransactionProps) => {
    const [chooseCoin, setChooseCoin] = useState<CoinsListWithMarketData | null>(null);

    return (
        <Modal
            header={!chooseCoin ? 'Select coin' : 'Add transaction'}
            onClose={onClose}
            isOpen={isOpen}
            className={classNames(cls.ModalTransaction, {}, [className])}
        >
            {!chooseCoin ? (
                <SearchCoins className={cls.SelectCoin} setChooseCoin={setChooseCoin} />
            ) : (
                <FormAddTransaction active={active} chooseCoin={chooseCoin} setChooseCoin={setChooseCoin} className={cls.AddTransaction} />
            )}
        </Modal>
    );
};
