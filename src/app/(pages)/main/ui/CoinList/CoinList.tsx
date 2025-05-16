'use client';

import { CoinsListWithMarketData, coinApi } from '@/entities/Coin';
import { CoinCard } from '@/features';
import { RELOAD_TIME } from '@/shared/constant/constant';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../../_loading/loading';
import { ActionsCoinsList } from './ui/ActionsCoinsList/ActionsCoinsList';
import { SortingCoinList } from './ui/SortingCoinList/SortingCoinList';

export const CoinList = () => {
    const [sortedData, setSortedData] = useState<CoinsListWithMarketData[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState('100');

    const { data, isError, isLoading } = coinApi.useGetCoinListWithMarketQuery(
        { vs_currency: 'usd', per_page: limit, page: page },
        {
            pollingInterval: RELOAD_TIME,
        }
    );

    useEffect(() => {
        if (data) setSortedData(data);
    }, [data]);

    return (
        <>
            <ActionsCoinsList setLimit={setLimit} limit={limit} />
            <SortingCoinList data={sortedData} setData={setSortedData} />
            {sortedData.length && !isLoading ? (
                !isError ? (
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
                            volume={coin.total_volume}
                            circulatingSupply={coin.circulating_supply}
                        />
                    ))
                ) : (
                    <>ERROR</> // TODO Обработать ошибку
                )
            ) : (
                <LoadingSpinner />
            )}
            <Pagination value={page} onClick={setPage} />
        </>
    );
};
