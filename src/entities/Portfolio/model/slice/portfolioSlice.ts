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

interface SortedType {
    status: 'ascending' | 'descending';
    item: keyof Portfolio;
}

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
        sortedPortfolio: (state, action: PayloadAction<SortedType>) => {
            const { status, item } = action.payload;
            if (status == 'ascending') {
                if (item == 'name' || item == 'portfolio_name') {
                    state.data.sort((a, b) => a[item].localeCompare(b[item], undefined, { sensitivity: 'base' }));
                } else {
                    state.data.sort((a, b) => Number(b[item]) - Number(a[item]));
                }
            }
            if (status == 'descending') {
                if (item == 'name' || item == 'portfolio_name') {
                    state.data.sort((a, b) => b[item].localeCompare(a[item], undefined, { sensitivity: 'base' }));
                } else {
                    state.data.sort((a, b) => Number(a[item]) - Number(b[item]));
                }
            }
        },
    },
});

export const { actions: portfolioActions } = portfolioSlice;
export const { reducer: portfolioReducer } = portfolioSlice;
