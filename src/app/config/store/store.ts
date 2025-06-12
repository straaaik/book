import { coinGeckoApi } from '@/entities/Coin';
import { baseApi, portfolioReducer } from '@/entities/Portfolio';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [baseApi.reducerPath]: baseApi.reducer,
            [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
            portfolio: portfolioReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, coinGeckoApi.middleware),
    });
};
