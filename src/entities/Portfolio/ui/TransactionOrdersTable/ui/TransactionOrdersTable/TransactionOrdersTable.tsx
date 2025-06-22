'use client';

import { Table } from '@/shared/ui/Table/Table';
import { TransactionRow } from './ui/TransactionRow/TransactionRow';
import { TransactionSorted } from './ui/TransactionSorted/TransactionSorted';
import { Dispatch, SetStateAction } from 'react';
import { Order, OrderInfo } from '../../../../model/selectors/getHistory';

export type ShowType = 'max' | 'mini' | 'more';

export type Columns = Record<keyof Order, boolean>;
interface HistoryOrdersTableProps {
    orders: OrderInfo;
    show?: ShowType;
    onSorted: Dispatch<SetStateAction<Order[]>>;
}

export const TransactionOrdersTable = ({ orders, show, onSorted }: HistoryOrdersTableProps) => {
    const renderColumns: Columns = {
        id: true,
        type: true,
        name: true,
        date: true,
        portfolio_name: true,
        amount: true,
        price: true,
        fee: true,
        notes: true,
        symbol: true,
        id_coin: true,
        image: true,
    };

    switch (show) {
        case 'mini':
            renderColumns.portfolio_name = false;
            renderColumns.name = false;
            break;
        case 'more':
            renderColumns.name = false;
            break;
        default:
            break;
    }

    return (
        <Table
            head={<TransactionSorted setSortingData={onSorted} show={renderColumns} />}
            main={orders?.map((order) => (
                <TransactionRow show={renderColumns} key={order.id} info={order} />
            ))}
        />
    );
};
