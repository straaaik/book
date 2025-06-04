import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './TransactionContent.module.scss';
import { HistoryOrdersTable } from '../HistoryOrdersTable/HistoryOrdersTable';
import { useAppSelector } from '@/app/config/store/hooks';
import { getHistory } from '@/entities/Portfolio/model/selectors/getHistory';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';

interface TransactionContentProps {
    className?: string;
}

export const TransactionContent = ({ className }: TransactionContentProps) => {
    const orders = useAppSelector(getHistory());

    if (!orders) return <LoadingSpinner />;

    return (
        <div className={classNames(cls.TransactionContent, {}, [className])}>
            <HistoryOrdersTable maxInfo orders={orders} />
        </div>
    );
};
