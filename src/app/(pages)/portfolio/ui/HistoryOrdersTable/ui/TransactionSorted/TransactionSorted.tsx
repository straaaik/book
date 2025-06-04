import { OrderInfo } from '@/entities/Portfolio';
import { ParamsType, Sorted } from '@/features/Sorted/Sorted';

export const TransactionSorted = ({ maxInfo = false }: { maxInfo?: boolean }) => {
    const filterParams = (key: ParamsType<OrderInfo[number]>) => {
        const maxParams = ['name', 'portfolio_name'];
        return !maxParams.includes(key.sortKey);
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

    return (
        <Sorted<OrderInfo[number]>
            params={maxInfo ? params : params.filter(filterParams)}
            // sortedFunction={(payload) => sortingCoins(payload)}
        />
    );
};
