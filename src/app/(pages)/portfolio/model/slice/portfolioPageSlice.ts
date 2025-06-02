import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PortfolioStateType {
    active: string;
}

const initialState: PortfolioStateType = {
    active: typeof window !== 'undefined' ? localStorage.getItem('activePortfolio') || 'Overview' : 'Overview',
};

export const portfolioPageSlice = createSlice({
    name: 'portfolio/page',
    initialState,
    reducers: {
        setActivePortfolio: (state, action: PayloadAction<string>) => {
            state.active = action.payload;
            localStorage.setItem('activePortfolio', action.payload);
        },
    },
});

export const { actions: portfolioPageActions } = portfolioPageSlice;
export const { reducer: portfolioPageReducer } = portfolioPageSlice;
