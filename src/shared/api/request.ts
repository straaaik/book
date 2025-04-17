import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

export const baseApi = createApi({ reducerPath: 'baseApi', baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/' }), endpoints: () => ({}) });

export const coinGeckoApi = createApi({
    reducerPath: 'coinGeckoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3/' }),
    endpoints: () => ({}),
});

const getCoinGecko = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/',
    method: 'GET',
});

export const fetcherCoinGecko = (url: string, params: AxiosRequestConfig) =>
    getCoinGecko(url, params)
        .then((res) => res.data)
        .catch((e) => {
            if (isAxiosError(e)) {
                if (e.code == 'ERR_NETWORK') {
                    throw new Error('Too many requests, please repeat in a few minutes');
                }
                throw new Error(e.message);
            }
        });
