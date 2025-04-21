'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './NewTransaction.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { useState } from 'react';
import { ModalTransaction } from './ui/ModalTransaction/ModalTransaction';
import { coinApi } from '@/entities/Coin';

interface NewTransactionProps {
    className?: string;
}

export const NewTransaction = ({ className }: NewTransactionProps) => {
    const [trigger, { data }] = coinApi.useLazyGetCoinListWithMarketQuery();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClickButton = () => {
        trigger({}, true);
        setIsOpen(true);
    };

    return (
        <div className={classNames(cls.NewTransaction, {}, [className])}>
            <Button onClick={onClickButton}>Add Transaction</Button>
            <ModalTransaction data={data} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};
