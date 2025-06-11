import { IPortfolioNames, Coin } from '../../types/types';
import { baseApi } from '../api/api';

const portfolioApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getPortfolioNames: create.query<IPortfolioNames[], void>({ query: () => '/portfolio_names', providesTags: ['Names'] }),
        getPortfolioNamesForId: create.query<IPortfolioNames, string>({ query: (name?: string) => `/portfolio_names/${name}`, providesTags: ['Names'] }),
        getPortfolio: create.query<Coin[], void>({ query: () => '/portfolio', providesTags: ['Portfolio'] }),
        getCoinForId: create.query<Coin, string>({ query: (id) => `/portfolio/${id}`, providesTags: ['Portfolio'] }),
    }),
});

export const { useGetCoinForIdQuery, useGetPortfolioNamesForIdQuery, useGetPortfolioNamesQuery, useGetPortfolioQuery } = portfolioApi;
