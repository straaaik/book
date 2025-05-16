import { coinApi } from '@/entities/Coin';
import { portfolioApi, portfolioReducer } from '@/entities/Portfolio';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [portfolioApi.reducerPath]: portfolioApi.reducer,
            [coinApi.reducerPath]: coinApi.reducer,
            portfolio: portfolioReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(portfolioApi.middleware, coinApi.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
