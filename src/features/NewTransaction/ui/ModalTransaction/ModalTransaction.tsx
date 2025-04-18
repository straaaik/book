import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './ModalTransaction.module.scss';
import { Modal } from '@/shared/ui/animation/modal/Modal';
import { coinApi } from '@/entities/Coin';
import { useState } from 'react';
import { AddTransaction } from '../AddTransaction/AddTransaction';
import { SelectCoin } from '../SelectCoin/SelectCoin';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';

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
}

export const ModalTransaction = ({ className, onClose, isOpen }: ModalTransactionProps) => {
    const [chooseCoin, setChooseCoin] = useState<ChooseCoin | null>(null);
    const { data, error, isLoading } = coinApi.useGetCoinListWithMarketQuery({});

    if (error) throw new Error();

    return (
        <Modal onClose={onClose} isOpen={isOpen} className={classNames(cls.ModalTransaction, {}, [className])}>
            <div className={cls.content}>
                {isLoading ? (
                    <LoadingSpinner />
                ) : !chooseCoin ? (
                    <SelectCoin className={cls.SelectCoin} data={data} setChooseCoin={setChooseCoin} />
                ) : (
                    <AddTransaction chooseCoin={chooseCoin} setChooseCoin={setChooseCoin} className={cls.AddTransaction} />
                )}
            </div>
        </Modal>
    );
};
