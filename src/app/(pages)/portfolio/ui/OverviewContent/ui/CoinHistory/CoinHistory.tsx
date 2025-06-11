import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinHistory.module.scss';
import { memo } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { IoChevronBackCircle } from 'react-icons/io5';
import { Header } from './ui/Header/Header';
import { useAppSelector } from '@/app/config/store/hooks';
import { getHistory } from '@/entities/Portfolio/model/selectors/getHistory';
import { getActive } from '@/entities/Portfolio';
import { useLazyState } from '@/shared/hooks/useLazyState';
import { TransactionOrdersTable } from '../../../TransactionOrdersTable/TransactionOrdersTable/TransactionOrdersTable';

interface CoinHistoryProps {
    className?: string;
    coinId: string;
    setSelectCoin: (arg: null) => void;
}

export const CoinHistory = memo(({ className, coinId, setSelectCoin }: CoinHistoryProps) => {
    const orders = useAppSelector((state) => getHistory(state, coinId));
    const [sortedOrders, setSortedOrders] = useLazyState(orders || []);

    const activePortfolio = useAppSelector(getActive);

    //TODO Добавить страницу ошибки!
    if (!orders || !activePortfolio || !sortedOrders) return <div>There is no such coin in this portfolio.</div>;

    const coin = orders?.[0];

    return (
        <div className={classNames(cls.CoinHistory, {}, [className])}>
            <Button className={cls.btnBack} onClick={() => setSelectCoin(null)}>
                <IoChevronBackCircle />
            </Button>
            <Header image={coin.image} name={coin.name} symbol={coin.symbol} />
            <TransactionOrdersTable show={activePortfolio == 'Overview' ? 'more' : 'mini'} onSorted={setSortedOrders} orders={sortedOrders} />
        </div>
    );
});
