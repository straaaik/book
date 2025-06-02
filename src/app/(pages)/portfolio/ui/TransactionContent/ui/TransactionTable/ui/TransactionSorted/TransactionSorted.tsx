import { Sorted } from '@/features/Sorted/Sorted';
import { Order } from '../../../../module/getAllOrders';

export const TransactionSorted = () => {
    return (
        <Sorted<Order>
            params={[
                { sortKey: 'type', text: 'Type' },
                { sortKey: 'name', text: 'Coin' },

                { sortKey: 'date', text: 'Date' },
                { sortKey: 'portfolio_name', text: 'Portfolio' },
                { sortKey: 'amount', text: 'Amount' },
                { sortKey: 'price', text: 'Price' },
                { sortKey: 'fee', text: 'Fee' },
                { sortKey: 'notes', text: 'Notes' },
            ]}
            // sortedFunction={(payload) => sortingCoins(payload)}
        />
    );
};
