import axios, { AxiosRequestConfig } from 'axios';

const getCoinGecko = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/',
    method: 'GET',
});

export const fetcher = (url: string, params: AxiosRequestConfig) =>
    getCoinGecko(url, params)
        .then((res) => res.data)
        .catch((e) => e);
