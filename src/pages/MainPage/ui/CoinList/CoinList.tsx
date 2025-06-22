'use client';

import { coinApi } from '@/entities/Coin';
import { RELOAD_TIME } from '@/shared/constant/constant';
import { CoinTableMain } from './ui/CoinTableMain/CoinTableMain';
import { PaginationMainPage } from './ui/PaginationMainPage/PaginationMainPage';
import { SelectCountCoins } from './ui/SelectCountCoins/SelectCountCoins';
import { useState } from 'react';

export const CoinList = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState('100');
    const { data, isLoading } = coinApi.useGetCoinListWithMarketQuery(
        { vs_currency: 'usd', page, per_page: limit },
        {
            pollingInterval: RELOAD_TIME,
        }
    );

    return (
        <div>
            <SelectCountCoins limit={limit} setLimit={setLimit} />
            <CoinTableMain isLoading={isLoading} data={data} />
            <PaginationMainPage page={page} setPage={setPage} />
        </div>
    );
};
