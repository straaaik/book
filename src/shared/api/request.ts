import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

const getCoinGecko = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/',
    method: 'GET',
});

export const fetcher = (url: string, params: AxiosRequestConfig) =>
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
