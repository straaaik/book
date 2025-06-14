import { Table } from '@/shared/ui/Table/Table';
import { TransactionRow } from './ui/TransactionRow/TransactionRow';
import { TransactionSorted } from './ui/TransactionSorted/TransactionSorted';
import { Order, OrderInfo } from '@/entities/Portfolio';
import { Dispatch, SetStateAction } from 'react';

export type ShowType = 'max' | 'mini' | 'more';

export type Columns = Record<keyof Order, boolean>;
interface HistoryOrdersTableProps {
    orders: OrderInfo;
    show?: ShowType;
    onSorted: Dispatch<SetStateAction<Order[]>>;
}

export const TransactionOrdersTable = ({ orders, show, onSorted }: HistoryOrdersTableProps) => {
    const renderColumns: Columns = {
        type: true,
        name: true,
        date: true,
        portfolio_name: true,
        amount: true,
        price: true,
        fee: true,
        notes: true,
        symbol: true,
        id: true,
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
                <TransactionRow show={renderColumns} key={order.date + order.name} info={order} />
            ))}
        />
    );
};
