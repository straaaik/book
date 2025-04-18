'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './NewTransaction.module.scss';
import { Button } from '@/shared/ui/button/Button';
import { useState } from 'react';
import { ModalTransaction } from './ui/ModalTransaction/ModalTransaction';

interface NewTransactionProps {
    className?: string;
}

export const NewTransaction = ({ className }: NewTransactionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClickButton = () => {
        setIsOpen(true);
    };

    return (
        <div className={classNames(cls.NewTransaction, {}, [className])}>
            <Button onClick={onClickButton}>Add Transaction</Button>
            <ModalTransaction isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};
