import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './TransactionContent.module.scss';
import { useAppSelector } from '@/app/config/store/hooks';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';
import { getHistory } from '@/entities/Portfolio/model/selectors/getHistory';
import { useLazyState } from '@/shared/hooks/useLazyState';
import { SortedTransactions } from './ui/SortedTransactions/SortedTransactions';
import { TransactionOrdersTable } from '../TransactionOrdersTable/TransactionOrdersTable/TransactionOrdersTable';

interface TransactionContentProps {
    className?: string;
}

export const TransactionContent = ({ className }: TransactionContentProps) => {
    const orders = useAppSelector(getHistory);
    const [sortedOrders, setSortedOrders] = useLazyState(orders || []);

    //TODO обработать ошибку
    if (!orders) return <LoadingSpinner />;

    return (
        <div className={classNames(cls.TransactionContent, {}, [className])}>
            <SortedTransactions setSortedOrders={setSortedOrders} />
            <TransactionOrdersTable onSorted={setSortedOrders} show="max" orders={sortedOrders} />
        </div>
    );
};
