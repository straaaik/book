import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Portfolio } from '../../types/types';

export interface IError {
    status: string;
    error: string;
}

export interface PortfolioStateType {
    coins: Portfolio[];
    isLoading: boolean;
    active: string;
    error?: IError[];
}

const initialState: PortfolioStateType = {
    coins: [],
    isLoading: true,
    active: typeof window !== 'undefined' ? localStorage.getItem('activePortfolio') || 'Overview' : 'Overview',
};

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        addCoinToPortfolio: (state, action: PayloadAction<Portfolio>) => {
            const coin = action.payload;
            if (state.coins.find((item) => item.name === coin.name)) {
                const id = state.coins.findIndex((item) => item.name === coin.name);
                state.coins[id] = coin;
            } else {
                state.coins.push(coin);
            }
        },
        setActive: (state, action: PayloadAction<string>) => {
            state.active = action.payload;
            localStorage.setItem('activePortfolio', action.payload);
        },
        updatePortfolio: (state, action) => {
            state.coins = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { actions: portfolioActions } = portfolioSlice;
export const { reducer: portfolioReducer } = portfolioSlice;
