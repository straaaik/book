import { RootState } from '@/shared/types/redux';

export const getContent = (state: RootState) => state.portfolioPage.content;
export const getSelectedCoin = (state: RootState) => state.portfolioPage.selectCoin;
