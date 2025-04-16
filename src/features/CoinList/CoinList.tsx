'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinList.module.scss';
import { useState } from 'react';
import { CoinInfo } from './ui/CoinInfo/CoinInfo';
import { CoinData } from '@/shared/types/types';
import { CoinSorted } from './ui/CoinSorted/CoinSorted';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';
import { fetcherCoinGecko } from '@/shared/api/request';
import useSWR from 'swr';
import { RELOAD_TIME } from '@/shared/constant/constant';
import { AxiosRequestConfig } from 'axios';
import { PageCount } from './ui/PageCount/PageCount';

interface CoinListProps {
    className?: string;
}

export const CoinList = ({ className }: CoinListProps) => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<string>('100');
    const { data, error, isLoading } = useSWR<CoinData[]>(
        ['coins/markets', { params: { vs_currency: 'usd', per_page: limit, page: page } }],
        ([url, params]: [string, AxiosRequestConfig]) => fetcherCoinGecko(url, params),
        { refreshInterval: RELOAD_TIME }
    );

    if (error) throw new Error(error);

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
