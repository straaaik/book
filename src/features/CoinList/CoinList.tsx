'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinList.module.scss';
import { useState } from 'react';
import { CoinInfo } from './ui/CoinInfo/CoinInfo';
import { CoinData } from '@/shared/types/types';
import { CoinSorted } from './ui/CoinSorted/CoinSorted';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';
import { fetcher } from '@/shared/api/request';
import useSWR from 'swr';
import { RELOAD_TIME } from '@/shared/constant/constant';
import { AxiosRequestConfig } from 'axios';

interface CoinListProps {
    className?: string;
}

export const CoinList = ({ className }: CoinListProps) => {
    const [page] = useState<number>();
    const [limit] = useState<number>(100);
    const { data, error, isLoading } = useSWR<CoinData[]>(
        ['coins/markets', { params: { vs_currency: 'usd', per_page: limit, page: page } }],
        ([url, params]: [string, AxiosRequestConfig]) => fetcher(url, params),
        { refreshInterval: RELOAD_TIME }
    );

    if (error) throw new Error(error);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className={classNames(cls.CoinList, {}, [className])}>
            <CoinSorted />
            {data!.map((coin) => (
                <CoinInfo
                    id={coin.id}
                    key={coin.market_cap_rank}
                    name={coin.name}
                    change24h={coin.price_change_percentage_24h.toLocaleString('ru-RU', { maximumFractionDigits: 4 })}
                    marketCap={coin.market_cap.toLocaleString('ru-RU')}
                    price={coin.current_price.toLocaleString('ru-RU', { maximumFractionDigits: 20 })}
                    rank={coin.market_cap_rank}
                    image={coin.image}
                    symbol={coin.symbol}
                />
            ))}
        </div>
    );
};
