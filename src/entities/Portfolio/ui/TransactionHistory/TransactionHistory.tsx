import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './TransactionHistory.module.scss';
import { useLazyState } from '@/shared/hooks/useLazyState';
import { TransactionOrdersTable } from '../TransactionOrdersTable/ui/TransactionOrdersTable/TransactionOrdersTable';
import { useAppSelector } from '@/shared/hooks/hooks';
import { getActive } from '../../model/selectors/getActive';
import { OVERVIEW } from '@/shared/constant/constant';
import { SortedTransactions } from './ui/SortedTransactions/SortedTransactions';
import { useGetTransactionByPortfolioWithCoinQuery } from '../../model/endpoints/getTransactions';

interface TransactionHistoryProps {
    className?: string;
}

export const TransactionHistory = ({ className }: TransactionHistoryProps) => {
    const activePortfolio = useAppSelector(getActive);
    const { data: orders, isFetching } = useGetTransactionByPortfolioWithCoinQuery(activePortfolio);
    const [sortedOrders, setSortedOrders] = useLazyState(orders || []);

    if (!sortedOrders || isFetching)
        return (
            <div className={classNames(cls.TransactionHistory, {}, [className])}>
                <SortedTransactions setSortedOrders={setSortedOrders} />
                <TransactionOrdersTable isLoading={true} show="max" />
            </div>
        );

    return (
        <div className={classNames(cls.TransactionHistory, {}, [className])}>
            <SortedTransactions setSortedOrders={setSortedOrders} />
            <TransactionOrdersTable onSorted={setSortedOrders} show={activePortfolio === OVERVIEW ? 'max' : 'more'} orders={sortedOrders} />
        </div>
    );
};
