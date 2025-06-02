import { Table } from '@/shared/ui/Table/Table';
import { TransactionSorted } from './ui/TransactionSorted/TransactionSorted';
import { getActivePortfolio } from '@/app/(pages)/portfolio/model/selectors/activePortfolio';
import { useAppSelector } from '@/app/config/store/hooks';
import { getAllOrders } from '../../module/getAllOrders';
import { TransactionRow } from './ui/TransactionRow/TransactionRow';

export const TransactionTable = () => {
    const portfolio = useAppSelector(getActivePortfolio);
    const orders = getAllOrders(portfolio);

    return (
        <Table
            head={<TransactionSorted />}
            main={orders.map((order) => (
                <TransactionRow key={order.id + order.date} info={order} />
            ))}
        />
    );
};
