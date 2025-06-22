import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './TransactionContent.module.scss';
import { useAppSelector } from '@/shared/hooks/hooks';
import { useLazyState } from '@/shared/hooks/useLazyState';
import { SortedTransactions } from './ui/SortedTransactions/SortedTransactions';
import { getHistory, TransactionOrdersTable } from '@/entities/Portfolio';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner/LoadingSpinner';

interface TransactionContentProps {
    className?: string;
}

export const TransactionContent = ({ className }: TransactionContentProps) => {
    const orders = useAppSelector(getHistory);
    // const arr = [];
    // const or = orders?.slice(0, 20) || [];

    const [sortedOrders, setSortedOrders] = useLazyState();

    //TODO обработать ошибку
    if (!orders) return <LoadingSpinner />;

    return (
        <div className={classNames(cls.TransactionContent, {}, [className])}>
            <SortedTransactions setSortedOrders={setSortedOrders} />
            <TransactionOrdersTable onSorted={setSortedOrders} show="max" orders={sortedOrders} />
        </div>
    );
};
