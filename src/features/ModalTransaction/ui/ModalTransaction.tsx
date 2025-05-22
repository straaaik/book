'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './ModalTransaction.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useState } from 'react';
import { SelectCoin } from './SelectCoin/SelectCoin';
import { FormAddTransaction } from './FormAddTransaction/FormAddTransaction';

export interface ChooseCoin {
    name?: string;
    symbol?: string;
    image?: string;
    current_price?: string | number;
    id?: string;
}

interface ModalTransactionProps {
    className?: string;
    onClose: () => void;
    isOpen: boolean;
    coin?: ChooseCoin;
    active: string;
}

export const ModalTransaction = ({ className, onClose, isOpen, coin, active }: ModalTransactionProps) => {
    const [chooseCoin, setChooseCoin] = useState<ChooseCoin | null>(coin ? coin : null);

    return (
        <Modal
            header={!chooseCoin ? 'Select coin' : 'Add transaction'}
            onClose={onClose}
            isOpen={isOpen}
            className={classNames(cls.ModalTransaction, { [cls.overflow]: !Boolean(chooseCoin) }, [className])}
        >
            <div className={cls.content}>
                {!chooseCoin ? (
                    <SelectCoin className={cls.SelectCoin} setChooseCoin={setChooseCoin} />
                ) : (
                    <FormAddTransaction active={active} chooseCoin={chooseCoin} setChooseCoin={setChooseCoin} className={cls.AddTransaction} />
                )}
            </div>
        </Modal>
    );
};
