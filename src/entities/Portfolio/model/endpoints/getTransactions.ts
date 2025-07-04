import { OVERVIEW } from '@/shared/constant/constant';
import { Transaction } from '../../types/transactionsType';
import { baseApi } from '../api/api';

const transactionsApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getTransactionForId: create.query<Transaction, string>({ query: (id) => `/transactions/${id}`, providesTags: ['Transactions'] }),
        getTransactionWithCoin: create.query<Transaction[], void>({ query: () => `/transactions?_embed=coin`, providesTags: ['Transactions'] }),
        getTransactionForCoin: create.query<Transaction[], string>({
            query: (coin) => `/transactions?coinId=${coin}&_embed=coin`,
            providesTags: ['Transactions'],
        }),
        getTransactionByPortfolioWithCoin: create.query<Transaction[], string>({
            query: (active) => (active == OVERVIEW ? `/transactions?_embed=coin` : `/transactions?_embed=coin&portfolioId=${active}`),
            providesTags: ['Transactions'],
        }),
    }),
});

export const { useGetTransactionForIdQuery, useGetTransactionWithCoinQuery, useGetTransactionForCoinQuery, useGetTransactionByPortfolioWithCoinQuery } =
    transactionsApi;
