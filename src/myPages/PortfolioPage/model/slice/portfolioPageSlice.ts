import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content } from '../../types/types';
import { CoinDescription } from '@/entities/Portfolio';

export interface PortfolioPageStateType {
    content: Content;
    selectCoin?: CoinDescription;
}

const initialState: PortfolioPageStateType = {
    content: Content.OVERVIEW,
};

export const portfolioPageSlice = createSlice({
    name: 'portfolioPage',
    initialState,
    reducers: {
        changeContent: (state, actions: PayloadAction<Content>) => {
            state.content = actions.payload;
        },
        changeSelectedCoin: (state, actions: PayloadAction<CoinDescription | undefined>) => {
            state.selectCoin = actions.payload;
        },
    },
});

export const { actions: portfolioPageActions } = portfolioPageSlice;
export const { reducer: portfolioPageReducer } = portfolioPageSlice;
