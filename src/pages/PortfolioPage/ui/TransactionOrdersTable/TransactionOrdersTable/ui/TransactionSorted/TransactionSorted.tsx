import { Order, OrderInfo } from '@/entities/Portfolio';
import { Dispatch, SetStateAction } from 'react';
import { Columns } from '../../TransactionOrdersTable';
import { ParamsType, Sorted } from '@/features/Sorted';

interface TransactionSortedProps {
    show: Columns;
    setSortingData?: Dispatch<SetStateAction<Order[]>>;
}

export const TransactionSorted = ({ show, setSortingData }: TransactionSortedProps) => {
    const filterParams = (key: ParamsType<Order>) => {
        const sortKey = key.sortKey;

        return show[sortKey] == true ? true : false;
    };

    const params: ParamsType<OrderInfo[number]>[] = [
        { sortKey: 'type', text: 'Type' },
        { sortKey: 'name', text: 'Coin' },
        { sortKey: 'date', text: 'Date' },
        { sortKey: 'portfolio_name', text: 'Portfolio' },
        { sortKey: 'amount', text: 'Amount' },
        { sortKey: 'price', text: 'Price' },
        { sortKey: 'fee', text: 'Fee' },
        { sortKey: 'notes', text: 'Notes' },
    ];

    return <Sorted<OrderInfo[number]> setSortingData={setSortingData} params={params.filter(filterParams)} />;
};
