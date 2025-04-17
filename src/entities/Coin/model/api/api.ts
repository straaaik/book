import { coinGeckoApi } from '@/shared/api/request';
import { CoinByID, CoinList, CoinsListWithMarketData, ParamsCoinsListWithMarketData } from '../../types/types';
import { ParamValue } from 'next/dist/server/request/params';

export const coinApi = coinGeckoApi.injectEndpoints({
    endpoints: (create) => ({
        getCoinListWithMarket: create.query<CoinsListWithMarketData[], ParamsCoinsListWithMarketData>({
            query: ({ vs_currency = 'usd', per_page = '100', page = 1 }) => ({ url: 'coins/markets', params: { vs_currency, per_page, page } }),
        }),
        getCoin: create.query<CoinByID, ParamValue>({
            query: (id) => `coins/${id}`,
        }),
        getCoinList: create.query<CoinList[], void>({
            query: () => 'coins/list',
        }),
    }),
    overrideExisting: true,
});
