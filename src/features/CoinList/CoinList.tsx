'use client';

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';
import { RELOAD_TIME } from '@/shared/constant/constant';
import { coinApi, CoinsListWithMarketData } from '@/entities/Coin';
import { CoinCard } from '../CoinCard/CoinCard';
import { Sorted } from '../Sorted/Sorted';

export const CoinList = () => {
    const [sortedData, setSortedData] = useState<CoinsListWithMarketData[]>([]);
    const [page] = useState<number>(1);
    const [limit] = useState<string>('100');

    const { data, error, isLoading } = coinApi.useGetCoinListWithMarketQuery(
        { vs_currency: 'usd', per_page: limit, page: page },
        {
            pollingInterval: RELOAD_TIME,
        }
    );
    if (error) throw new Error();

    useEffect(() => {
        if (data) setSortedData(data);
    }, [data]);

    return (
        <>
            <Sorted rank name price change1h change7d change24h marketCap data={sortedData} setData={setSortedData} />
            {!isLoading ? (
                sortedData.map((coin) => (
                    <CoinCard
                        id={coin.id}
                        key={coin.market_cap_rank}
                        name={coin.name}
                        change1h={coin.price_change_percentage_1h_in_currency}
                        change24h={coin.price_change_percentage_24h_in_currency}
                        change7d={coin.price_change_percentage_7d_in_currency}
                        marketCap={coin.market_cap}
                        price={coin.current_price}
                        rank={coin.market_cap_rank}
                        image={coin.image}
                        symbol={coin.symbol}
                    />
                ))
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
};
