import { coinGeckoApi } from '@/entities/Coin';
import { baseApi, portfolioReducer } from '@/entities/Portfolio';
import { portfolioPageReducer } from '@/myPages/PortfolioPage/model/slice/portfolioPageSlice';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [baseApi.reducerPath]: baseApi.reducer,
            [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
            portfolio: portfolioReducer,
            portfolioPage: portfolioPageReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, coinGeckoApi.middleware),
    });
};
