import { useSortingHistory } from '@/app/(pages)/portfolio/hooks/useSortingHistory';
import cls from './SortedTransactions.module.scss';
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '@/app/config/store/hooks';
import { getAllCoins, Order } from '@/entities/Portfolio';
import { Select } from '@/shared/ui/Select/Select';

interface SortedTransactionsProps {
    className?: string;
    setSortedOrders?: Dispatch<SetStateAction<Order[]>>;
}

export const SortedTransactions = memo(({ setSortedOrders }: SortedTransactionsProps) => {
    const coins = useAppSelector(getAllCoins);
    const [sortByCoin, setSortByCoin] = useState('All');
    const [sortByType, setSortByType] = useState('All');
    const sortedHistory = useSortingHistory(sortByCoin, sortByType);

    useEffect(() => {
        setSortedOrders?.(sortedHistory);
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
