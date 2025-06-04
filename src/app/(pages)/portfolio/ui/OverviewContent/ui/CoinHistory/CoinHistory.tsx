import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinHistory.module.scss';
import { memo } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { IoChevronBackCircle } from 'react-icons/io5';
import { Header } from './ui/Header/Header';
import { useAppSelector } from '@/app/config/store/hooks';
import { HistoryOrdersTable } from '../../../HistoryOrdersTable/HistoryOrdersTable';
import { getHistory } from '@/entities/Portfolio/model/selectors/getHistory';

interface CoinHistoryProps {
    className?: string;
    coinId: string;
    setSelectCoin: (arg: null) => void;
}

export const CoinHistory = memo(({ className, coinId, setSelectCoin }: CoinHistoryProps) => {
    const orders = useAppSelector(getHistory(coinId));

    //TODO Добавить страницу ошибки!
    if (!orders) return <div>There is no such coin in this portfolio.</div>;

    const coin = orders?.[0];

    return (
        <div className={classNames(cls.CoinHistory, {}, [className])}>
            <Button className={cls.btnBack} onClick={() => setSelectCoin(null)}>
                <IoChevronBackCircle />
            </Button>
            <Header image={coin.image} name={coin.name} portfolioName={coin.portfolio_name} symbol={coin.symbol} />
            <HistoryOrdersTable orders={orders} />
        </div>
    );
});
