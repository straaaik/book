'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinList.module.scss';
import { useState } from 'react';
import { CoinInfo } from './ui/CoinInfo/CoinInfo';
import { CoinSorted } from './ui/CoinSorted/CoinSorted';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';
import { RELOAD_TIME } from '@/shared/constant/constant';
import { PageCount } from './ui/PageCount/PageCount';
import { coinApi } from '@/entities/Coin';

interface CoinListProps {
    className?: string;
}

export const CoinList = ({ className }: CoinListProps) => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<string>('100');

    const { data, error, isLoading } = coinApi.useGetCoinListWithMarketQuery(
        { vs_currency: 'usd', per_page: limit, page: page },
        { pollingInterval: RELOAD_TIME }
    );

    if (error) throw new Error();

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className={classNames(cls.CoinList, {}, [className])}>
            <CoinSorted limit={limit} setLimit={setLimit} />
            {data!.map((coin) => (
                <CoinInfo
                    id={coin.id}
                    key={coin.market_cap_rank}
                    name={coin.name}
                    change24h={coin.price_change_percentage_24h}
                    marketCap={coin.market_cap}
                    price={coin.current_price}
                    rank={coin.market_cap_rank}
                    image={coin.image}
                    symbol={coin.symbol}
                />
            ))}
            <PageCount page={page} setPage={setPage} />
        </div>
    );
};
