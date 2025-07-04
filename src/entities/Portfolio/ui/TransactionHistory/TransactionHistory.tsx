import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './TransactionHistory.module.scss';
import { useLazyState } from '@/shared/hooks/useLazyState';
import { TransactionOrdersTable } from '../TransactionOrdersTable/ui/TransactionOrdersTable/TransactionOrdersTable';
import { useAppSelector } from '@/shared/hooks/hooks';
import { getActive } from '../../model/selectors/getActive';
import { OVERVIEW } from '@/shared/constant/constant';
import { useGetTransactionByPortfolioWithCoinQuery } from '../../model/endpoints/getTransactions';
import { Header } from './ui/Header/Header';

interface TransactionHistoryProps {
    className?: string;
}

export const TransactionHistory = ({ className }: TransactionHistoryProps) => {
    const activePortfolio = useAppSelector(getActive);
    const { data: orders, isFetching } = useGetTransactionByPortfolioWithCoinQuery(activePortfolio);
    const [sortedOrders, setSortedOrders] = useLazyState(orders);

    if (!sortedOrders.length || isFetching)
        return (
            <div className={classNames(cls.TransactionHistory, {}, [className])}>
                <TransactionOrdersTable title={<Header setSortedOrders={setSortedOrders} />} isLoading={true} show="max" />
            </div>
        );

    return (
        <div className={classNames(cls.TransactionHistory, {}, [className])}>
            <TransactionOrdersTable
                title={<Header setSortedOrders={setSortedOrders} />}
                onSorted={setSortedOrders}
                show={activePortfolio === OVERVIEW ? 'max' : 'more'}
                orders={sortedOrders}
            />
        </div>
    );
};
