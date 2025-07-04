import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinHistory.module.scss';
import { useLazyState } from '@/shared/hooks/useLazyState';
import { Button } from '@/shared/ui/Button/Button';
import { memo } from 'react';
import { IoChevronBackCircle } from 'react-icons/io5';
import { useGetTransactionForCoinQuery } from '../../model/endpoints/getTransactions';
import { TransactionOrdersTable } from '../TransactionOrdersTable/ui/TransactionOrdersTable/TransactionOrdersTable';
import { Header } from './ui/Header/Header';
import { CoinDescription } from '../../types/types';

interface CoinHistoryProps {
    className?: string;
    coinInfo: CoinDescription;
    onClick?: () => void;
}

export const CoinHistory = memo(({ className, coinInfo, onClick }: CoinHistoryProps) => {
    const { data: coin, isLoading } = useGetTransactionForCoinQuery(coinInfo.id);
    const [sortedOrders, setSortedOrders] = useLazyState(coin || []);

    if (isLoading || !sortedOrders) {
        return (
            <div className={classNames(cls.CoinHistory, {}, [className])}>
                <Button className={cls.btnBack} onClick={() => onClick?.()}>
                    <IoChevronBackCircle />
                </Button>
                <Header isLoading={true} />
                <TransactionOrdersTable isLoading={true} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.CoinHistory, {}, [className])}>
            <Button className={cls.btnBack} onClick={() => onClick?.()}>
                <IoChevronBackCircle />
            </Button>
            <TransactionOrdersTable
                title={<Header isLoading={isLoading} image={coinInfo.image} name={coinInfo.name} symbol={coinInfo.symbol} />}
                isLoading={isLoading}
                show="mini"
                onSorted={setSortedOrders}
                orders={sortedOrders}
            />
        </div>
    );
});
