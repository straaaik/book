import { coinApi, CoinList, CoinsListWithMarketData } from '@/entities/Coin';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useCallback, useEffect } from 'react';

type DebounceType = [CoinsListWithMarketData[] | undefined, boolean, FetchBaseQueryError | SerializedError | undefined, boolean];

export const useDebounceSearch = (data?: CoinList[], value?: string): DebounceType => {
    const [getCoins, { data: dataCoins, isFetching, error, isError }] = coinApi.useLazyGetCoinListWithMarketQuery();

    const onSortingDataName = useCallback(
        (searchValue: string) => {
            const result = data?.filter((coin) => coin.name.toLowerCase().includes(searchValue.toLowerCase()));
            return result?.slice(0, 15).map((coin) => coin.name);
        },
        [data]
    );

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (value) {
                const names = onSortingDataName(value);
                if (!!names?.length) {
                    getCoins({ names });
                } else {
                    getCoins({ names: [value] });
                }
            } else {
                getCoins({});
            }
        }, 1000);

        return () => clearTimeout(debounce);
    }, [getCoins, value, onSortingDataName]);

    return [dataCoins, isFetching, error, isError];
};
