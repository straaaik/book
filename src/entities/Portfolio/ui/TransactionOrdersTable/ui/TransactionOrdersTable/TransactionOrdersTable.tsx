'use client';

import { Table } from '@/shared/ui/Table/Table';
import { TransactionRow } from './ui/TransactionRow/TransactionRow';
import { TransactionSorted } from './ui/TransactionSorted/TransactionSorted';
import { Dispatch, SetStateAction } from 'react';
import { Transaction } from '../../../../types/transactionsType';
import cls from './TransactionOrdersTable.module.scss';

export type ShowType = 'max' | 'mini' | 'more';

export type Columns = Record<keyof Transaction, boolean>;
interface HistoryOrdersTableProps {
    orders?: Transaction[];
    show?: ShowType;
    onSorted?: Dispatch<SetStateAction<Transaction[]>>;
    isLoading?: boolean;
    title?: React.ReactNode;
}

export const TransactionOrdersTable = ({ orders, onSorted, isLoading, show, title }: HistoryOrdersTableProps) => {
    const renderColumns: Columns = {
        id: true,
        type: true,
        coin: true,
        coinId: true,
        date: true,
        amount: true,
        price: true,
        fee: true,
        notes: true,
        coinName: true,
        portfolioId: true,
    };

    if (show === 'mini') {
        renderColumns.coin = false;
        renderColumns.portfolioId = false;
    }
    if (show == 'more') {
        renderColumns.portfolioId = false;
    }

    return (
        <Table
            title={title}
            classNameContainer={cls.TransactionOrdersTable}
            head={<TransactionSorted setSortingData={onSorted} show={renderColumns} />}
            main={
                isLoading
                    ? new Array(5).fill(null).map((order, i) => <TransactionRow isLoading={true} show={renderColumns} key={i} info={order} />)
                    : orders?.map((order) => <TransactionRow show={renderColumns} key={order.id} info={order} />)
            }
        />
    );
};
