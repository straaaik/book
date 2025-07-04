import cls from './Header.module.scss';
import { Dispatch, memo, SetStateAction } from 'react';
import { SortedTransactions } from '../SortedTransactions/SortedTransactions';
import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { Transaction } from '../../../../types/transactionsType';

interface HeaderProps {
    className?: string;
    setSortedOrders: Dispatch<SetStateAction<Transaction[]>>;
}

export const Header = memo(({ className, setSortedOrders }: HeaderProps) => {
    return (
        <div className={classNames(cls.Header, {}, [className])}>
            <div className={cls.selects}>
                <SortedTransactions setSortedOrders={setSortedOrders} />
            </div>
        </div>
    );
});
