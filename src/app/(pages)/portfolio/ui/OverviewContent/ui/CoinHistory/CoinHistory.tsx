import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinHistory.module.scss';
import { portfolioApi } from '@/entities/Portfolio';
import { memo } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { coinApi } from '@/entities/Coin';
import { IoChevronBackCircle } from 'react-icons/io5';
import { mergeOrders } from './module/mergeOrders';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';
import { Table } from '@/shared/ui/Table/Table';
import { InfoRow } from './ui/InfoRow/InfoRow';
import { SortedHistory } from './ui/SortedHistory/SortedHistory';
import { Header } from './ui/Header/Header';

interface CoinHistoryProps {
    className?: string;
    coin: string;
    setSelectCoin: (arg: null) => void;
}

export const CoinHistory = memo(({ className, coin, setSelectCoin }: CoinHistoryProps) => {
    // FIXME переписать на селект или нет??? ЕЩЕ ДУМАЮ (Reselect)
    const { data: selectCoin } = portfolioApi.useGetCoinForIdQuery(coin);
    const { data: serverCoin, isLoading } = coinApi.useGetCoinQuery(selectCoin?.serverId, {
        skip: !selectCoin?.serverId,
    });

    if (!selectCoin) return null;

    const history = mergeOrders(selectCoin);

    if (isLoading || !serverCoin) return <LoadingSpinner />;

    return (
        <div className={classNames(cls.CoinHistory, {}, [className])}>
            <Button className={cls.btnBack} onClick={() => setSelectCoin(null)}>
                <IoChevronBackCircle />
            </Button>
            <Header selectCoin={selectCoin} serverCoin={serverCoin} />
            <Table
                title="Transactions"
                className={cls.table}
                classNameContainer={cls.tableContainer}
                head={<SortedHistory />}
                main={history.map((item, i) => (
                    <InfoRow symbol={serverCoin?.symbol} key={i} info={item} />
                ))}
            />
        </div>
    );
});
