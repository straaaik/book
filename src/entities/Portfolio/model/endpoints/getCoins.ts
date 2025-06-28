import { OVERVIEW } from '@/shared/constant/constant';
import { Coin } from '../../types/types';
import { baseApi } from '../api/api';

const coinsApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getCoinsWithTransactions: create.query<Coin[], string>({
            query: (active) => (active == OVERVIEW ? `/coins?_embed=transactions` : `/coins?_embed=transactions&portfolioId=${active}`),
            providesTags: ['Coins'],
        }),
        getCoinForIdWithTransactions: create.query<Coin, string>({ query: (id) => `/coins/${id}?_embed=transactions`, providesTags: ['Coins'] }),
    }),
});

export const { useGetCoinForIdWithTransactionsQuery, useGetCoinsWithTransactionsQuery } = coinsApi;
