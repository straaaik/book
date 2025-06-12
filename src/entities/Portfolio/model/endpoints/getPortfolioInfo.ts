import { IPortfoliosInfo, Coin } from '../../types/types';
import { baseApi } from '../api/api';

const portfolioApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getPortfoliosInfo: create.query<IPortfoliosInfo[], void>({ query: () => '/portfolios_info', providesTags: ['Names'] }),
        getPortfolioInfoForId: create.query<IPortfoliosInfo, string>({ query: (name?: string) => `/portfolios_info/${name}`, providesTags: ['Names'] }),
        getPortfolio: create.query<Coin[], void>({ query: () => '/portfolio', providesTags: ['Portfolio'] }),
        getCoinForId: create.query<Coin, string>({ query: (id) => `/portfolio/${id}`, providesTags: ['Portfolio'] }),
    }),
});

export const { useGetCoinForIdQuery, useGetPortfolioInfoForIdQuery, useGetPortfoliosInfoQuery, useGetPortfolioQuery } = portfolioApi;
