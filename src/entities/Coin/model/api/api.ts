import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const coinGeckoApi = createApi({
    reducerPath: 'coinGeckoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3/' }),
    endpoints: () => ({}),
});
