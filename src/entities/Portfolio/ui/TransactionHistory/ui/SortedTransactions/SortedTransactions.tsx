'use client';

import { useAppSelector } from '@/shared/hooks/hooks';
import cls from './SortedTransactions.module.scss';
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import { Select } from '@/shared/ui/Select/Select';
import { getActive } from '../../../../model/selectors/getActive';
import { getAllCoins } from '../../../../model/selectors/getAllCoins';
import { useSortingHistory } from '../../../../module/hooks/useSortingHistory';
import { Transaction } from '../../../../types/transactionsType';

interface SortedTransactionsProps {
    className?: string;
    setSortedOrders?: Dispatch<SetStateAction<Transaction[]>>;
}

export const SortedTransactions = memo(({ setSortedOrders }: SortedTransactionsProps) => {
    const active = useAppSelector(getActive);
    const coins = useAppSelector((state) => getAllCoins(state, active));
    const [sortByCoin, setSortByCoin] = useState('All');
    const [sortByType, setSortByType] = useState('All');
    const sortedHistory = useSortingHistory(sortByCoin, sortByType);

    useEffect(() => {
        if (sortedHistory) setSortedOrders?.(sortedHistory);
    }, [sortedHistory, setSortedOrders]);

    return (
        <div className={cls.SortedTransactions}>
            <Select
                className={cls.selectSortedByOptions}
                selectedValue={sortByType}
                onChange={(value) => setSortByType(value.value)}
                options={[
                    { description: 'All type', value: 'All' },
                    { description: 'Buy', value: 'buy' },
                    { description: 'Sell', value: 'sell' },
                ]}
            />
            <Select
                className={cls.selectSortedByCoin}
                onChange={(value) => setSortByCoin(value.value)}
                selectedValue={sortByCoin}
                options={[{ description: 'All coins', value: 'All' }, ...coins.map((coin) => ({ value: coin.name, description: coin.name }))]}
            />
        </div>
    );
});
