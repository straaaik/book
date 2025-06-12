import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Portfolio } from '../../types/types';

export interface PortfolioStateType {
    data: Portfolio[];
    active?: string;
}

const initialState: PortfolioStateType = {
    data: [],
    active: typeof window !== 'undefined' ? localStorage.getItem('activePortfolio') || 'Overview' : 'Overview',
};

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        addCoinToPortfolio: (state, action: PayloadAction<Portfolio>) => {
            const coin = action.payload;
            if (state.data.find((item) => item.name === coin.name)) {
                const id = state.data.findIndex((item) => item.name === coin.name);
                state.data[id] = coin;
            } else {
                state.data.push(coin);
            }
        },
        setActive: (state, action: PayloadAction<string>) => {
            state.active = action.payload;
            localStorage.setItem('activePortfolio', action.payload);
        },
        updatePortfolio: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { actions: portfolioActions } = portfolioSlice;
export const { reducer: portfolioReducer } = portfolioSlice;
