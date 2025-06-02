import { Sorted } from '@/features/Sorted/Sorted';
import { Order } from '../../module/mergeOrders';

export const SortedHistory = () => {
    return (
        <Sorted<Order>
            params={[
                { sortKey: 'type', text: 'Type' },
                { sortKey: 'date', text: 'Date' },
                { sortKey: 'amount', text: 'Amount' },
                { sortKey: 'price', text: 'Price' },
                { sortKey: 'fee', text: 'Fee' },
            ]}
            // sortedFunction={(payload) => sortingCoins(payload)}
        />
    );
};
