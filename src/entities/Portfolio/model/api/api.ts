import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333/' }),
    tagTypes: ['Coins', 'Portfolios', 'Transactions'],
    endpoints: () => ({}),
});
