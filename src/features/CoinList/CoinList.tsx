'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinList.module.scss';
import { useFetching } from '@/shared/hooks/useFetching';
import { useEffect, useMemo, useState } from 'react';
import { CoinInfo } from './ui/CoinInfo/CoinInfo';
import { CoinData } from '@/shared/types/types';
import { CoinSorted } from './ui/CoinSorted/CoinSorted';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';

interface CoinListProps {
    className?: string;
}

export const CoinList = ({ className }: CoinListProps) => {
    const [coinList, setCoinList] = useState<CoinData[]>([]);
    const [page] = useState(1);
    const [limit] = useState(100);

    const params = useMemo(
        () => ({
            params: { vs_currency: 'usd', per_page: limit, page: page },
        }),
        [page, limit]
    );

    const [data, isLoading, error] = useFetching<CoinData[]>('https://api.coingecko.com/api/v3/coins/markets', params);

    useEffect(() => {
        if (data) {
            setCoinList(data);
        }
    }, [data, isLoading]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) return <Error />;

    return (
        <div className={classNames(cls.CoinList, {}, [className])}>
            <CoinSorted data={coinList} set={setCoinList} />
            {coinList.map((coin) => (
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
