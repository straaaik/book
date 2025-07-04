import { Dispatch, SetStateAction } from 'react';
import { Columns } from '../../TransactionOrdersTable';
import { Transaction } from '../../../../../../types/transactionsType';
import { ParamsType, Sorted } from '../../../../../../../../shared/ui/Table/ui/Sorted';

interface TransactionSortedProps {
    show: Columns;
    setSortingData?: Dispatch<SetStateAction<Transaction[]>>;
}

export const TransactionSorted = ({ show, setSortingData }: TransactionSortedProps) => {
    const filterParams = (key: ParamsType<Transaction>) => {
        const sortKey = key.sortKey;

        return show[sortKey] == true ? true : false;
    };

    const params: ParamsType<Transaction>[] = [
        { sortKey: 'type', text: 'Type' },
        { sortKey: 'coin', text: 'Name' },
        { sortKey: 'portfolioId', text: 'Portfolio' },
        { sortKey: 'date', text: 'Date' },
        { sortKey: 'amount', text: 'Amount' },
        { sortKey: 'price', text: 'Price' },
        { sortKey: 'fee', text: 'Fee' },
        { sortKey: 'notes', text: 'Notes' },
    ];

    return <Sorted<Transaction> setSortingData={setSortingData} params={params.filter(filterParams)} />;
};
