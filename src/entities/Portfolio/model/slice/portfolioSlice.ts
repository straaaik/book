import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PortfolioState } from '../../types/types';

const initialState: PortfolioState[] = [];

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        // TODO ПЕРЕПИСАТЬ
        addNewCoin: (state, actions: PayloadAction<PortfolioState>) => {
            if (state.some(({ coin }) => coin == actions.payload.coin)) {
                const findCoin = state.findIndex(({ coin }) => coin == actions.payload.coin);
                state[findCoin].amount += actions.payload.amount;
            } else {
                state.push(actions.payload);
            }
        },
    },
});

export const { actions: portfolioActions } = portfolioSlice;
export const { reducer: portfolioReducer } = portfolioSlice;
