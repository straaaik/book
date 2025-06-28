import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinHistory.module.scss';
import { portfolioPageActions } from '@/pages/PortfolioPage/model/slice/portfolioPageSlice';
import { OVERVIEW } from '@/shared/constant/constant';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/hooks';
import { useLazyState } from '@/shared/hooks/useLazyState';
import { Button } from '@/shared/ui/Button/Button';
import { memo } from 'react';
import { IoChevronBackCircle } from 'react-icons/io5';
import { useGetTransactionForCoinQuery } from '../../model/endpoints/getTransactions';
import { getActive } from '../../model/selectors/getActive';
import { TransactionOrdersTable } from '../TransactionOrdersTable/ui/TransactionOrdersTable/TransactionOrdersTable';
import { Header } from './ui/Header/Header';
import { CoinDescription } from '../../types/types';

interface CoinHistoryProps {
    className?: string;
    coinInfo: CoinDescription;
}

export const CoinHistory = memo(({ className, coinInfo }: CoinHistoryProps) => {
    const activePortfolio = useAppSelector(getActive);
    const dispatch = useAppDispatch();
    const { data: coin, isLoading } = useGetTransactionForCoinQuery(coinInfo.id);
    const [sortedOrders, setSortedOrders] = useLazyState(coin || []);

    if (isLoading || !sortedOrders) {
        return (
            <div className={classNames(cls.CoinHistory, {}, [className])}>
                <Button className={cls.btnBack} onClick={() => dispatch(portfolioPageActions.changeSelectedCoin())}>
                    <IoChevronBackCircle />
                </Button>
                <Header isLoading={true} />
                <TransactionOrdersTable isLoading={true} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.CoinHistory, {}, [className])}>
            <Button className={cls.btnBack} onClick={() => dispatch(portfolioPageActions.changeSelectedCoin())}>
                <IoChevronBackCircle />
            </Button>
            <Header isLoading={isLoading} image={coinInfo.image} name={coinInfo.name} symbol={coinInfo.symbol} />
            <TransactionOrdersTable
                isLoading={isLoading}
                show={activePortfolio == OVERVIEW ? 'more' : 'mini'}
                onSorted={setSortedOrders}
                orders={sortedOrders}
            />
        </div>
    );
});
