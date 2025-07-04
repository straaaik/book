import { ParamValue } from 'next/dist/server/request/params';
import { CoinsListWithMarketData, ParamsCoinsListWithMarketData, CoinByID, ICoinList, SearchCoinResponse } from '../../types/types';
import { coinGeckoApi } from '../api/api';

export const coinApi = coinGeckoApi.injectEndpoints({
    endpoints: (create) => ({
        getCoinListWithMarket: create.query<CoinsListWithMarketData[], ParamsCoinsListWithMarketData>({
            query: ({ vs_currency = 'usd', per_page = '100', page = 1, names }) => ({
                url: 'coins/markets',
                params: { vs_currency, per_page, page, names, price_change_percentage: ['1h', '24h', '7d'] },
            }),
        }),
        getCoin: create.query<CoinByID, ParamValue>({
            query: (id) => `coins/${id}`,
        }),
        getCoinList: create.query<ICoinList[], void>({
            query: () => 'coins/list',
        }),
        searchCoins: create.query<SearchCoinResponse, string>({
            query: (value) => `/search?query=${value}`,
        }),
    }),
    overrideExisting: true,
});
