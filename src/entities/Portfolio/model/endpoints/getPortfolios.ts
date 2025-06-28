import { IPortfoliosInfo, IPortfoliosInfoCoins, IPortfoliosInfoTransactions } from '../../types/types';
import { baseApi } from '../api/api';

const portfoliosApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getPortfolio: create.query<IPortfoliosInfo[], void>({ query: () => '/portfolios', providesTags: ['Portfolios'] }),
        getPortfolioWithCoin: create.query<IPortfoliosInfoCoins[], void>({ query: () => '/portfolios?_embed=coins', providesTags: ['Portfolios'] }),
        getPortfoliosWithTransactions: create.query<IPortfoliosInfoTransactions[], void>({
            query: () => '/portfolios?_embed=transactions',
            providesTags: ['Portfolios'],
        }),
        getPortfolioForId: create.query<IPortfoliosInfo, string>({ query: (id?: string) => `/portfolios/${id}`, providesTags: ['Portfolios'] }),
    }),
});

export const { useGetPortfolioForIdQuery, useGetPortfoliosWithTransactionsQuery, useGetPortfolioWithCoinQuery, useGetPortfolioQuery } = portfoliosApi;
