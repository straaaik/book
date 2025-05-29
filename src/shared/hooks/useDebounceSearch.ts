import { coinApi } from '@/entities/Coin';
import { CoinsListWithMarketData, SearchCoin } from '@/entities/Coin/types/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';

export type ResponseType = SearchCoin[] | undefined | CoinsListWithMarketData[];

interface DebounceType {
    response: ResponseType;
    isFetching: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
}

export const useDebounceSearch = (value?: string): DebounceType => {
    const [isFetching, setIsFetching] = useState(false);
    const [searchCoins, { data, isFetching: isFetchingSearch, error }] = coinApi.useLazySearchCoinsQuery();
    const { data: dataCoins, isFetching: isFetchingCoins, error: errorCoins } = coinApi.useGetCoinListWithMarketQuery({});

    useEffect(() => {
        setIsFetching(true);
        const debounce = setTimeout(() => {
            if (value) {
                searchCoins(value);
                setIsFetching(false);
            }
        }, 1000);
        return () => clearTimeout(debounce);
    }, [searchCoins, value]);

    if (!value) {
        return { response: dataCoins, isFetching: isFetchingCoins, error: errorCoins };
    }

    return { response: data?.coins, isFetching: isFetching || isFetchingSearch, error };
};
