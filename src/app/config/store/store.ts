import { portfolioApi, portfolioReducer } from '@/entities/Portfolio';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
    return configureStore({
        reducer: {
            portfolio: portfolioReducer,
            [portfolioApi.reducerPath]: portfolioApi.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(portfolioApi.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
